import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock, CreditCard, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModal } from '../Auth/LoginModal';

interface HeaderProps {
  onNavigateToSettings?: (tab?: string) => void;
  onLogout?: () => void;
  onLoginSuccess?: () => void;
  onLogin?: (login: string, password: string) => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigateToSettings, 
  onLogout, 
  onLoginSuccess,
  onLogin 
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingsClick = (tab?: string) => {
    setIsDropdownOpen(false);
    if (onNavigateToSettings) {
      onNavigateToSettings(tab);
    }
  };

  const handleLogoutClick = async () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      await logout();
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleLogin = async (login: string, password: string) => {
    if (onLogin) {
      await onLogin(login, password);
      setShowLoginModal(false);
    }
  };

  const settingsMenuItems = [
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'logout', label: 'Sign Out', icon: LogOut, divider: true }
  ];

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = user?.name || 'Sarah Mitchell';
  const userEmail = user?.email || 'sarah@example.com';
  const userPlan = user?.plan || 'Starter Plan';
  const userInitials = getUserInitials(userName);

  // Landing page header (when not authenticated)
  if (!isAuthenticated) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <img 
                  src="/image_2025-06-28_18-28-21 (1).png" 
                  alt="Promptaize Logo" 
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-gray-900">Promptaize</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLoginClick}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  // Dashboard header (when authenticated)
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">Welcome back, {userName.split(' ')[0]}</h2>
          <p className="text-sm text-gray-600">Here's what's happening with your SEO performance today.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="h-6 w-px bg-gray-300"></div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-sky-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">{userInitials}</span>
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-gray-900 block">{userName}</span>
                <span className="text-xs text-gray-500">{userPlan}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-sky-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{userInitials}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{userName}</p>
                      <p className="text-sm text-gray-600">{userEmail}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-1">
                        {userPlan}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {settingsMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id}>
                        {item.divider && <div className="border-t border-gray-100 my-2"></div>}
                        <button
                          onClick={item.id === 'logout' ? handleLogoutClick : () => handleSettingsClick(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                            item.id === 'logout' ? 'text-red-600' : 'text-gray-700'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${
                            item.id === 'logout' ? 'text-red-500' : 'text-gray-500'
                          }`} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};