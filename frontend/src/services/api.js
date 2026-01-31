const API_BASE_URL = 'http://127.0.0.1:8000';

export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};
