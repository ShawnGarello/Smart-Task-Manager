const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);

  if (!response.ok) {
    throw new Error('Health request failed');
  }

  return response.json();
}