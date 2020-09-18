import React, {useState} from "react";

const WifiSettingsForm = (props) => {
    const [type, setType] = useState("WPA/WPA2");
    const [SSID, setSSID] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(false);
    
    let messageClass = props.isError ? "message-container error" : "message-container success";



    return (
        <div className="form-container">
            <div className="form">
                <div className="option">
                    <div className="label">Encryption</div>
                    <div className="data">
                        <select defaultValue={type} onChange={e => setType(e.target.value)}>
                            <option>WPA/WPA2</option>
                            <option>WEP</option>
                            <option>None</option>
                        </select>
                    </div>
                </div>
                <div className="option">
                    <div className="label">Network Name<span className="required">*</span></div>
                    <div className="data">
                        <input type="text" placeholder="SSID" onChange={e => setSSID(e.target.value)}/>
                    </div>
                </div>
                <div className="option">
                    <div className="label">Password{type !== 'None' && (<span className="required">*</span>)}</div>
                    <div className="data">
                        <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="option">
                    <div className="label">Hidden Network</div>
                    <div className="data">
                        <input type="checkbox" onChange={e => setHidden(e.target.value)}/>
                    </div>
                </div>
            </div>
            {props.resultMessage !== "" 
                ?<div className={messageClass}>{props.resultMessage}</div>
                :<div className="message-container">Fields marked with a <span className="required">*</span> are required.</div>
            }
            <div className="button-container">
                <button type="button" onClick={() => props.submitSettings(type, SSID, password, hidden)}>Generate Code</button>
            </div>
        </div>
    );
};

export default WifiSettingsForm;