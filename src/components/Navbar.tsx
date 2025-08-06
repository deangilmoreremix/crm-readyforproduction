import React, { useState } from  'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Home, 
  Users, 
  BarChart3, 
  CheckSquare, 
  MessageSquare, 
  Brain, 
  Settings, 
  Sun, 
  Moon,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAIDropdownOpen, setIsAIDropdownOpen] = useState(false);

  

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Contacts', href: '/contacts-enhanced', icon: Users },
    { name: 'Pipeline', href: '/pipeline', icon: BarChart3 },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Communication', href: '/communication', icon: MessageSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const aiToolsItems = [
    { name: 'AI Tools Hub', href: '/ai-tools' },
    { name: 'AI Integration', href: '/ai-integration' },
    { name: 'System Overview', href: '/system-overview' },
    {  name: 'Mobile Features', href: '/mobile' },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      isDark 
        ? 'bg-gray-900/95 border-gray-800' 
        :   'bg-white/95 border-gray-200'
    } backdrop-blur-xl border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboar d" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className={`font-bold text-xl ${isDark ?  'text-white' : 'text-gray-900'}`}>
                SmartCRM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.href)
                        ? isDark
                          ? 'bg-gray-800 text-white'
                          :  'bg-gray-100 text-gray-900'
                        : isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* AI Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAIDropdownOpen(!isAIDropdownOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2  ${
                    isDark
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Brain size={16} />
                  <span>AI Tools</span>
                  <ChevronDown size={14} className={`transition-transform ${isAIDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAIDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1">
                      {aiToolsItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isDark
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          onClick={() => setIsAIDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.href)
                        ? isDark
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* AI Tools in Mobile Menu */}
              <div className="border-t border-gray-200 dark: border-gray-700 pt-2 mt-2">
                <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  AI Tools
                </div>
                {aiToolsItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? isDark
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                        :  isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close dropdown */}
      {isAIDropdownOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setIsAIDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;