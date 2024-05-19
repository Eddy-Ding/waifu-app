import React, { createContext, useState, useContext, useEffect } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [characterImage, setCharacterImage] = useState(() => {
        const savedImage = localStorage.getItem('characterImage');
        return savedImage ? JSON.parse(savedImage) : null;
    });

    const [characterDescription, setCharacterDescription] = useState(() => {
        const savedDescription = localStorage.getItem('characterDescription');
        return savedDescription || '';
    });

    useEffect(() => {
        localStorage.setItem('characterImage', JSON.stringify(characterImage));
    }, [characterImage]);

    useEffect(() => {
        localStorage.setItem('characterDescription', characterDescription);
    }, [characterDescription]);

    const updateCharacterImage = (imageData) => {
        setCharacterImage(imageData);
    };

    const updateCharacterDescription = (description) => {
        setCharacterDescription(description);
    };

    return (
        <CharacterContext.Provider value={{
            characterImage, updateCharacterImage,
            characterDescription, updateCharacterDescription
        }}>
            {children}
        </CharacterContext.Provider>
    );
};