import React from 'react';
import './StrengthIndicator.css';

const StrengthIndicator = ({ strength }) => {
  const getStrengthInfo = (level) => {
    // ✅ Convert to lowercase for comparison
    const levelLower = (level || '').toLowerCase();
    
    switch (levelLower) {
      case 'weak':
        return {
          label: 'Weak',
          color: 'var(--strength-weak)',
          description: 'Needs improvement',
          width: '33%'
        };
      case 'medium':
        return {
          label: 'Medium',
          color: 'var(--strength-medium)',
          description: 'Good, but could be stronger',
          width: '66%'
        };
      case 'strong':
        return {
          label: 'Strong',
          color: 'var(--strength-strong)',
          description: 'Excellent security',
          width: '100%'
        };
      default:
        return {
          label: 'None',
          color: 'var(--accent-light-blue)',
          description: 'No password yet',
          width: '0%'
        };
    }
  };

  const strengthInfo = getStrengthInfo(strength.level);
  const score = strength.score || 0;

  return (
    <div className="strength-indicator">
      <h2 className="section-title">
        <span className="section-icon">📊</span>
        Security Strength
      </h2>
      
      <div className="strength-content">
        <div className="strength-header">
          <div className="strength-label">
            <span className="strength-level" style={{ color: strengthInfo.color }}>
              {strengthInfo.label.toUpperCase()}
            </span>
            <span className="strength-score">
              Score: <strong>{score}/100</strong>
            </span>
          </div>
          <span className="strength-description">
            {strengthInfo.description}
          </span>
        </div>

        <div className="strength-bar-container">
          <div 
            className="strength-bar" 
            style={{ 
              width: strengthInfo.width,
              backgroundColor: strengthInfo.color
            }}
          ></div>
        </div>

        <div className="strength-metrics">
          <div className="metric">
            <span className="metric-label">Length</span>
            <div className="metric-bar">
              <div 
                className="metric-fill" 
                style={{ 
                  width: `${Math.min((score / 100) * 100, 100)}%`,
                  backgroundColor: strengthInfo.color
                }}
              ></div>
            </div>
          </div>
          
          <div className="metric">
            <span className="metric-label">Complexity</span>
            <div className="metric-bar">
              <div 
                className="metric-fill" 
                style={{ 
                  width: `${Math.min((score / 100) * 80, 100)}%`,
                  backgroundColor: strengthInfo.color
                }}
              ></div>
            </div>
          </div>
          
          <div className="metric">
            <span className="metric-label">Entropy</span>
            <div className="metric-bar">
              <div 
                className="metric-fill" 
                style={{ 
                  width: `${Math.min((score / 100) * 120, 100)}%`,
                  backgroundColor: strengthInfo.color
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthIndicator;