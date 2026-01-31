import { apiRequest } from './api';

export const generatePasswordAPI = async (options) => {
  return apiRequest('/generate-password', 'POST', {
    base_word: options.baseWord,
    length: options.length,
    uppercase: options.uppercase,
    lowercase: options.lowercase,
    numbers: options.numbers,
    symbols: options.symbols
  });
};
export const evaluatePasswordAPI = async (password) => {
  return apiRequest('/evaluate-password', 'POST', { password });
};