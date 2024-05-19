import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatComponent.css';
import { useCharacter } from './CharacterContext'; 

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const { characterImage, characterDescription } = useCharacter();

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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                        { role: 'system', content: "you are my loving significant other and" + characterDescription },
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
                {characterImage ? (
                    <img src={`data:image/jpeg;base64,${characterImage}`} alt="Character" style={{ maxHeight: '100%' }} />
                ) : (
                    <p>A created character will be displayed here</p>
                )}
            </div>
            <div className="chat-area">
                <div className="message-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
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