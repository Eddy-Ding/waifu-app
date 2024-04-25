import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatComponent.css';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSettingsClick = () => {
    console.log('Settings button clicked');
    // Implement your settings functionality here
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleSettingsClick();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleHeadphoneClick = () => {
    console.log('Headphone button clicked');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };

    setMessages([...messages, newUserMessage]);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        }
      );
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: response.data.choices[0].message.content }]);
    } catch (error) {
      console.error("Send message error")
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="picture-area">
      <img src="https://via.placeholder.com/600" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="chat-area">
        <div className="settings-container">
          <button onClick={handleSettingsClick} className="settings-button">
            <i className="fas fa-cog"></i>
          </button>
        </div>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
            {message.content}
          </div>
        ))}
        <form className="message-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
          <button type="submit"><i className="fas fa-arrow-right"></i></button>
          <button type="button" onClick={handleHeadphoneClick} title="Listen">
            <i className="fas fa-headphones"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;