import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
    }
  };

  const getBMIClass = () => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <div>
        <label>Height (cm): </label>
        <input type="number" value={height} onChange={handleHeightChange} />
      </div>
      <div>
        <label>Weight (kg): </label>
        <input type="number" value={weight} onChange={handleWeightChange} />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div className={`bmiResult ${getBMIClass()}`}>
          <p>Your BMI: {bmi}</p>
          <p>{getBMIClass()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
