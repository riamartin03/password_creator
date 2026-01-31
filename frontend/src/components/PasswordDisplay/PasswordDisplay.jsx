import React, { useState } from 'react';
import './PasswordDisplay.css';

const PasswordDisplay = ({ password, onPasswordChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRegenerate = () => {
    // This would trigger a re-generate from parent
    // For now, just clear if empty
    if (!password) {
      onPasswordChange('');
    }
  };

  return (
    <div className="password-display">
      <div className="display-header">
        <h2 className="section-title">
          <span className="section-icon">🔑</span>
          Generated Password
        </h2>
        <div className="display-actions">
          <button
            className="action-btn visibility-btn"
            onClick={() => setIsVisible(!isVisible)}
            title={isVisible ? 'Hide password' : 'Show password'}
          >
            {isVisible ? '👁️' : '👁️‍🗨️'}
          </button>
          <button
            className="action-btn copy-btn"
            onClick={handleCopy}
            disabled={!password}
            title="Copy to clipboard"
          >
            {isCopied ? '✅' : '📋'}
          </button>
        </div>
      </div>

      <div className="password-field-wrapper">
        <input
          type={isVisible ? 'text' : 'password'}
          className="password-input"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Your secure password will appear here"
          spellCheck="false"
        />
        {password && (
          <div className="password-meta">
            <span className="password-length">
              Length: {password.length}
            </span>
            <span className="password-hint">
              ✏️ Edit directly to customize
            </span>
          </div>
        )}
      </div>

      {isCopied && (
        <div className="copy-notification">
          Password copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default PasswordDisplay;