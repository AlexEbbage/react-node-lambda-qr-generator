import React from "react";

const QRCode = ({qr}) => {
    return (
        <div className="qr-container">
            <a href={qr} download="qr-code.png" title="Click to download the QR code">
                <img src={qr} alt="Generated QR Code"/>
            </a>
        </div>
    );
};

export default QRCode;