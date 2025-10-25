import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertTriangle, Loader } from 'lucide-react';
import type { WeatherData, FarmData, CropRecommendationData } from './types';
import { getWeatherData, getLocationName } from './services/weatherService';
import { getCropRecommendations } from './services/geminiService';
import WeatherHero from './components/WeatherHero';
import QuickStatsGrid from './components/QuickStatsGrid';
import CropRecommendation from './components/CropRecommendation';
import SevenDayForecast from './components/SevenDayForecast';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendationData[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; name: string } | null>(null);
  const [loading, setLoading] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = () => {
      setLoading('Getting your location...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          setLoading('Fetching location and weather data...');
          try {
            // Fetch weather and location name in parallel
            const [weather, locationNameResult] = await Promise.all([
              getWeatherData(latitude, longitude),
              getLocationName(latitude, longitude)
            ]);

            let locationName = locationNameResult;
            // Fallback to coordinates if geocoding fails, which is more accurate than timezone.
            if (!locationName) {
              const latDir = latitude >= 0 ? 'N' : 'S';
              const lonDir = longitude >= 0 ? 'E' : 'W';
              locationName = `${Math.abs(latitude).toFixed(2)}° ${latDir}, ${Math.abs(longitude).toFixed(2)}° ${lonDir}`;
            }
            
            setLocation({ latitude, longitude, name: locationName });
            setWeatherData(weather);

            // Mock farm data
            const mockFarmData: FarmData = {
              soilMoisture: 58,
              soilPh: 6.7,
              airQuality: 92,
              nutrients: { n: 140, p: 45, k: 105 }
            };
            setFarmData(mockFarmData);
            
            setLoading('Generating crop recommendations...');
            const dailyAverages = weather.daily.temperature_2m_max.map(
              (max, i) => (max + weather.daily.temperature_2m_min[i]) / 2
            );
            const weeklyAvgTemp =
              dailyAverages.reduce((sum, temp) => sum + temp, 0) /
              (dailyAverages.length || 1);
            const recs = await getCropRecommendations({
              lat: latitude,
              lon: longitude,
              avgTemp: weeklyAvgTemp,
              soilMoisture: mockFarmData.soilMoisture,
              soilPh: mockFarmData.soilPh,
            });
            setRecommendations(recs);
            setLoading('');

          } catch (err) {
            console.error(err);
            setError('Failed to fetch data. Please try again later.');
            setLoading('');
          }
        },
        (geoError) => {
          console.error(geoError);
          setError('Could not access location. Please enable location services in your browser.');
          setLoading('');
        }
      );
    };

    fetchInitialData();
  }, []);

  const backgroundStyle = useMemo(() => {
    if (!weatherData) return 'from-sky-300 to-sky-500';
    const code = weatherData.current.weather_code;
    const isDay = weatherData.current.is_day;

    if ([0, 1].includes(code)) return isDay ? 'from-amber-300 to-orange-500' : 'from-slate-800 to-indigo-900'; // Sunny
    if ([2, 3].includes(code)) return isDay ? 'from-slate-400 to-gray-500' : 'from-slate-700 to-gray-800'; // Cloudy
    if (code >= 51 && code <= 67) return 'from-blue-400 to-indigo-600'; // Rainy
    if (code >= 95) return 'from-slate-600 to-slate-800'; // Stormy
    
    return 'from-sky-300 to-sky-500';
  }, [weatherData]);

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${backgroundStyle} transition-colors duration-1000`}>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex flex-col items-center justify-center text-white"
          >
            <Loader className="animate-spin h-12 w-12 mb-4" />
            <p className="text-xl">{loading}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3" />
            <p>{error}</p>
          </div>
        )}

        {location && (
          <div className="flex items-center justify-center md:justify-start text-white/80 gap-2">
            <MapPin size={16} />
            <span className="font-semibold">{location.name}</span>
          </div>
        )}

        <AnimatePresence>
          {weatherData && farmData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <WeatherHero weatherData={weatherData} />
              <QuickStatsGrid farmData={farmData} />
              {recommendations.length > 0 && <CropRecommendation recommendations={recommendations} />}
              <SevenDayForecast weatherData={weatherData} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;