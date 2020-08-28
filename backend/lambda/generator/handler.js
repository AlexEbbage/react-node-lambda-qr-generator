'use strict';
const QRCode = require("qrcode");

module.exports.generateCode = async event => {

    console.info("Recieved Event: ");
    console.info(event);

    // User Input: Retrieve the settings the user inputted into the form.
    let wifiSettings = JSON.parse(event.body);
    console.log(wifiSettings);

    // Network Name: Make sure a network name has been inputted.
    if (typeof (wifiSettings.SSID) !== "string" || !wifiSettings.SSID || !wifiSettings.SSID.trim()) throw new TypeError("wifiSettings.SSID is invalid");

    // Password & Encryption: If the encryption type is set to 'None' don't check for a password.
    if(wifiSettings.type !== "None"){
        if (typeof (wifiSettings.password) !== "string" || !wifiSettings.password) throw new TypeError("wifiSettings.password is invalid");
    }

    // QR Code: Construct the parameter string to be used in the construction of the QR code image.
    let qrString = `WIFI:S:${wifiSettings.SSID};`;
    if (wifiSettings.Type) qrString += `T:${wifiSettings.Type};P:${wifiSettings.Password};`;
    if (wifiSettings.Hidden) qrString += `H:${wifiSettings.Hidden};`;
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
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: qr
    };
};

// (async () => {
//     let event = {
//         body: '{\r\n' +
//             '        "SSID": "string",\r\n' +
//             '        "password": "string",\r\n' +
//             '        "type": "None",\r\n' +
//             '        "hidden": "false"    \r\n' +
//             '}',
//     };
//     this.generateCode(event);
// })();