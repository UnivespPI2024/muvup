import React, { createContext, useState } from 'react';

export const Context = createContext();

export const MyProvider = ({ children }) => {
    const [fontStylesViews, setFontStylesViews] = useState();

    return (
        <Context.Provider value={{ 
            fontStylesViews, setFontStylesViews
            }}>
            {children}
        </Context.Provider>
    );
};