import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock, CreditCard, LogOut, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onNavigateToSettings?: (tab?: string) => void;
  onBackToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigateToSettings, 
  onBackToLanding
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const handleBackToLanding = () => {
    setIsDropdownOpen(false);
    if (onBackToLanding) {
      onBackToLanding();
    }
  };

  const settingsMenuItems = [
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'back', label: 'Back to Landing', icon: ArrowLeft, divider: true }
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

  const userName = 'Sarah Mitchell';
  const userEmail = 'sarah@example.com';
  const userPlan = 'Starter Plan';
  const userInitials = getUserInitials(userName);

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
                          onClick={item.id === 'back' ? handleBackToLanding : () => handleSettingsClick(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                            item.id === 'back' ? 'text-orange-600' : 'text-gray-700'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${
                            item.id === 'back' ? 'text-orange-500' : 'text-gray-500'
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