import React, {useState, useEffect} from 'react';

function Light({id, lightData}) {
    const [isOn, setIsOn] = useState(lightData.status);
    const [brightness, setBrightness] = useState(lightData.brightness);



    const handleLightClick = () => {
        const newStatus = !isOn;
        setIsOn(newStatus);

        // Update the backend
        fetch(`/api/lights/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: newStatus, brightness})
        });
    };

    const handleSliderChange = (e) => {
        const newBrightness = Number(e.target.value);
        setBrightness(newBrightness);

        // Update the backend
        fetch(`/api/lights/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: isOn, brightness: newBrightness})
        });
    };

    console.log(`Light ${id} - Status: ${isOn}, Brightness: ${brightness}`); // Log state changes

return (
    <div className="light" id={`light-${id}`}>
            <h2>{id}</h2>
<img
    src={isOn ? "/images/lightON.png" : "/images/lightOFF.png"}
    alt={`Light ${id} - ${isOn ? 'On' : 'Off'}`}
    onClick={handleLightClick}
    style={{ cursor: 'pointer', width: '50px' }} // Resized to 50px width
/>


            <div>
                <label>Brightness:</label>
                <input
                    type="range"
                    value={brightness}
                    onChange={handleSliderChange}
                    min="0"
                    max="100"
                />
                {brightness}%
            </div>
        </div>
    );
}

export default Light;
