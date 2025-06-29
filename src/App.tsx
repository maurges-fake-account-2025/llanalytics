import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { BrandSelector } from './components/Layout/BrandSelector';
import { Dashboard } from './components/Dashboard/Dashboard';
import { NicheAnalysis } from './components/NicheAnalysis/NicheAnalysis';
import { Optimization } from './components/Optimization/Optimization';
import { PersonalSettings } from './components/PersonalSettings/PersonalSettings';
import LandingPage from './components/LandingPage';
import { AnalysisProvider } from './contexts/AnalysisContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading: authLoading, login, logout, error: authError, clearError } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [brandName, setBrandName] = useState('Hermès');
  const [url, setUrl] = useState('hermes.com');
  const [industry, setIndustry] = useState('Fashion');
  const [activeSettingsTab, setActiveSettingsTab] = useState('account');

  const handleNavigateToSettings = (tab?: string) => {
    setActiveModule('personal-settings');
    if (tab) {
      setActiveSettingsTab(tab);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    clearError();
    try {
      await login(username, password);
      // No need to do anything here - the auth context will update isAuthenticated
      // and the component will automatically re-render to show the dashboard
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to let the calling component handle the error
    }
  };

  const handleLogout = async () => {
    await logout();
    // Reset app state on logout
    setActiveModule('dashboard');
    setBrandName('Hermès');
    setUrl('hermes.com');
    setIndustry('Fashion');
  };

  const handleLoginSuccess = () => {
    // This callback is called when login is successful
    // The auth context will automatically update isAuthenticated
    console.log('Login successful - user will be redirected to dashboard');
  };

  const renderModule = () => {
    const commonProps = { brandName, url, industry };
    
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'niche-analysis':
        return <NicheAnalysis {...commonProps} />;
      case 'optimization':
        return <Optimization {...commonProps} />;
      case 'personal-settings':
        return <PersonalSettings onTabChange={setActiveSettingsTab} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  // Show loading spinner during auth check
  if (authLoading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return <LandingPage onLoginSuccess={handleLoginSuccess} onLogin={handleLogin} />;
  }

  // Show main application if authenticated
  return (
    <AnalysisProvider>
      <div className="h-screen bg-gray-50 flex">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onNavigateToSettings={handleNavigateToSettings} onLogout={handleLogout} />
          {activeModule !== 'personal-settings' && (
            <BrandSelector
              brandName={brandName}
              setBrandName={setBrandName}
              url={url}
              setUrl={setUrl}
              industry={industry}
              setIndustry={setIndustry}
            />
          )}
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {renderModule()}
            </div>
          </main>
        </div>
      </div>
    </AnalysisProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;