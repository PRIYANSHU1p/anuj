import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageCircle, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChatComponent = ({ requestId, otherPartyName, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    fetchMessages();

    // Subscribe to real-time messages for this request
    const subscription = supabase
      .channel(`chat_${requestId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `request_id=eq.${requestId}`
      }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [requestId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('request_id', requestId)
      .order('created_at', { ascending: true });

    if (error) console.error('Error fetching messages:', error);
    else setMessages(data || []);
    setLoading(false);
  };


  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="glass-card" 
      style={{ 
        width: '350px', 
        height: '450px', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--surface)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ padding: '1rem', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={18} />
          </div>
          <span style={{ fontWeight: 700 }}>{otherPartyName}</span>
        </div>
        <button onClick={onClose} style={{ color: 'white' }}><X size={20} /></button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              alignSelf: msg.sender_id === user.id ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '0.75rem 1rem',
              borderRadius: msg.sender_id === user.id ? '15px 15px 0 15px' : '15px 15px 15px 0',
              background: msg.sender_id === user.id ? 'var(--primary)' : 'var(--background)',
              color: msg.sender_id === user.id ? 'white' : 'var(--text)',
              fontSize: '0.875rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            {msg.content}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

    </motion.div>
  );
};

export default ChatComponent;
