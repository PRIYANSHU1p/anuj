export const connectSmartWatch = async (onUpdate) => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('heart_rate');
    const characteristic = await service.getCharacteristic('heart_rate_measurement');

    characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const value = event.target.value;
      // Heart Rate Measurement parsing (Standard GATT format)
      const flags = value.getUint8(0);
      const rate16 = flags & 0x1;
      const heartRate = rate16 ? value.getUint16(1, true) : value.getUint8(1);
      
      onUpdate(heartRate);
    });

    return device;
  } catch (error) {
    console.error("Bluetooth Connection Failed:", error);
    throw error;
  }
};
