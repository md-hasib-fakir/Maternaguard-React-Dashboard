// src/services/mlService.js

const API_URL = 'https://maternaguard-api.onrender.com/predict';

export const predictRisk = async (heartRate, spo2, temperature) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heartRate: heartRate,
        spo2: spo2,
        temperature: temperature
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prediction');
    }

    const data = await response.json();
    return data.riskLevel; // 'Low', 'Mid', or 'High'
  } catch (error) {
    console.error('Error predicting risk:', error);
    return 'Low'; // Fallback to Low if API fails
  }
};