import React, { useState, useEffect } from 'react';
import Light from './Light';
import './App.css';

const handleJumpToLight = () => {
  const lightNum = document.getElementById('lightNumber').value;
  const lightElement = document.getElementById(`light-${lightNum}`);

  if (lightElement) {
    lightElement.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
    const [lightsData, setLightsData] = useState([]);
    const [lightsOnCount, setLightsOnCount] = useState(0);

useEffect(() => {
    const fetchLightsData = () => {
        fetch('/api/lights')
        .then(response => response.json())
        .then(data => {
            const sortedLights = data.lights.sort((a, b) => a.lightId - b.lightId);
            setLightsData(sortedLights);
            setLightsOnCount(data.lightsOnCount);
            });
    };

    fetchLightsData(); // Initial fetch

    const intervalId = setInterval(fetchLightsData, 5000); // Poll every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
}, []);

    return (
        <div className="App">
            <h1>IoT Smart Lighting Interface</h1>
            <p className="centered-text">{lightsOnCount}/100 lights are currently ON.</p>
            <div className="instruction-manual">
                <h2>How to use:</h2>
                <ul>
                    <li>Click on a lightbulb to turn it ON or OFF.</li>
                    <li>Drag the slider to adjust the brightness of each light.</li>
                    <li>Type in a light number and press "Go" to jump to a specific light.</li>
                    <li>Every adjustment is automatically sent to the backend and saved in real time</li>
                </ul>
            </div>

            <div className="jump-to-light">
                <label htmlFor="lightNumber">Jump to light: </label>
                <input type="number" id="lightNumber" min="1" max="100" />
                <button onClick={handleJumpToLight}>Go</button>
            </div>

            <div className="lights">
                {lightsData.map(light => (
                    <Light key={light.lightId} id={light.lightId} lightData={light} />
                ))}
            </div>

        </div>
    );
}

export default App;
