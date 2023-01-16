import { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ThemeContext = createContext();

export const ThemeProvider=({children})=>{
    const totalAmount = useSelector((state) => state.commerce.total);
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
    const theSetter={
        backgroundColor: theme? "white": "#070214",
        color: theme ? "black": "white"
    }

    const changeTheme =()=>{
        setTheme(!theme);
    }
    useEffect(()=>{
        localStorage.setItem("theme", theme)
    }, [theme])
        return (
            <ThemeContext.Provider value={{theme, theSetter, changeTheme, totalAmount}}>
                {children}
            </ThemeContext.Provider>
        )
}

// export const ContextTheme =()=> useContext(ThemeContext)