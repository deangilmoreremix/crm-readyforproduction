import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers from the Progressive app
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardLayoutProvider } from './contexts/DashboardLayoutContext';
import { AIToolsProvider } from './components/AIToolsProvider';
import { NavigationProvider } from './contexts/NavigationContext';
import { VideoCallProvider } from './contexts/VideoCallContext';

// Keep the Friday Navbar with Research modal
import Navbar from './components/layout/Navbar';

// Use richer views: redesigned Dashboard and full-feature pages
import Dashboard from './components/Dashboard';
import Pipeline from './pages/Pipeline';
import Contacts from './pages/Contacts';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DashboardLayoutProvider>
          <AIToolsProvider>
            <NavigationProvider>
              <VideoCallProvider>
                <div className="min-h-screen h-full w-full flex flex-col">
                  <Navbar />
                  <div className="flex-1 w-full overflow-hidden">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/pipeline" element={<Pipeline />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </div>
                </div>
              </VideoCallProvider>
            </NavigationProvider>
          </AIToolsProvider>
        </DashboardLayoutProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
