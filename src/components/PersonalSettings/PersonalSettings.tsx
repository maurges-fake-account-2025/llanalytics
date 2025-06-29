import React, { useState } from 'react';
import { 
  Lock, 
  CreditCard, 
  ChevronDown, 
  Check, 
  Eye, 
  EyeOff,
  Crown,
  Zap,
  Shield
} from 'lucide-react';

interface PersonalSettingsProps {
  onTabChange?: (tab: string) => void;
}

export const PersonalSettings: React.FC<PersonalSettingsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('subscription');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$69',
      originalPrice: '$99',
      period: 'month',
      discount: '30% OFF',
      icon: Zap,
      color: 'blue',
      features: [
        '25 AI prompts daily',
        'ChatGPT/Claude/Perplexity tracking',
        'Basic sentiment analysis',
        '3 countries tracking',
        '2 team seats',
        'Email support',
        'Daily tracking updates'
      ],
      current: true,
      buttonText: 'Current Plan'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$133',
      originalPrice: '$190',
      period: 'month',
      discount: '30% OFF',
      icon: Crown,
      color: 'purple',
      features: [
        '100 AI prompts daily',
        'ChatGPT/Claude/Perplexity tracking',
        'Advanced sentiment & competitor analysis',
        '5 countries tracking',
        '5 team seats',
        'Email + Slack support',
        'Real-time tracking',
        'Custom brand keywords'
      ],
      current: false,
      buttonText: 'Join Waitlist'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$315',
      originalPrice: '$450',
      period: 'month',
      discount: '30% OFF',
      icon: Shield,
      color: 'green',
      features: [
        '300 AI prompts daily',
        'Full AI platform coverage',
        'Complete sentiment intelligence',
        '10 countries tracking',
        'Unlimited team seats',
        'Email + Slack + Phone support',
        'Custom integrations',
        'Dedicated GEO specialist',
        'Implementation support'
      ],
      current: false,
      buttonText: 'Join Waitlist'
    }
  ];

  const tabs = [
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: CreditCard }
  ];

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    // Handle password change logic here
    alert('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const handleJoinWaitlist = () => {
    window.open('https://promptize.com', '_blank');
  };

  const getPlanColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      green: 'bg-green-50 border-green-200 text-green-900'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPlanIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Personal Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and subscription</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Change Password</h3>
                <p className="text-gray-600 text-sm">Update your password to keep your account secure</p>
              </div>

              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePasswordChange}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription Plans</h3>
                <p className="text-gray-600 text-sm">Choose the plan that best fits your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                        plan.current
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {plan.current && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Current Plan
                          </span>
                        </div>
                      )}

                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${getPlanColor(plan.color)}`}>
                          <Icon className={`w-6 h-6 ${getPlanIconColor(plan.color)}`} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                        <div className="mb-2">
                          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-600">/{plan.period}</span>
                        </div>
                        <div className="mb-4">
                          <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                          <span className="ml-2 text-sm font-medium text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                            {plan.discount}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={plan.current ? undefined : handleJoinWaitlist}
                        disabled={plan.current}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          plan.current 
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Billing Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Plan:</span>
                    <span className="ml-2 font-medium text-gray-900">Starter Plan</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Billing Cycle:</span>
                    <span className="ml-2 font-medium text-gray-900">Monthly</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Next Billing Date:</span>
                    <span className="ml-2 font-medium text-gray-900">January 15, 2025</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="ml-2 font-medium text-gray-900">•••• 4242</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Update Payment Method
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Download Invoices
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};