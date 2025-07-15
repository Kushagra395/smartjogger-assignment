import { useState } from 'react';
import NetworkStatus from './components/NetworkStatus';
import LocationTracker from './components/LocationTracker';
import StatsGraph from './components/StatsGraph';
import HydrationTip from './components/HydrationTip';
import LiveMap from './components/LiveMap';
import React from 'react';

function App() {
  const [speed, setSpeed] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-6 font-sans">
      <div className="max-w-xl mx-auto">
         
   <header className="text-center mb-8">
  
  <div className="mb-2">
    <span className="inline-block text-4xl slide-in-emoji">🏃‍♂️</span>
  </div>

   
  <h1 className="text-3xl font-bold text-teal-400 fade-in-delay">
    Smart Jogger
  </h1>

   
  <p className="text-sm text-gray-400 mt-1 fade-in-sub">
    Your intelligent outdoor workout companion
  </p>
</header>


         
        <NetworkStatus />
        <LocationTracker setSpeed={setSpeed} />
        <LiveMap />
        <StatsGraph actualSpeed={speed} />
        <HydrationTip />

        
        <footer className="text-center text-gray-500 text-xs mt-10">
          &copy; {new Date().getFullYear()} Smart Jogger. All rights reserved.
          <br/>
          <br/>
          made with ❤️ by <a className='text-blue-400' href="https://kushagra-portfolio-eta.vercel.app/">Kushagra Malviya</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
