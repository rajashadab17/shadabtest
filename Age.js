import React, { useState } from 'react';

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateAge = () => {
    const birthDate = new Date(`${birthdate}T00:00:00`);
    const currentDateP = new Date(2024, new Date().getMonth(),new Date().getDate());
    const currentDate = new Date();
    console.log(birthDate, currentDateP, currentDate)

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

    // Calculate hours, minutes, and seconds starting from the birthdate time
    const diffMilliseconds = currentDate - birthDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    const hours = diffHours % 24;
    const minutes = diffMinutes % 60;
    const seconds = diffSeconds % 60;

    setAge({ years, months, days, hours, minutes, seconds });
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

      {age.years > 0 || age.months > 0 || age.days > 0 || age.hours > 0 || age.minutes > 0 || age.seconds > 0 ? (
        <div>
          <h3>Your age is:</h3>
          <p>{age.years} years, {age.months} months, {age.days} days</p>
          <p>{age.hours} hours, {age.minutes} minutes, {age.seconds} seconds</p>
        </div>
      ) : null}
    </div>
  );
};

export default AgeCalculator;
