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

const AppContent: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [brandName, setBrandName] = useState('Hermès');
  const [url, setUrl] = useState('hermes.com');
  const [industry, setIndustry] = useState('Fashion');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [activeSettingsTab, setActiveSettingsTab] = useState('account');

  const handleNavigateToSettings = (tab?: string) => {
    setActiveModule('personal-settings');
    if (tab) {
      setActiveSettingsTab(tab);
    }
  };

  const handleOpenDashboard = () => {
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
    // Reset app state when going back to landing
    setActiveModule('dashboard');
    setBrandName('Hermès');
    setUrl('hermes.com');
    setIndustry('Fashion');
    setKeywords([]);
  };

  const renderModule = () => {
    const commonProps = { brandName, url, industry, keywords };
    
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

  // Show landing page if dashboard is not open
  if (!showDashboard) {
    return <LandingPage onOpenDashboard={handleOpenDashboard} />;
  }

  // Show main application if dashboard is open
  return (
    <AnalysisProvider>
      <div className="h-screen bg-gray-50 flex">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onNavigateToSettings={handleNavigateToSettings} onBackToLanding={handleBackToLanding} />
          {activeModule !== 'personal-settings' && (
            <BrandSelector
              brandName={brandName}
              setBrandName={setBrandName}
              url={url}
              setUrl={setUrl}
              industry={industry}
              setIndustry={setIndustry}
              keywords={keywords}
              setKeywords={setKeywords}
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
  return <AppContent />;
}

export default App;