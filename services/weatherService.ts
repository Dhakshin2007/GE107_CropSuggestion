import type { WeatherData } from '../types';

const API_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max',
    timezone: 'auto',
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data as WeatherData;
};

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    count: '1',
    language: 'en',
    format: 'json',
  });

  try {
    const response = await fetch(`${GEOCODING_API_URL}?${params.toString()}`);
    if (!response.ok) {
      console.warn('Reverse geocoding failed, will fall back to timezone.');
      return '';
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      // Prefer city name, but fallback to admin1 (state/province) if city is not available
      return data.results[0].name || data.results[0].admin1 || '';
    }
    return '';
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return ''; // Return empty on network error to allow fallback
  }
};
