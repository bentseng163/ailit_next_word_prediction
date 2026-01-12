import React, { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';

// Engaging with AI Module
import Lesson1 from './modules/engaging/Lesson1';
import Lesson2 from './modules/engaging/Lesson2';
import Lesson3 from './modules/engaging/Lesson3';
import InsightLesson from './modules/engaging/InsightLesson';

// Creating with AI Module
import CreatingLesson1 from './modules/creating/CreatingLesson1';
import CreatingLesson2 from './modules/creating/CreatingLesson2';
import CreatingLesson3 from './modules/creating/CreatingLesson3';
import CreatingBigIdea from './modules/creating/CreatingBigIdea';


function App() {
  // Simple state router: 'home' | 'lesson1' | 'lesson2' | 'lesson3' | etc.
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'lesson1':
        return <Lesson1 onExit={() => setView('home')} />;
      case 'lesson2':
        return <Lesson2 onExit={() => setView('home')} />;
      case 'lesson3':
        return <Lesson3 onExit={() => setView('home')} />;
      case 'insight':
        return <InsightLesson onExit={() => setView('home')} />;
      // Creating with AI Module
      case 'creating1':
        return <CreatingLesson1 onExit={() => setView('home')} />;
      case 'creating2':
        return <CreatingLesson2 onExit={() => setView('home')} />;
      case 'creating3':
        return <CreatingLesson3 onExit={() => setView('home')} />;
      case 'creating4':
        return <CreatingBigIdea onExit={() => setView('home')} />;
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

