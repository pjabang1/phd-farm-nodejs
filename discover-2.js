const MiFlora = require('node-mi-flora-classic-updated');
// const { NodeMiFloraEvents, MiFloraDataEvent, MiFloraFirmwareEvent } = require('node-mi-flora-classic-updated/dist/types');

const flora = new MiFlora();

flora.startScanning();

flora.on('data', (data) => {
    console.log('data', data);
});

flora.on('firmware', (data) => {
    console.log('firmware', data);
});

setInterval(() => {
    console.log('every 15 seconds, rescan devices');
    flora.startScanning();
}, 15000);