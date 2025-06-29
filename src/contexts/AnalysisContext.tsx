import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { analysisAPI, AnalysisRequest, AnalysisResponse } from '../services/api';
import { authAPI } from '../services/auth';

interface AnalysisContextState {
  data: AnalysisResponse | null;
  loading: boolean;
  error: string | null;
  lastAnalyzed: string | null;
  analyzeWebsite: (request: Omit<AnalysisRequest, 'token'>) => Promise<AnalysisResponse>;
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

  const analyzeWebsite = useCallback(async (request: Omit<AnalysisRequest, 'token'>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if user is authenticated
      if (!authAPI.isAuthenticated()) {
        throw new Error('Authentication required. Please log in.');
      }

      const result = await analysisAPI.analyzeWebsite(request as AnalysisRequest);
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
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      setError(errorMessage);
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
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    setError(null);
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