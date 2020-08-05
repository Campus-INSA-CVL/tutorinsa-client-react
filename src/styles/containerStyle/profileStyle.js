import {makeStyles} from '@material-ui/core'

export const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: process.env.REACT_APP_ANIM_DURATION,
            duration: process.env.REACT_APP_ANIM_DURATION,
            ease: 'easeInOut',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            delay: process.env.REACT_APP_ANIM_DURATION,
            duration: process.env.REACT_APP_ANIM_DURATION,
            ease: 'easeInOut',
        },
    },
}

const useStyles = makeStyles(darkTheme => ({
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
        border: '2px ridge black',
        width:"100%"
    },
    gridGeneral: {
        flex: 1,
        padding: "1%",
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: 'auto',
        height: "100%"
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    typo: {
        alignContent: "center"
    },
    backdrop: {
        zIndex: darkTheme.zIndex.drawer + 1,
        color: '#4e73df',
      }
}))
export default useStyles