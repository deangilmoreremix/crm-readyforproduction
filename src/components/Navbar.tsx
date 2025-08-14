import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, User, Bell, Search, BarChart3, Users, Target, MessageSquare, Video, FileText, Zap, TrendingUp, Calendar, Phone, Receipt, BookOpen, Mic, Sun, Moon, Brain, Mail, Grid3X3, Briefcase, Megaphone, Activity, CheckSquare, Sparkles, PieChart, Clock, Shield, Globe, Camera, Layers, Repeat, Palette, DollarSign, Volume2, Image, Bot, Eye, Code, MessageCircle, AlertTriangle, LineChart, Edit3, ExternalLink, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useDealStore } from '../store/dealStore';
import { useContactStore } from '../store/contactStore';
import { useTaskStore } from '../store/taskStore';
import { useAppointmentStore } from '../store/appointmentStore';

interface NavbarProps {
  onOpenPipelineModal?: () => void;
}

// Memoize Navbar to prevent unnecessary re-renders
const Navbar: React.FC<NavbarProps> = React.memo(({ onOpenPipelineModal }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { openAITool } = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data for dynamic counters
  const { deals } = useDealStore();
  const { contacts } = useContactStore();
  const { tasks } = useTaskStore();
  const { appointments } = useAppointmentStore();

  // Use useMemo to calculate counters and prevent recalculation on every render
  const counters = React.useMemo(() => {
    const activeDeals = Object.values(deals).filter(deal =>
      deal.stage !== 'closed-won' && deal.stage !== 'closed-lost'
    ).length;
    
    const hotContacts = Object.values(contacts).filter(contact => 
      contact.status === 'hot'
    ).length;
    
    const pendingTasks = Object.values(tasks).filter(task => 
      !task.completed
    ).length;
    
    const todayAppointments = Object.values(appointments).filter(apt => {
      if (!apt.startTime) return false;
      const today = new Date();
      const aptDate = new Date(apt.startTime);
      return aptDate.toDateString() === today.toDateString() && apt.status === 'scheduled';
    }).length;

    return {
      activeDeals,
      hotContacts,
      pendingTasks,
      todayAppointments,
      totalNotifications: hotContacts + pendingTasks + todayAppointments
    };
  }, [deals, contacts, tasks, appointments]);

  // Tasks dropdown tools
  const taskTools = [
    { name: 'Task Management', tool: 'task-management', icon: CheckSquare },
    { name: 'Task Automation', tool: 'task-automation', icon: Bot },
    { name: 'Project Tracker', tool: 'project-tracker', icon: Layers },
    { name: 'Time Tracking', tool: 'time-tracking', icon: Clock },
    { name: 'Workflow Builder', tool: 'workflow-builder', icon: Repeat },
    { name: 'Deadline Manager', tool: 'deadline-manager', icon: AlertTriangle }
  ];

  // Sales dropdown tools
  const salesTools = [
    { name: 'Sales Tools', tool: 'sales-tools', icon: DollarSign },
    { name: 'Lead Automation', tool: 'lead-automation', icon: Bot },
    { name: 'Circle Prospecting', tool: 'circle-prospecting', icon: Target },
    { name: 'Appointments', tool: 'appointments', icon: Calendar },
    { name: 'Phone System', tool: 'phone-system', icon: Phone },
    { name: 'Invoicing', tool: 'invoicing', icon: Receipt },
    { name: 'Sales Analytics', tool: 'sales-analytics', icon: TrendingUp },
    { name: 'Deal Pipeline', tool: 'deal-pipeline', icon: Briefcase },
    { name: 'Quote Builder', tool: 'quote-builder', icon: FileText },
    { name: 'Commission Tracker', tool: 'commission-tracker', icon: PieChart },
    { name: 'Follow-up Reminders', tool: 'follow-up-reminders', icon: Bell },
    { name: 'Territory Management', tool: 'territory-management', icon: Globe }
  ];

  // Communication dropdown tools - Enhanced with SDRButtons features
  const communicationTools = [
    { name: 'Video Email', tool: 'video-email', icon: Video },
    { name: 'Text Messages', tool: 'text-messages', icon: MessageSquare },
    { name: 'Email Composer', tool: 'email-composer', icon: Mail },
    { name: 'Campaigns', tool: 'campaigns', icon: Megaphone },
    // Enhanced SDRButtons Communication Features
    { name: 'Group Calls', tool: 'group-calls', icon: Users },
    { name: 'Call Recording', tool: 'call-recording', icon: Mic },
    { name: 'In-Call Messaging', tool: 'in-call-messaging', icon: MessageCircle },
    { name: 'Call Analytics', tool: 'call-analytics', icon: BarChart3 },
    { name: 'Connection Quality Monitor', tool: 'connection-quality', icon: Activity }
  ];

  // Content dropdown tools
  const contentTools = [
    { name: 'Content Library', tool: 'content-library', icon: BookOpen },
    { name: 'Voice Profiles', tool: 'voice-profiles', icon: Mic },
    { name: 'Business Analysis', tool: 'business-analysis', icon: BarChart3 },
    { name: 'Image Generator', tool: 'image-generator', icon: Camera },
    { name: 'Forms', tool: 'forms', icon: FileText },
    { name: 'AI Model Demo', tool: 'ai-model-demo', icon: Brain }
  ];

  // Connected apps
  const connectedApps = [
    { name: 'FunnelCraft AI', url: 'https://funnelcraft-ai.videoremix.io/', icon: Megaphone, isExternal: true },
    { name: 'SmartCRM Closer', url: 'https://smartcrm-closer.videoremix.io', icon: Users, isExternal: true },
    { name: 'ContentAI', url: 'https://content-ai.videoremix.io', icon: FileText, isExternal: true },
    { name: 'Mobile View', url: '/mobile', icon: Camera, isExternal: false },
    { name: 'White-Label Customization', url: '/white-label', icon: Palette, isExternal: false }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking on a dropdown toggle button
      if ((e.target as HTMLElement).closest('[data-dropdown-toggle]')) {
        return;
      }
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Use useCallback to prevent recreation on every render
  const toggleDropdown = useCallback((dropdown: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  }, [activeDropdown]);

  // Optimize navigation handler with useCallback
  const handleNavigation = useCallback((route: string, tabName: string) => {
    navigate(route);
    setActiveTab(tabName);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [navigate]);

  // Optimize AI tool click handler with useCallback
  const handleAIToolClick = useCallback((toolName: string) => {
    if (toolName === 'sales-tools') navigate('/sales-tools');
    else if (toolName === 'lead-automation') navigate('/lead-automation');
    else if (toolName === 'circle-prospecting') navigate('/circle-prospecting');
    else if (toolName === 'appointments') navigate('/appointments');
    else if (toolName === 'phone-system') navigate('/phone-system');
    else if (toolName === 'invoicing') navigate('/invoicing');
    else if (toolName === 'video-email') navigate('/video-email');
    else if (toolName === 'text-messages') navigate('/text-messages');
    else if (toolName === 'content-library') navigate('/content-library');
    else if (toolName === 'voice-profiles') navigate('/voice-profiles');
    else if (toolName === 'business-analysis') navigate('/business-analysis');
    else if (toolName === 'forms') navigate('/forms');
    else if (toolName === 'sales-analytics') navigate('/sales-analytics');
    else if (toolName === 'deal-pipeline') {
      onOpenPipelineModal?.();
      setActiveDropdown(null);
    }
    else if (toolName === 'quote-builder') navigate('/quote-builder');
    else if (toolName === 'commission-tracker') navigate('/commission-tracker');
    else if (toolName === 'follow-up-reminders') navigate('/follow-up-reminders');
    else if (toolName === 'territory-management') navigate('/territory-management');
    else if (toolName === 'task-management') navigate('/tasks');
    else if (toolName === 'task-automation') navigate('/task-automation');
    else if (toolName === 'project-tracker') navigate('/project-tracker');
    else if (toolName === 'time-tracking') navigate('/time-tracking');
    else if (toolName === 'workflow-builder') navigate('/workflow-builder');
    else if (toolName === 'deadline-manager') navigate('/deadline-manager');
    else if (toolName === 'email-composer') navigate('/email-composer');
    else if (toolName === 'campaigns') navigate('/campaigns');
    else if (toolName === 'image-generator') navigate('/image-generator');
    else if (toolName === 'ai-model-demo') navigate('/ai-model-demo');
    // Enhanced SDRButtons Communication Features
    else if (toolName === 'group-calls') navigate('/group-calls');
    else if (toolName === 'call-recording') navigate('/call-recording');
    else if (toolName === 'in-call-messaging') navigate('/in-call-messaging');
    else if (toolName === 'call-analytics') navigate('/call-analytics');
    else if (toolName === 'connection-quality') navigate('/connection-quality');
    else {
      // For other AI tools, open in AI tools page
      openAITool(toolName);
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [navigate, openAITool, onOpenPipelineModal]);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveTab('dashboard');
    else if (path === '/contacts') setActiveTab('contacts');
    else if (path === '/pipeline') setActiveTab('pipeline');
    else if (path === '/tasks') setActiveTab('tasks');
    else if (path === '/ai-tools') setActiveTab('ai-tools');
    else if (path === '/appointments') setActiveTab('appointments');
    else setActiveTab('');
  }, [location.pathname]);

  // Complete AI Tools list - 29+ tools organized by category
  const aiTools = [
    // Core AI Tools (8 tools)
    { name: 'Email Analysis', tool: 'email-analysis', icon: Mail, category: 'Core AI Tools' },
    { name: 'Meeting Summarizer', tool: 'meeting-summarizer', icon: Video, category: 'Core AI Tools' },
    { name: 'Proposal Generator', tool: 'proposal-generator', icon: FileText, category: 'Core AI Tools' },
    { name: 'Call Script Generator', tool: 'call-script', icon: Phone, category: 'Core AI Tools' },
    { name: 'Subject Line Optimizer', tool: 'subject-optimizer', icon: Mail, category: 'Core AI Tools' },
    { name: 'Competitor Analysis', tool: 'competitor-analysis', icon: Shield, category: 'Core AI Tools' },
    { name: 'Market Trends', tool: 'market-trends', icon: TrendingUp, category: 'Core AI Tools' },
    { name: 'Sales Insights', tool: 'sales-insights', icon: BarChart3, category: 'Core AI Tools' },
    { name: 'Sales Forecast', tool: 'sales-forecast', icon: LineChart, category: 'Core AI Tools' },

    // Communication (4 tools)
    { name: 'Email Composer', tool: 'email-composer', icon: Mail, category: 'Communication' },
    { name: 'Objection Handler', tool: 'objection-handler', icon: MessageSquare, category: 'Communication' },
    { name: 'Email Response', tool: 'email-response', icon: Mail, category: 'Communication' },
    { name: 'Voice Tone Optimizer', tool: 'voice-tone', icon: Volume2, category: 'Communication' },

    // Customer & Content (3 tools)
    { name: 'Customer Persona', tool: 'customer-persona', icon: User, category: 'Customer & Content' },
    { name: 'Visual Content Generator', tool: 'visual-content', icon: Image, category: 'Customer & Content' },
    { name: 'Meeting Agenda', tool: 'meeting-agenda', icon: Calendar, category: 'Customer & Content' },

    // Advanced Features (5 tools)
    { name: 'AI Assistant', tool: 'ai-assistant', icon: Bot, category: 'Advanced Features' },
    { name: 'Vision Analyzer', tool: 'vision-analyzer', icon: Eye, category: 'Advanced Features' },
    { name: 'Image Generator', tool: 'image-generator', icon: Camera, category: 'Advanced Features' },
    { name: 'Semantic Search', tool: 'semantic-search', icon: Search, category: 'Advanced Features' },
    { name: 'Function Assistant', tool: 'function-assistant', icon: Code, category: 'Advanced Features' },

    // Real-time Features (6 tools)
    { name: 'Streaming Chat', tool: 'streaming-chat', icon: MessageCircle, category: 'Real-time Features' },
    { name: 'Form Validation', tool: 'form-validation', icon: CheckSquare, category: 'Real-time Features' },
    { name: 'Live Deal Analysis', tool: 'live-deal-analysis', icon: Activity, category: 'Real-time Features' },
    { name: 'Instant Response', tool: 'instant-response', icon: Zap, category: 'Real-time Features' },
    { name: 'Real-time Email Composer', tool: 'realtime-email', icon: Mail, category: 'Real-time Features' },
    { name: 'Voice Analysis Real-time', tool: 'voice-analysis', icon: Mic, category: 'Real-time Features' },

    // Reasoning Generators (5 tools)
    { name: 'Reasoning Email', tool: 'reasoning-email', icon: Brain, category: 'Reasoning Generators' },
    { name: 'Reasoning Proposal', tool: 'reasoning-proposal', icon: FileText, category: 'Reasoning Generators' },
    { name: 'Reasoning Script', tool: 'reasoning-script', icon: Phone, category: 'Reasoning Generators' },
    { name: 'Reasoning Objection', tool: 'reasoning-objection', icon: AlertTriangle, category: 'Reasoning Generators' },
    { name: 'Reasoning Social', tool: 'reasoning-social', icon: Users, category: 'Reasoning Generators' }
  ];

  // Main navigation tabs
  const mainTabs = [
    {
      id: 'dashboard',
      label: '',
      icon: () => null,
      action: () => handleNavigation('/dashboard', 'dashboard'),
      badge: null,
      color: 'from-blue-500 to-green-500'
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users,
      action: () => handleNavigation('/contacts', 'contacts'),
      badge: 1,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
      icon: Briefcase,
      action: () => {
        onOpenPipelineModal?.();
        setActiveTab('pipeline');
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      },
      badge: counters.activeDeals,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      action: () => handleNavigation('/analytics', 'analytics'),
      badge: null,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ai-goals',
      label: 'AI Goals',
      icon: Target,
      action: () => handleNavigation('/ai-goals', 'ai-goals'),
      badge: 58,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai-tools',
      label: 'AI Tools',
      icon: Brain,
      action: () => handleNavigation('/ai-tools', 'ai-tools'),
      badge: aiTools.length,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'appointments',
      label: 'Calendar',
      icon: Calendar,
      action: () => handleNavigation('/appointments', 'appointments'),
      badge: 1,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  // Dropdown menu configurations
  const dropdownMenus = [
    {
      id: 'sales',
      label: 'Sales',
      icon: DollarSign,
      badge: salesTools.length,
      color: 'from-green-500 to-teal-500',
      badgeColor: 'bg-green-500'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: taskTools.length,
      color: 'from-orange-500 to-red-500',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 'communication',
      label: 'Comm',
      icon: MessageSquare,
      badge: communicationTools.length,
      color: 'from-blue-500 to-sky-500',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 'content',
      label: 'Content',
      icon: Edit3,
      badge: contentTools.length,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'apps',
      label: 'Apps',
      icon: Grid3X3,
      badge: connectedApps.length,
      color: 'from-purple-500 to-violet-500',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 'ai-categories',
      label: 'AI',
      icon: Brain,
      badge: 31,
      color: 'from-pink-500 to-rose-500',
      badgeColor: 'bg-pink-500'
    }
  ];

  // Optimize badge rendering with useCallback
  const renderBadge = useCallback((count: number | null, color: string = 'bg-red-500') => {
    if (!count || count === 0) return null;
    
    return (
      <div className={`absolute -top-1 -right-1 ${color} text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse shadow-lg`}>
        {count > 99 ? '99+' : count}
      </div>
    );
  }, []);

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