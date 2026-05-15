import { supabase } from '../supabaseClient';

const OFFLINE_STORAGE_KEY = 'medlink_offline_queue';

export const queueRequestOffline = (request) => {
  const queue = JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]');
  queue.push({ ...request, timestamp: new Date().toISOString() });
  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(queue));
  console.log('Rural Mode: Request queued for sync.');
};

export const syncOfflineData = async () => {
  if (!navigator.onLine) return;

  const queue = JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]');
  if (queue.length === 0) return;

  console.log(`Syncing ${queue.length} offline records...`);

  for (const item of queue) {
    const { error } = await supabase.from('requests').insert([item]);
    if (!error) {
      // Remove successfully synced items
      const currentQueue = JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]');
      const filtered = currentQueue.filter(q => q.timestamp !== item.timestamp);
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(filtered));
    }
  }
};

// Auto-sync listener
if (typeof window !== 'undefined') {
  window.addEventListener('online', syncOfflineData);
}
