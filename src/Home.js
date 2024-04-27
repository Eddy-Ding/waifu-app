// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={() => navigate('/chat')}>Chat</button>
      <button onClick={() => navigate('/create-character')}>Create Character</button>
    </div>
  );
};

export default Home;