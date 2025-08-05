import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AIToolsProvider } from './components/AIToolsProvider';
import { ModalsProvider } from './components/ModalsProvider';
import { EnhancedHelpProvider } from './contexts/EnhancedHelpContext';
import { VideoCallProvider } from './contexts/VideoCallContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { DashboardLayoutProvider } from './contexts/DashboardLayoutContext';
import Navbar from './components/Navbar';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Critical pages - load immediately
import Dashboard from './pages/Dashboard';
import SystemOverview from './pages/SystemOverview';

// Heavy pages - lazy load for better performance
const Tasks = lazy(() => import('./pages/Tasks'));
const TasksNew = lazy(() => import('./pages/TasksNew'));
const Communication = lazy(() => import('./pages/Communication'));
const TasksSimple = lazy(() => import('./pages/TasksSimple'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactsEnhanced = lazy(() => import('./pages/ContactsEnhanced'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const AITools = lazy(() => import('./pages/AITools'));
const Analytics = lazy(() => import('./pages/Analytics'));
const AIIntegration = lazy(() => import('./pages/AIIntegration'));
const MobileResponsiveness = lazy(() => import('./pages/MobileResponsiveness'));
const AIGoals = lazy(() => import('./pages/AIGoals'));
const Appointments = lazy(() => import('./pag\es/Appointments'));
const Settings = lazy(() => import('./pages/Settings'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
  return (
    <ThemeProvider>
      <AIToolsProvider>
        <ModalsProvider>
          <EnhancedHelpProvider>
            <VideoCallProvider>
              <NavigationProvider>
                <DashboardLayoutProvider>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Navbar />
                    <Suspense fallback={<LoadingSpinner message="Loading page..." size="lg" />}>
                      <Routes>
                        {/* Root redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        
                        {/* Main Application Routes */}
                        <Route path="/dashboard" element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/system-overview" element={
                          <ProtectedRoute>
                            <SystemOverview />
                          </ProtectedRoute>
                        } />
                                                
                        {/* Contact Management */}
                        <Route path="/contacts" element={
                          <ProtectedRoute>
                            <ContactsEnhanced />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/contacts-enhanced" element={
                          <ProtectedRoute>
                            <ContactsEnhanced />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/contacts-original" element={
                          <ProtectedRoute>
                            <Contacts />
                          </ProtectedRoute>
                        } />
                        
                        {/* Task Management */}
                        <Route path="/tasks" element={
                          <ProtectedRoute>
                            <TasksNew />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/tasks-simple" element={
                          <ProtectedRoute>
                            <TasksSimple />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/tasks-original" element={
                          <ProtectedRoute>
                            <Tasks />
                          </ProtectedRoute>
                        } />
                        
                        {/* Sales Pipeline */}
                        <Route path="/pipeline" element={
                          <ProtectedRoute>
                            <Pipeline />
                          </ProtectedRoute>
                        } />
                        
                        {/* Communication */}
                        <Route path="/communication" element={
                          <ProtectedRoute>
                            <Communication />
                          </ProtectedRoute>
                        } />
                        
                        {/* Analytics & Reporting */}
                        <Route path="/analytics" element={
                          <ProtectedRoute>
                            <Analytics />
                          </ProtectedRoute>
                        } />
                        
                        {/* AI Features */}
                        <Route path="/ai-tools" element={
                          <ProtectedRoute>
                            <AITools />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/ai-integration" element={
                          <ProtectedRoute>
                            <AIIntegration />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/ai-goals" element={
                          <ProtectedRoute>
                            <AIGoals />
                          </ProtectedRoute>
                        } />
                        
                        {/* Calendar &  Appointments */}
                        <Route path="/appointments" element={
                          <ProtectedRoute>
                            <Appointments />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/calendar" element={
                          <ProtectedRoute>
                            <Appointments />
                          </ProtectedRoute>
                        } />
                        
                        {/* Settings & Configuration */}
                        <Route path="/settings" element={
                          <ProtectedRoute>
                            <Settings />
                          </ProtectedRoute>
                        } />
                        
                        {/* Mobile Features */}
                        <Route path="/mobile" element={
                          <ProtectedRoute>
                            <MobileResponsiveness />
                          </ProtectedRoute>
                        } />
                        
                        {/* Sales Tools */}
                        <Route path="/sales-tools" element={
                          <ProtectedRoute>
                            <PlaceholderPage title="Sales Tools" description="Comprehensive sales tools and automation" />
                          </ProtectedRoute>
                        } />
                        
                        {/* Feature Demo Pages */}
                        <Route path="/features/ai-tools" element={
                          <ProtectedRoute>
                            <PlaceholderPage title="AI Tools Features" description="Explore AI-powered productivity tools" />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/features/contacts" element={
                          <ProtectedRoute>
                            <PlaceholderPage title="Contact Management Features" description="Advanced contact management capabilities" />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/features/pipeline" element={
                          <ProtectedRoute>
                            <PlaceholderPage title="Pipeline Features" description="Advanced pipeline management capabilities" />
                          </ProtectedRoute>
                        } />
                        
                        {/* Sales Tools Routes */}
                        <Route path="/lead-automation" element={<ProtectedRoute><PlaceholderPage title="Lead Automation" description="Automate lead generation and nurturing processes." /></ProtectedRoute>} />
                        <Route path="/circle-prospecting" element={<ProtectedRoute><PlaceholderPage title="Circle Prospecting" description="Identify and target prospects in your network." /></ProtectedRoute>} />
                        <Route path="/phone-system" element={<ProtectedRoute><PlaceholderPage title="Phone System" description="Integrated phone system for sales calls." /></ProtectedRoute>} />
                        <Route path="/invoicing" element={<ProtectedRoute><PlaceholderPage title="Invoicing" description="Create and manage invoices for your sales." /></ProtectedRoute>} />
                        <Route path="/sales-analytics" element={<ProtectedRoute><PlaceholderPage title="Sales Analytics" description="Analyze sales performance and trends." /></ProtectedRoute>} />
                        <Route path="/quote-builder" element={<ProtectedRoute><PlaceholderPage title="Quote Builder" description="Build professional quotes quickly and easily." /></ProtectedRoute>} />
                        <Route path="/commission-tracker" element={<ProtectedRoute><PlaceholderPage title="Commission Tracker" description="Track and manage sales commissions." /></ProtectedRoute>} />
                        <Route path="/follow-up-reminders" element={<ProtectedRoute><PlaceholderPage title="Follow-up Reminders" description="Never miss a follow-up with automated reminders." /></ProtectedRoute>} />
                        <Route path="/territory-management" element={<ProtectedRoute><PlaceholderPage title="Territory Management" description="Manage and optimize sales territories." /></ProtectedRoute>} />
                        
                        {/* Task Tools Routes */}
                        <Route path="/task-automation" element={<ProtectedRoute><PlaceholderPage title="Task Automation" description="Automate repetitive tasks and workflows." /></ProtectedRoute>} />
                        <Route path="/project-tracker" element={<ProtectedRoute><PlaceholderPage title="Project Tracker" description="Manage projects and track progress." /></ProtectedRoute>} />
                        <Route path="/time-tracking" element={<ProtectedRoute><PlaceholderPage title="Time Tracking" description="Log and analyze time spent on tasks and projects." /></ProtectedRoute>} />
                        <Route path="/workflow-builder" element={<ProtectedRoute><PlaceholderPage title="Workflow Builder" description="Visually design and automate business processes." /></ProtectedRoute>} />
                        <Route path="/deadline-manager" element={<ProtectedRoute><PlaceholderPage title="Deadline Manager" description="Monitor and manage project deadlines effectively." /></ProtectedRoute>} />
                        
                        {/* Communication Tools */}
                        <Route path="/video-email" element={<ProtectedRoute><PlaceholderPage title="Video Email" description="Send personalized video messages via email." /></ProtectedRoute>} />
                        <Route path="/text-messages" element={<ProtectedRoute><PlaceholderPage title="Text Messages" description="Send and receive SMS messages directly from the CRM." /></ProtectedRoute>} />
                        <Route path="/email-composer" element={<ProtectedRoute><PlaceholderPage title="Email Composer" description="Compose and send emails with advanced features." /></ProtectedRoute>} />
                        <Route path="/campaigns" element={<ProtectedRoute><PlaceholderPage title="Campaigns" description="Manage and track marketing campaigns." /></ProtectedRoute>} />
                        <Route path="/group-calls" element={<ProtectedRoute><PlaceholderPage title="Group Calls" description="Conduct multi-party video and audio calls." /></ProtectedRoute>} />
                        <Route path="/call-recording" element={<ProtectedRoute><PlaceholderPage title="Call Recording" description="Record and manage call recordings." /></ProtectedRoute>} />
                        <Route path="/in-call-messaging" element={<ProtectedRoute><PlaceholderPage title="In-Call Messaging" description="Chat with participants during calls." /></ProtectedRoute>} />
                        <Route path="/call-analytics" element={<ProtectedRoute><PlaceholderPage title="Call Analytics" description="Analyze call performance and trends." /></ProtectedRoute>} />
                        <Route path="/connection-quality" element={<ProtectedRoute><PlaceholderPage title="Connection Quality Monitor" description="Monitor real-time connection quality during calls." /></ProtectedRoute>} />
                        
                        {/* Content Tools */}
                        <Route path="/content-library" element={<ProtectedRoute><PlaceholderPage title="Content Library" description="Manage and organize all your sales and marketing content." /></ProtectedRoute>} />
                        <Route path="/voice-profiles" element={<ProtectedRoute><PlaceholderPage title="Voice Profiles" description="Create and manage AI voice profiles for personalized communication." /></ProtectedRoute>} />
                        <Route path="/business-analysis" element={<ProtectedRoute><PlaceholderPage title="Business Analysis" description="AI-powered analysis of business data and trends." /></ProtectedRoute>} />
                        <Route path="/image-generator" element={<ProtectedRoute><PlaceholderPage title="Image Generator" description="Generate custom images for marketing and sales materials." /></ProtectedRoute>} />
                        <Route path="/forms" element={<ProtectedRoute><PlaceholderPage title="Forms" description="Create and manage custom forms for lead capture and data collection." /></ProtectedRoute>} />
                        <Route path="/ai-model-demo" element={<ProtectedRoute><PlaceholderPage title="AI Model Demo" description="Experiment with different AI models and their capabilities." /></ProtectedRoute>} />
                        
                        {/* White-Label Customization */}
                        <Route path="/white-label" element={<ProtectedRoute><PlaceholderPage title="White-Label Customization" description="Customize the CRM with your brand's look and feel." /></ProtectedRoute>} />
                        
                        {/* Specific AI Tool Routes (from Navbar's AI Categories dropdown) */}
                        <Route path="/email-analysis" element={<ProtectedRoute><PlaceholderPage title="Email Analysis" description="Analyze email content for sentiment, intent, and key points." /></ProtectedRoute>} />
                        <Route path="/meeting-summarizer" element={<ProtectedRoute><PlaceholderPage title="Meeting Summarizer" description="Automatically summarize meeting notes and action items." /></ProtectedRoute>} />
                        <Route path="/proposal-generator" element={<ProtectedRoute><PlaceholderPage title="Proposal Generator" description="Create compelling business proposals automatically." /></ProtectedRoute>} />
                        <Route path="/call-script" element={<ProtectedRoute><PlaceholderPage title="Call Script Generator" description="Generate effective call scripts for different scenarios." /></ProtectedRoute>} />
                        <Route path="/subject-optimizer" element={<ProtectedRoute><PlaceholderPage title="Subject Line Optimizer" description="Optimize email subject lines for better open rates." /></ProtectedRoute>} />
                        <Route path="/competitor-analysis" element={<ProtectedRoute><PlaceholderPage title="Competitor Analysis" description="Analyze competitors and market positioning." /></ProtectedRoute>} />
                        <Route path="/market-trends" element={<ProtectedRoute><PlaceholderPage title="Market Trends Analysis" description="AI-powered market trend analysis and forecasting." /></ProtectedRoute>} />
                        <Route path="/sales-insights" element={<ProtectedRoute><PlaceholderPage title="Sales Insights" description="AI-driven insights into sales performance and opportunities." /></ProtectedRoute>} />
                        <Route path="/sales-forecast" element={<ProtectedRoute><PlaceholderPage title="Sales Forecast" description="AI-driven sales forecasting based on pipeline data." /></ProtectedRoute>} />
                        <Route path="/objection-handler" element={<ProtectedRoute><PlaceholderPage title="Objection Handler" description="Generate responses to common sales objections." /></ProtectedRoute>} />
                        <Route path="/email-response" element={<ProtectedRoute><PlaceholderPage title="Email Response" description="Generate quick and relevant email responses." /></ProtectedRoute>} />
                        <Route path="/voice-tone" element={<ProtectedRoute><PlaceholderPage title="Voice Tone Optimizer" description="Analyze and optimize the tone of your voice communications." /></ProtectedRoute>} />
                        <Route path="/customer-persona" element={<ProtectedRoute><PlaceholderPage title="Customer Persona" description="Create detailed customer personas based on data." /></ProtectedRoute>} />
                        <Route path="/visual-content" element={<ProtectedRoute><PlaceholderPage title="Visual Content Generator" description="Generate visual content for marketing materials." /></ProtectedRoute>} />
                        <Route path="/meeting-agenda" element={<ProtectedRoute><PlaceholderPage title="Meeting Agenda" description="Generate structured meeting agendas automatically." /></ProtectedRoute>} />
                        <Route path="/ai-assistant" element={<ProtectedRoute><PlaceholderPage title="AI Assistant" description="Your personal AI assistant for various CRM tasks." /></ProtectedRoute>} />
                        <Route path="/vision-analyzer" element={<ProtectedRoute><PlaceholderPage title="Vision Analyzer" description="Analyze images and extract relevant information." /></ProtectedRoute>} />
                        <Route path="/semantic-search" element={<ProtectedRoute><PlaceholderPage title="Semantic Search" description="Perform intelligent searches based on meaning, not just keywords." /></ProtectedRoute>} />
                        <Route path="/function-assistant" element={<ProtectedRoute><PlaceholderPage title="Function Assistant" description="AI assistant for generating and explaining code functions." /></ProtectedRoute>} />
                        <Route path="/streaming-chat" element={<ProtectedRoute><PlaceholderPage title="Streaming Chat" description="Real-time AI chat for quick queries and responses." /></ProtectedRoute>} />
                        <Route path="/form-validation" element={<ProtectedRoute><PlaceholderPage title="Form Validation" description="AI-powered validation for forms and data entry." /></ProtectedRoute>} />
                        <Route path="/live-deal-analysis" element={<ProtectedRoute><PlaceholderPage title="Live Deal Analysis" description="Real-time analysis of deal progress and potential risks." /></ProtectedRoute>} />
                        <Route path="/instant-response" element={<ProtectedRoute><PlaceholderPage title="Instant Response" description="Generate instant responses for customer inquiries." /></ProtectedRoute>} />
                        <Route path="/realtime-email" element={<ProtectedRoute><PlaceholderPage title="Real-time Email Composer" description="Compose emails with real-time AI suggestions." /></ProtectedRoute>} />
                        <Route path="/voice-analysis" element={<ProtectedRoute><PlaceholderPage title="Voice Analysis Real-time" description="Analyze voice communications for sentiment and key insights." /></ProtectedRoute>} />
                        <Route path="/reasoning-email" element={<ProtectedRoute><PlaceholderPage title="Reasoning Email" description="Generate emails with clear, logical reasoning." /></ProtectedRoute>} />
                        <Route path="/reasoning-proposal" element={<ProtectedRoute><PlaceholderPage title="Reasoning Proposal" description="Create proposals with AI-generated logical arguments." /></ProtectedRoute>} />
                        <Route path="/reasoning-script" element={<ProtectedRoute><PlaceholderPage title="Reasoning Script" description="Generate scripts with logical flow for various scenarios." /></ProtectedRoute>} />
                        <Route path="/reasoning-objection" element={<ProtectedRoute><PlaceholderPage title="Reasoning Objection" description="AI-powered responses to common objections with logical reasoning." /></ProtectedRoute>} />
                        <Route path="/reasoning-social" element={<ProtectedRoute><PlaceholderPage title="Reasoning Social" description="Generate social media content with persuasive arguments." /></ProtectedRoute>} />
                        
                        {/* Catch-all route */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Suspense>
                  </div>
                </DashboardLayoutProvider>
              </NavigationProvider>
            </VideoCallProvider>
          </EnhancedHelpProvider>
        </ModalsProvider>
      </AIToolsProvider>
    </ThemeProvider>
  );
}

export default App;