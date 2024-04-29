import React, { useState } from 'react';

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const calculateAge = () => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div>
      <label>
        Enter your birthdate:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>
      <button onClick={calculateAge}>Calculate Age</button>

      {age.years > 0 || age.months > 0 || age.days > 0 ? (
        <div>
          <h3>Your age is:</h3>
          <p>{age.years} years, {age.months} months, and {age.days} days</p>
        </div>
      ) : null}
    </div>
  );
};

export default AgeCalculator;
