import React, { createContext, useState, useContext } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
    const [characterImage, setCharacterImage] = useState(null);

    const updateCharacterImage = (imageData) => {
        setCharacterImage(imageData);
    };

    return (
        <CharacterContext.Provider value={{ characterImage, updateCharacterImage }}>
            {children}
        </CharacterContext.Provider>
    );
};