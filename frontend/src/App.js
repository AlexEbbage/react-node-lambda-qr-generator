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
        <div className="App">
            <header className="App-header">
                {qrCode !== "" &&
                    <QRCode qr={qrCode} />
                }

                <WifiSettingsForm submitSettings={submitSettings} />
                <p>
                    react-node-lambda-qr-generator <a href="https://github.com/AlexEbbage/react-node-lambda-qr-generator"
                        target="_blank" rel="noopener noreferrer">
                        GitHub
          </a>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
        </a>
            </header>
        </div>
    );
}

export default App;
