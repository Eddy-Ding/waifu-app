import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCharacter } from './CharacterContext';

const CharacterDisplayComponent = () => {
    const { characterImage } = useCharacter();
    const navigate = useNavigate();
    
    const handleStartChatting = () => {
        navigate('/chat');
    };
    
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {characterImage ? (
                <img src={`data:image/jpeg;base64,${characterImage}`} alt="Created Character" style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
            ) : (
                <p>No character created yet.</p>
            )}
            <button style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', maxWidth: '200px' }} onClick={handleStartChatting}>Start Chatting</button>
        </div>
    );
};

export default CharacterDisplayComponent;