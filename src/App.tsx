import React, { useState } from 'react';
import Login from './Login';
import MainContent from './components/MainContent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App w-full h-screen bg-slate-50">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MainContent />
      )}
    </div>
  );
}

export default App;