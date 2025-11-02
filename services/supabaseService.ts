import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { FarmData } from '../types';

// In a production environment, these should be stored securely as environment variables.
// For this interactive session, we'll use the values you provided directly.
const supabaseUrl = 'https://fwnsxlojxqvdwaseomhs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bnN4bG9qeHF2ZHdhc2VvbWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjQ4MjgsImV4cCI6MjA3NzUwMDgyOH0.ooP4Vp_m08uGv1xuqOxE4q4KqhwEzOb1XpforRRDUbA';


if (!supabaseUrl || !supabaseAnonKey) {
  // This check is kept just in case, but should not be triggered with hardcoded values.
  throw new Error("Supabase URL and Anon Key must be provided.");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Helper to map database snake_case to application camelCase
const mapDataToFarmData = (data: any): FarmData | null => {
  if (!data) return null;
  return {
    createdAt: data.created_at,
    deviceId: data.device_id,
    temperature: data.temperature,
    humidity: data.humidity,
    lightIntensity: data.light,
    soilMoisture: data.soil,
  };
};

/**
 * Fetches the single most recent entry from the environment_data table.
 * Returns null if no data is found, allowing the UI to show an empty state.
 */
export const getLatestFarmData = async (): Promise<FarmData | null> => {
  const { data, error } = await supabase
    .from('environment_data')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "exact one row not found"
    console.error("Error fetching latest farm data:", error);
    throw new Error('Could not fetch latest data from Supabase. ' + error.message);
  }
  
  return mapDataToFarmData(data);
};

/**
 * Fetches the most recent entries from the environment_data table for historical charts.
 */
export const getHistoricalFarmData = async (limit = 50): Promise<FarmData[]> => {
    const { data, error } = await supabase
        .from('environment_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching historical farm data:", error);
        throw new Error('Could not fetch historical data from Supabase. ' + error.message);
    }
    
    // Map the data and filter out any potential nulls
    return data?.map(mapDataToFarmData).filter((d): d is FarmData => d !== null) || [];
};