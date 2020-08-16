import React, {useState} from "react";

const WifiSettingsForm = (props) => {
    const [type, setType] = useState("WPA/WPA2");
    const [SSID, setSSID] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(false);

    return (
        <div>
            <select defaultValue={type} onChange={e => setType(e.target.value)}>
                <option>WPA/WPA2</option>
                <option>WEP</option>
                <option>None</option>
            </select>

            <input type="text" placeholder="SSID" onChange={e => setSSID(e.target.value)}/>

            <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>

            <span>Hidden <input type="checkbox" onChange={e => setHidden(e.target.value)}/></span>

            <button type="button" onClick={() => props.submitSettings(type, SSID, password, hidden)}>Submit</button>
        </div>
    );
};

export default WifiSettingsForm;