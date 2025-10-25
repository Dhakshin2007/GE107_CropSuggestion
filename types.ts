
export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    precipitation_probability_max: number[];
  };
}

export interface FarmData {
  soilMoisture: number;
  soilPh: number;
  airQuality: number;
  nutrients: {
    n: number;
    p: number;
    k: number;
  };
}

export interface CropRecommendationData {
  cropName: string;
  suitabilityScore: number;
  rationale: string;
  comparisonMetrics: {
    'Water Need': number;
    'Market Value': number;
    'Pest Resistance': number;
  };
}
