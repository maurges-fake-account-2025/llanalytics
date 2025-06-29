import React, { useState } from 'react'
import { LogIn } from 'lucide-react'
import LoginModal from './LoginModal'

interface HeaderProps {
  onLogin: (username: string, password: string) => Promise<void>
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo (1).png" 
                alt="Promptaize Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-gray-900 modern-brand">Promptaize</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              
              <div className="flex items-center">
                <img 
                  src="/white_circle_360x360.png" 
                  alt="Powered by Bolt.new" 
                  className="h-10 w-10 rounded-full shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={onLogin}
      />
    </>
  )
}

export default Header