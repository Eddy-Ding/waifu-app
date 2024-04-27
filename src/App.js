// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatComponent from './ChatComponent';
import CharacterCreationComponent from './CharacterCreationComponent';
import Home from './Home'; 

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/create-character" element={<CharacterCreationComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;