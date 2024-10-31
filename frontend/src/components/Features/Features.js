// Features.js
import React from 'react';
import './Features.css'; // Link to external CSS for styling

const featuresData = [
  {
    icon: '🛒', 
    title: 'BUILD YOUR ORDER',
    description: 'Customize your box & set a schedule time for same day or next day delivery.',
  },
  {
    icon: '💰',
    title: 'SAVE EVEN MORE',
    description: 'Shop a variety of products on offer on a weekly basis.',
  },
  {
    icon: '📦',
    title: 'COLLECT YOUR ORDER',
    description: 'Collect your groceries at your own convenient time or have it delivered.',
  },
];

const Features = () => {
  return (
    <div className="features-container">
      {featuresData.map((feature, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
