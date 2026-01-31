import React, { useState } from 'react';
import InputSection from './components/InputSection/InputSection';
import PasswordDisplay from './components/PasswordDisplay/PasswordDisplay';
import StrengthIndicator from './components/StrengthIndicator/StrengthIndicator';
import ExplanationPanel from './components/ExplanationPanel/ExplanationPanel';
import ActionButtons from './components/ActionButtons/ActionButtons';
import usePasswordGenerator from './hooks/usePasswordGenerator';
import './App.css';
import './styles/global.css';  // If you created this
import './styles/theme.css';

function App() {
  const {
    password,
    strength,
    explanation,
    isLoading,
    isEdited,
    generatePassword,
    evaluatePassword,
    updatePassword
  } = usePasswordGenerator();

  const [options, setOptions] = useState({
    baseWord: '',
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    await generatePassword(options);
  };

  const handleEvaluate = async () => {
    await evaluatePassword(password);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🔐</span>
          Secure Password Generator
        </h1>
        <p className="app-subtitle">
          Generate strong passwords with intelligent security analysis
        </p>
      </header>

      <main className="app-main">
        <div className="dashboard">
          <div className="dashboard-left">
            <InputSection
              options={options}
              onOptionChange={handleOptionChange}
            />
            
            <ActionButtons
              onGenerate={handleGenerate}
              onEvaluate={handleEvaluate}
              isLoading={isLoading}
              password={password}
              isEdited={isEdited}
            />
            
            <PasswordDisplay
              password={password}
              onPasswordChange={updatePassword}
            />
          </div>

          <div className="dashboard-right">
            <StrengthIndicator strength={strength} />
            <ExplanationPanel explanation={explanation} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p className="security-notice">
          🔒 Your security is our priority. No passwords are stored or logged.
        </p>
        <p className="api-info">
          Powered by secure backend APIs • Separation of generation & evaluation
        </p>
      </footer>
    </div>
  );
}

export default App;