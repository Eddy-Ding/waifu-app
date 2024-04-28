// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './CharacterContext';
import ChatComponent from './ChatComponent';
import CharacterCreationComponent from './CharacterCreationComponent';
import CharacterDisplayComponent from './CharacterDisplayComponent';
import Home from './Home'; 

const App = () => {
  return (
    <Router>
      <CharacterProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/create-character" element={<CharacterCreationComponent />} />
            <Route path="/character-display" element={<CharacterDisplayComponent />} />
          </Routes>
        </div>
      </CharacterProvider>
    </Router>
  );
};

export default App;