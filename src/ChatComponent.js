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
      <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-AbNS1ZZMigCuXxTrDk5lbQuQ/user-4r6o9vFHa9aHuEpPOemBfRid/img-EK28SfZDJjMnTy6are0m1CAN.png?st=2024-04-24T23%3A20%3A19Z&se=2024-04-25T01%3A20%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-24T19%3A18%3A57Z&ske=2024-04-25T19%3A18%3A57Z&sks=b&skv=2021-08-06&sig=/mqJmK2USlRqJ1AQQLDmKg939tDb8VjwzqOsOHc2FQA%3D" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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