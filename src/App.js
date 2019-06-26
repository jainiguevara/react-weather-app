import React from 'react';

import './App.css';
import WeatherApp from './components/WeatherApp';
import { WeatherProvider } from './contexts/WeatherContext';

function App() {
  return (
    <div className="container">
      <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
    </div>
  );
}

export default App;
