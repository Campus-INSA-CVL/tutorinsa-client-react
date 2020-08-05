export const themeReducer = (state, action) => {
    switch (action.type) {
        case 'LIGHT_THEME':
            return {
                ...state,
                background: 'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
                color: 'primary',
                backgroundButton: '',
                cardBackground: 'white',
                textCardColor:'black',
                greenTitleCard: 'rgb(70, 229, 172) !important',
                purpleTitleCard: 'rgb(192, 85, 216) !important',
                purpleBorderLeft: '.4rem solid #9d2ab7 !important',
                greenBorderLeft: '.4rem solid #1cc88a !important',
                expansionPanelBackground: '',
                borderPost: 'white solid 2px',
                navbarColor: '#3f51b5'
            }
        case 'DARK_THEME':
            return {
                ...state,
                background: 'linear-gradient(#1b3a95 10%, #1b3b98 100%)',
                buttonColor: 'rgb(232, 230, 227)',
                backgroundButton: 'rgb(50, 65, 145)',
                cardBackground: 'rgb(24, 26, 27)',
                textCardColor:'white',
                greenTitleCard: 'rgb(70, 229, 172) !important',
                purpleTitleCard: 'rgb(192, 85, 216) !important',
                purpleBorderLeft: '.4rem solid #9d2ab7 !important',
                greenBorderLeft: '.4rem solid #1cc88a !important',
                expansionPanelBackground: 'rgb(24, 26, 27)',
                borderPost: 'black solid 2px',
                navbarColor: 'rgb(50, 65, 145)'
            }
        default:
            return state
    }
}
