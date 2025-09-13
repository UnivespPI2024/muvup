import { createContext, useState } from 'react';

export const Context = createContext();

export const MyProvider = ({ children }) => {
    //criado e não usado
    const [fontStylesViews, setFontStylesViews] = useState();

    return (
        <Context.Provider value={{ 
            fontStylesViews, setFontStylesViews
            }}>
            {children}
        </Context.Provider>
    );
};