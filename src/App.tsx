import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SearchPage } from '@/components/search-page';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  const [darkMode] = useState(false);
  
  return (
    <ThemeProvider defaultTheme={darkMode ? "dark" : "light"}>
      <div className="min-h-screen bg-background">
        <SearchPage />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;