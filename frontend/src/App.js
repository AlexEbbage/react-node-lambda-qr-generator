import React, { useState } from 'react';
import './App.css';

import WifiSettingsForm from "./components/WifiSettingsForm";
import QRCode from './components/QRCode';

function App() {
    const [qrCode, setQrCode] = useState("");

    const generateCodeUrl = "https://imi4ns5dpb.execute-api.eu-west-1.amazonaws.com/prod/qr-generator/generateCode";

    const submitSettings = async (type, ssid, password, isHidden) => {
        try {
            const response = await fetch(generateCodeUrl, {
                method: "POST",
                body: JSON.stringify({
                    type: type,
                    SSID: ssid,
                    password: password,
                    hidden: isHidden
                })
            });

            let responseString = await response.text();

            if (response.ok) {
                setQrCode(responseString);
            }
            else {
                console.error(`Error ${response.status}. ${responseString}`);
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container">
            <div className="title-container">
                <div className="title">WiFi Code QR Generator</div>
                <div className="description">Fill in the form with the details of the WiFi network you want the QR code to be associated with, then select 'Generate Code' to get your QR code image.</div>
            </div>
            {qrCode !== "" &&
                <QRCode qr={qrCode} />
            }
            <WifiSettingsForm submitSettings={submitSettings} />
            <div className="footer">
                Made by <a href="https://github.com/werzl" target="_blank" rel="noopener noreferrer" title="Vist Adam's GitHub page">Adam Hewitt</a> and <a href="https://github.com/AlexEbbage" target="_blank" rel="noopener noreferrer" title="Vist Alex's GitHub page">Alex Ebbage</a>. Visit the repository <a href="https://github.com/AlexEbbage/react-node-lambda-qr-generator" title="Vist the project's repository">here</a>.
            </div>
        </div>
    );
}

export default App;
