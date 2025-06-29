import React from 'react';
import { 
  BarChart3, 
  Bot, 
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'niche-analysis', label: 'Niche Analysis', icon: TrendingUp },
  { id: 'optimization', label: 'Optimization', icon: Target },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const { user } = useAuth();
  
  const userName = user?.name || 'Sarah Mitchell';
  const userPlan = user?.plan || 'Starter Plan';
  
  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userInitials = getUserInitials(userName);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <img 
            src="/image_2025-06-28_18-28-21 (1).png" 
            alt="Promptaize" 
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Analytics
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onModuleChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeModule === item.id
                          ? 'bg-orange-50 text-orange-700 border border-orange-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${
                        activeModule === item.id ? 'text-orange-600' : 'text-gray-500'
                      }`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-sky-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">{userInitials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userPlan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};