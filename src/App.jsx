import React, { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Lesson1 from './modules/Lesson1';
import Lesson2 from './modules/Lesson2';
import Lesson3 from './modules/Lesson3';

function App() {
  // Simple state router: 'home' | 'lesson1' | 'lesson2' | 'lesson3'
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'lesson1':
        return <Lesson1 onExit={() => setView('home')} />;
      case 'lesson2':
        return <Lesson2 onExit={() => setView('home')} />;
      case 'lesson3':
        return <Lesson3 onExit={() => setView('home')} />;
      default:
        return <LandingPage onSelectModule={(id) => setView(id)} />;
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {renderView()}
    </div>
  );
}

export default App;
