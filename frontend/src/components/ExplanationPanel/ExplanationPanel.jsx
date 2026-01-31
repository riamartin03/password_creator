import React from 'react';
import './ExplanationPanel.css';

const ExplanationPanel = ({ explanation }) => {
  // ✅ Filter out empty strings and whitespace-only entries
  const validExplanations = explanation?.filter(
    item => item && item.trim().length > 0
  ) || [];

  if (validExplanations.length === 0) {
    return (
      <div className="explanation-panel">
        <h2 className="section-title">
          📘 Security Explanation
        </h2>
        <p className="empty-text">
          Generate or edit a password to see security insights.
        </p>
      </div>
    );
  }

  return (
    <div className="explanation-panel">
      <h2 className="section-title">
        📘 Security Explanation
      </h2>

      {validExplanations.map((reason, index) => (
        <div key={index} className="explanation-card">
          <div className="icon">💡</div>
          <p className="text">{reason}</p>
        </div>
      ))}
    </div>
  );
};

export default ExplanationPanel;