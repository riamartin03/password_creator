import { useState, useCallback, useRef, useEffect } from 'react';
import { generatePasswordAPI, evaluatePasswordAPI } from '../services/passwordService';

const usePasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ level: '', score: 0, reasons: [] });
  const [explanation, setExplanation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  
  const debounceTimerRef = useRef(null);

  // 🔐 Generate password
  const generatePassword = useCallback(async (options) => {
    setIsLoading(true);

    try {
      const data = await generatePasswordAPI(options);
      setPassword(data.password);
      setStrength(data.strength);
      setExplanation(data.explanation || []); // ✅ Transformation-based explanations
      setIsEdited(false);
    } catch (error) {
      console.error('Error generating password:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔍 Evaluate edited password
  const evaluatePassword = useCallback(async (passwordToEvaluate) => {
    if (!passwordToEvaluate.trim()) return;

    setIsLoading(true);
    try {
      const data = await evaluatePasswordAPI(passwordToEvaluate);
      setStrength(data.strength);
      setExplanation(data.explanation || []); // ✅ Character-by-character breakdown
    } catch (error) {
      console.error('Error evaluating password:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✏️ User edits password (with debouncing)
  const updatePassword = useCallback((newPassword) => {
    setPassword(newPassword);
    setIsEdited(true);
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      evaluatePassword(newPassword);
    }, 500);
  }, [evaluatePassword]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    password,
    strength,
    explanation,
    isLoading,
    isEdited,
    generatePassword,
    evaluatePassword,
    updatePassword
  };
};

export default usePasswordGenerator;