import React, { useState, useEffect } from 'react';
import './Welcome.css';

const Welcome = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const getGreeting = () => {
    const hour = currentDateTime.getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* <h2 className="dashboard-title">Dashboard</h2> */}

        <div className="welcome-message-box">
          {/* Abstract 3D decorative shapes */}
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>

          <div className="welcome-text-area">
            <h1 className="welcome-greeting">
              {getGreeting()}, Akshaya <span className="wave-emoji">👋</span>
            </h1>
            <p className="welcome-subtitle">
              Here's what's happening with your business today.
            </p>
          </div>

          <div className="datetime-widget">
            <div className="time-display">{formattedTime}</div>
            <div className="date-display">{formattedDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
