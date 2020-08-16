'use strict';
const QRCode = require("qrcode");

module.exports.generateCode = async event => {
    // Event: {
    //     SSID: string,
    //     password: string,
    //     type: string,
    //     hidden: boolean
    // }

    console.info("Recieved Event: ");
    console.info(event);

    let wifiSettings = JSON.parse(event.body);

    console.log(wifiSettings);

    if (typeof (wifiSettings.SSID) !== "string" || !wifiSettings.SSID || !wifiSettings.SSID.trim()) throw new TypeError("wifiSettings.SSID is invalid");
    if (typeof (wifiSettings.password) !== "string" || !wifiSettings.password) throw new TypeError("wifiSettings.password is invalid");

    let qrString = `WIFI:T:${wifiSettings.type};S:${wifiSettings.SSID};P:${wifiSettings.password};H:${wifiSettings.hidden}`;
    console.info(qrString);

    let qr = ""
    await QRCode.toDataURL(qrString)
        .then(url => {
            console.log(url);
            qr = url;
        })
        .catch(err => {
            console.error(err)
        });

    return {
        statusCode: 200,
        body: qr
    };
};

//(async () => {
//     let event = {
//         body: '{\r\n' +
//             '        "SSID": "string",\r\n' +
//             '        "password": "string",\r\n' +
//             '        "type": "string",\r\n' +
//             '        "hidden": "boolean"    \r\n' +
//             '}',
//     };
//     this.generateCode(event);
//})();