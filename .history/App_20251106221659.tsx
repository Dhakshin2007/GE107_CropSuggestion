import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader, Bot } from 'lucide-react';
import type { WeatherData, FarmData, CropRecommendationData, ChatMessage } from './types';
import { getWeatherData } from './services/weatherService';
import { getCropRecommendations, createChat } from './services/geminiService';
import { getLatestFarmData, getHistoricalFarmData } from './services/supabaseService';
import WeatherHero from './components/WeatherHero';
import QuickStatsGrid from './components/QuickStatsGrid';
import CropRecommendation from './components/CropRecommendation';
import SevenDayForecast from './components/SevenDayForecast';
import Header from './components/Header';
import HistoricalDataChart from './components/HistoricalDataChart';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AIChatAgent from './components/AIChatAgent';
import type { Chat } from '@google/genai';
import ProactiveAlerts from './components/ProactiveAlerts.tsx';
import CustomCursor from './components/CustomCursor.tsx';

// Updated location to IIT Ropar
const DEVICE_LOCATION = {
  latitude: 30.8963, // IIT Ropar
  longitude: 76.5413,
  name: "IIT Ropar 🎓"
};

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [historicalData, setHistoricalData] = useState<FarmData[]>([]);
  const [recommendations, setRecommendations] = useState<CropRecommendationData[]>([]);
  const [loading, setLoading] = useState<string>('Initializing dashboard...');
  const [error, setError] = useState<string | null>(null);
  
  const [recsLoading, setRecsLoading] = useState<boolean>(false);
  const [recsError, setRecsError] = useState<string | null>(null);
  const isInitialMount = useRef(true);
  const recommendationUpdateCounter = useRef(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // AI Chat Agent State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAgentLoading, setIsAgentLoading] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  // Initialize Chat Session
  useEffect(() => {
    const session = createChat();
    setChatSession(session);
    setChatMessages([
      { role: 'model', text: "Hi! I'm your Agri-AI assistant. Ask me anything about your farm data or crop recommendations!" }
    ]);
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!chatSession || !message.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatMessages(prev => [...prev, userMessage]);
    setIsAgentLoading(true);

    try {
        const contextData = {
            currentFarmData: farmData,
            sevenDayWeatherForecast: weatherData,
            currentCropRecommendations: recommendations,
        };
        const contextString = `CONTEXT: ${JSON.stringify(contextData)}`;
        const fullPrompt = `${contextString}\n\nUSER QUESTION: ${message}`;
        
        const responseStream = await chatSession.sendMessageStream({ message: fullPrompt });

        let fullResponse = "";
        setChatMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of responseStream) {
            fullResponse += chunk.text;
            setChatMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = fullResponse;
                return newMessages;
            });
        }
    } catch (err) {
        console.error("AI agent failed to respond:", err);
        const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment." };
        setChatMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsAgentLoading(false);
    }
};


  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        let yPos = 15;

        pdf.setFontSize(22);
        pdf.text('AgriSuggest AI - Daily Farm Summary', pdfWidth / 2, yPos, { align: 'center' });
        yPos += 8;
        pdf.setFontSize(12);
        pdf.text(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`, pdfWidth / 2, yPos, { align: 'center' });
        yPos += 5;
        pdf.text(DEVICE_LOCATION.name, pdfWidth / 2, yPos, { align: 'center' });
        yPos += 15;

        const addComponentAsImage = async (elementId: string) => {
            const element = document.getElementById(elementId);
            if (!element) return;

            const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: null });
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * (pdfWidth - 20)) / imgProps.width;

            if (yPos + imgHeight > pdfHeight - 20) {
                pdf.addPage();
                yPos = 15;
            }
            pdf.addImage(imgData, 'PNG', 10, yPos, pdfWidth - 20, imgHeight);
            yPos += imgHeight + 10;
        };

        await addComponentAsImage('weather-hero-export');
        await addComponentAsImage('quick-stats-export');
        await addComponentAsImage('crop-recs-export');
        await addComponentAsImage('trends-chart-export');
        await addComponentAsImage('forecast-export');

        pdf.save(`AgriSuggest_Summary_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
        console.error("Failed to generate PDF:", err);
        setError("Could not generate PDF summary. Please try again.");
    } finally {
        setIsExporting(false);
    }
  };


  // Initial data fetch effect for non-AI data
  useEffect(() => {
    const fetchInitialData = async () => {
      setError(null);
      try {
        setLoading('Fetching local weather data...');
        const weather = await getWeatherData(DEVICE_LOCATION.latitude, DEVICE_LOCATION.longitude);
        setWeatherData(weather);

        setLoading('Fetching latest farm data from Supabase...');
        const initialFarmData = await getLatestFarmData();
        setFarmData(initialFarmData);
        
        setLoading('Fetching historical farm data...');
        const history = await getHistoricalFarmData();
        setHistoricalData(history.reverse());
        
        setLoading(''); // Base data loaded
      } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(`Failed to fetch initial data: ${errorMessage}. Please check your internet connection and Supabase credentials.`);
        setLoading('');
      }
    };

    fetchInitialData();
  }, []); // Run only once on mount

  // Effect to fetch recommendations whenever farmData changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!farmData || !weatherData) return;

      // Only fetch recommendations on the initial load, or when the counter reaches 15.
      if (isInitialMount.current) {
        isInitialMount.current = false; // Allow the first fetch
      } else if (recommendationUpdateCounter.current < 15) {
        console.log(`Skipping recommendation update. Count: ${recommendationUpdateCounter.current}/15`);
        return; // Don't fetch yet
      }

      console.log('Triggering AI recommendation update...');
      recommendationUpdateCounter.current = 0; // Reset the counter

      setRecsLoading(true);
      setRecsError(null);
      try {
        const dailyAverages = weatherData.daily.temperature_2m_max.map(
          (max, i) => (max + weatherData.daily.temperature_2m_min[i]) / 2
        );
        const weeklyAvgTemp =
          dailyAverages.reduce((sum, temp) => sum + temp, 0) /
          (dailyAverages.length || 1);
          
        const recs = await getCropRecommendations({
          lat: DEVICE_LOCATION.latitude,
          lon: DEVICE_LOCATION.longitude,
          avgTemp: weeklyAvgTemp,
          humidity: farmData.humidity,
          soilMoisture: farmData.soilMoisture,
          lightIntensity: farmData.lightIntensity,
        });
        setRecommendations(recs);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setRecsError("Failed to generate AI recommendations. Please ensure your Gemini API key is configured correctly.");
      } finally {
        setRecsLoading(false);
      }
    };

    fetchRecommendations();
  }, [farmData, weatherData]); // Re-run when farm or weather data is available/changes


  // Polling for data updates
  useEffect(() => {
    if (error) return; // Don't poll if there was a fatal error

    const intervalId = setInterval(async () => {
        try {
            const newData = await getLatestFarmData();
            if (newData) {
                // Only update if the new data is actually new
                if (!farmData || newData.createdAt !== farmData.createdAt) {
                    console.log('Polling found new farm data...');
                    // Increment counter before updating state to trigger the recommendation effect
                    recommendationUpdateCounter.current += 1;
                    setFarmData(newData);
                    
                    // Add new data to the historical chart and remove the oldest point
                    // If historical data was empty, fetch the whole set first
                    if (historicalData.length === 0) {
                        const history = await getHistoricalFarmData();
                        setHistoricalData(history.reverse());
                    } else {
                        setHistoricalData(prevData => [...prevData.slice(1), newData]);
                    }
                }
            }
        } catch (err) {
            console.error("Failed to poll for farm data:", err);
            // Don't set a fatal error for polling failures
        }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [farmData, historicalData, error]);

  const backgroundStyle = useMemo(() => {
    if (!weatherData) return 'from-slate-400 to-gray-500';
    const code = weatherData.current.weather_code;
    const isDay = weatherData.current.is_day;

    if ([0, 1].includes(code)) return isDay ? 'from-amber-300 to-orange-500' : 'from-slate-800 to-indigo-900';
    if ([2, 3].includes(code)) return isDay ? 'from-slate-400 to-gray-500' : 'from-slate-700 to-gray-800';
    if (code >= 51 && code <= 67) return 'from-blue-400 to-indigo-600';
    if (code >= 95) return 'from-slate-600 to-slate-800';
    
    return 'from-sky-300 to-sky-500';
  }, [weatherData]);

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${backgroundStyle} transition-colors duration-1000`}>
      <CustomCursor />
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

      <main className="container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3" />
            <p>{error}</p>
          </div>
        )}

        <AnimatePresence>
          {weatherData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <Header 
                deviceName={farmData?.deviceId || "Waiting..."} 
                locationName={DEVICE_LOCATION.name} 
                onExportPDF={handleExportPDF}
                isExporting={isExporting}
              />
              <ProactiveAlerts
                farmData={farmData}
                weatherData={weatherData}
                historicalData={historicalData}
              />
              <div id="weather-hero-export">
                <WeatherHero weatherData={weatherData} />
              </div>
              
              <div id="quick-stats-export">
                {farmData ? (
                    <QuickStatsGrid farmData={farmData} />
                ) : (
                    !loading && !error && <EmptyState />
                )}
              </div>
              
              <div id="crop-recs-export">
                {(farmData || recsLoading || recsError) && (
                  <CropRecommendation 
                    recommendations={recommendations} 
                    isLoading={recsLoading}
                    error={recsError}
                  />
                )}
              </div>

              <div id="trends-chart-export">
                {historicalData.length > 0 && <HistoricalDataChart data={historicalData} />}
              </div>

              <div id="forecast-export">
                <SevenDayForecast weatherData={weatherData} />
              </div>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {!loading && (
          <motion.button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            aria-label="Open AI Chat Assistant"
          >
            <Bot size={32} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <AIChatAgent
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isAgentLoading}
      />
    </div>
  );
};

export default App;