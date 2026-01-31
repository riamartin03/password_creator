import React from 'react';
import './ActionButtons.css';

const ActionButtons = ({ onGenerate, onEvaluate, isLoading, password,isEdited }) => {
  return (
    <div className="action-buttons">
      <button
        className="btn btn-primary"
        onClick={onGenerate}
        disabled={isLoading}
      >
        <span className="btn-icon">✨</span>
        <span className="btn-text">
          {isLoading ? 'Generating...' : 'Generate Secure Password'}
        </span>
      </button>
      
      {isEdited && (
  <button
    className="btn btn-secondary"
    onClick={onEvaluate}
    disabled={isLoading || !password}
  >
    <span className="btn-icon">🔍</span>
    <span className="btn-text">Re-evaluate Security</span>
  </button>
)}

      
      <div className="button-hints">
        <div className="hint">
          <span className="hint-icon">💡</span>
          <span className="hint-text">Generate creates a new password based on your settings</span>
        </div>
        <div className="hint">
          <span className="hint-icon">✏️</span>
          <span className="hint-text">Edit the password directly, then re-evaluate to check security</span>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;