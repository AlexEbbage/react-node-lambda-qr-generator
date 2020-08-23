import React from "react";

const QRCode = ({qr}) => {
    return (
        <div className="qr-container">
            <img src={qr} alt="Generated QR Code."/>
        </div>
    );
};

export default QRCode;