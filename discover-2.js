const MiFlora = require('node-mi-flora-classic-updated');
const axios = require('axios');
// const { NodeMiFloraEvents, MiFloraDataEvent, MiFloraFirmwareEvent } = require('node-mi-flora-classic-updated/dist/types');

const flora = new MiFlora();

const instance = axios.create({
    baseURL: 'https://api.taybull.com/',
    timeout: 3000
});

const transform = (data, unitCodes) => {
    const results = [];
    unitCodes.forEach((unitCode) => {
        if(typeof data[unitCode] !== 'undefined') {
            const row = {};
            row.deviceCode = data.deviceId;
            row.unitCode = unitCode;
            row.value = data[unitCode];
            results.push(row);
        }
    });
    return results;
};

const sendMessages = (messages) => {
    
    if(messages.length) {
        const payload = {
            messages
        };
        console.log('messages', JSON.stringify(payload));
        return instance.post('/p/iot', payload);
    }
    return null;
};

flora.startScanning();

flora.on('data', async (data) => {
    try {
        console.log('data', data);
        const unitCodes = ['temperature', 'lux', 'moisture', 'fertility'];
        const messages = transform(data, unitCodes);
        await sendMessages(messages);
    } catch(error) {
        console.log('data error', error);
    }
});

flora.on('firmware', async (data) => {
    try {
        // console.log('firmware', data);
        const unitCodes = ['batteryLevel'];
        const messages = transform(data, unitCodes);
        sendMessages(messages);
    } catch(error) {
        console.log('data error', error);
    }
});

setInterval(() => {
    // 
    console.log('every 5 minutes, rescan devices');
    // flora.startScanning();
}, 60000 * 5);