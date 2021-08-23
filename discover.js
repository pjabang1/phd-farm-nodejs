const miflora = require('miflora');

(async () => {
    const devices = await miflora.discover();
    console.log('devices discovered: ', devices.length);
});