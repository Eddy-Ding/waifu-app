import React from 'react';
import { useCharacter } from './CharacterContext';

const CharacterDisplayComponent = () => {
    const { characterImage } = useCharacter();
    
    return (
        <div>
            {characterImage ? (
                <img src={`data:image/jpeg;base64,${characterImage}`} alt="Created Character" style={{ maxWidth: '100%' }} />
            ) : (
                <p>No character created yet.</p>
            )}
        </div>
    );
};

export default CharacterDisplayComponent;