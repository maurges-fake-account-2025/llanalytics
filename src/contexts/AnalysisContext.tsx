import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { analysisAPI, AnalysisRequest, AnalysisResponse } from '../services/api';

interface AnalysisContextState {
  data: AnalysisResponse | null;
  loading: boolean;
  error: string | null;
  isRateLimit: boolean;
  lastAnalyzed: string | null;
  analyzeWebsite: (request: AnalysisRequest) => Promise<AnalysisResponse>;
  clearError: () => void;
  clearData: () => void;
}

const AnalysisContext = createContext<AnalysisContextState | undefined>(undefined);

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [lastAnalyzed, setLastAnalyzed] = useState<string | null>(null);

  // Load persisted data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('analysisData');
    const savedTimestamp = localStorage.getItem('analysisTimestamp');
    
    if (savedData && savedTimestamp) {
      try {
        const parsedData = JSON.parse(savedData);
        const timestamp = new Date(savedTimestamp).toLocaleString();
        setData(parsedData);
        setLastAnalyzed(timestamp);
      } catch (error) {
        console.error('Failed to load saved analysis data:', error);
        localStorage.removeItem('analysisData');
        localStorage.removeItem('analysisTimestamp');
      }
    }
  }, []);

  const analyzeWebsite = useCallback(async (request: AnalysisRequest) => {
    setLoading(true);
    setError(null);
    setIsRateLimit(false);
    
    try {
      const result = await analysisAPI.analyzeWebsite(request);
      const timestamp = new Date().toLocaleString();
      
      // Update state
      setData(result);
      setLastAnalyzed(timestamp);
      
      // Persist to localStorage for cross-tab synchronization
      localStorage.setItem('analysisData', JSON.stringify(result));
      localStorage.setItem('analysisTimestamp', new Date().toISOString());
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('analysisDataUpdated', { 
        detail: { data: result, timestamp } 
      }));
      
      setLoading(false);
      return result;
    } catch (error) {
      let errorMessage = 'Analysis failed';
      let isRateLimitError = false;

      if (error instanceof Error) {
        errorMessage = error.message;
        // Check if this is a rate limit error
        isRateLimitError = (error as any).isRateLimit === true;
      }

      setError(errorMessage);
      setIsRateLimit(isRateLimitError);
      setLoading(false);
      throw error;
    }
  }, []);

  // Listen for analysis updates from other tabs/components
  useEffect(() => {
    const handleAnalysisUpdate = (event: CustomEvent) => {
      const { data: newData, timestamp } = event.detail;
      setData(newData);
      setLastAnalyzed(new Date(timestamp).toLocaleString());
    };

    window.addEventListener('analysisDataUpdated', handleAnalysisUpdate as EventListener);
    
    return () => {
      window.removeEventListener('analysisDataUpdated', handleAnalysisUpdate as EventListener);
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setIsRateLimit(false);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    setError(null);
    setIsRateLimit(false);
    setLastAnalyzed(null);
    localStorage.removeItem('analysisData');
    localStorage.removeItem('analysisTimestamp');
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('analysisDataCleared'));
  }, []);

  const value: AnalysisContextState = {
    data,
    loading,
    error,
    isRateLimit,
    lastAnalyzed,
    analyzeWebsite,
    clearError,
    clearData,
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysisContext = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysisContext must be used within an AnalysisProvider');
  }
  return context;
};