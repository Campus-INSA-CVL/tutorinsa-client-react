import React, { createContext, useReducer } from 'react'
import { themeReducer } from '../../reducers/themeReducer'

export const ThemeContext = createContext()

const ThemeProvider = (props) => {
    const [themePreference, dispatchThemeInfo] = useReducer(themeReducer, {
        background: 'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
        color: 'primary',
        backgroundButton: '',
        cardBackground: 'white',
        textCardColor: 'black',
        greenTitleCard: 'rgb(70, 229, 172) !important',
        purpleTitleCard: 'rgb(192, 85, 216) !important',
        purpleBorderLeft: '.4rem solid #9d2ab7 !important',
        greenBorderLeft: '.4rem solid #1cc88a !important',
        expansionPanelBackground: '',
        borderPost: 'white solid 2px',
        navbarColor: '#3f51b5',
    })

    return (
        <ThemeContext.Provider value={{ themePreference, dispatchThemeInfo }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
