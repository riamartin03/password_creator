import React from 'react';
import './InputSection.css';

const InputSection = ({ options, onOptionChange }) => {
  const toggleOptions = [
    { key: 'uppercase', label: 'Uppercase Letters', icon: 'A' },
    { key: 'lowercase', label: 'Lowercase Letters', icon: 'a' },
    { key: 'numbers', label: 'Numbers', icon: '123' },
    { key: 'symbols', label: 'Special Symbols', icon: '#$%' },
  ];

  return (
    <div className="input-section">
      <h2 className="section-title">
        <span className="section-icon">⚙️</span>
        Password Settings
      </h2>
      
      <div className="input-group">
        <label className="input-label">
          <span className="label-text">Base Word (Optional)</span>
          <input
            type="text"
            className="text-input"
            placeholder="e.g., name or memory anchor"
            value={options.baseWord}
            onChange={(e) => onOptionChange('baseWord', e.target.value)}
          />
          <span className="input-hint">
            Adds personal meaning while maintaining security
          </span>
        </label>
      </div>

      <div className="input-group">
        <label className="input-label">
          <span className="label-text">
            Password Length: <span className="length-value">{options.length}</span>
          </span>
          <input
            type="range"
            min="8"
            max="32"
            value={options.length}
            onChange={(e) => onOptionChange('length', parseInt(e.target.value))}
            className="length-slider"
          />
          <div className="slider-ticks">
            <span>8</span>
            <span>12</span>
            <span>16</span>
            <span>20</span>
            <span>24</span>
            <span>32</span>
          </div>
        </label>
      </div>

      <div className="toggle-group">
        <h3 className="toggle-group-title">Character Types</h3>
        <div className="toggle-grid">
          {toggleOptions.map((toggle) => (
            <label key={toggle.key} className="toggle-item">
              <div className="toggle-content">
                <span className="toggle-icon">{toggle.icon}</span>
                <span className="toggle-label">{toggle.label}</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={options[toggle.key]}
                  onChange={(e) => onOptionChange(toggle.key, e.target.checked)}
                  className="toggle-checkbox"
                />
                <span className="toggle-slider"></span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputSection;