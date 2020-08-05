import { makeStyles } from '@material-ui/core'

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

const useStyles = makeStyles((theme) => ({
    postDisplay: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    gridList: {
        margin: '1%',
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: '80%',
        minHeight: '310px'
    },
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
    },
    root: {
        height: '100%',
        width: 'auto',
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    typo: {
        alignContent: 'center',
    },
    gridText: {
        color: '#FFFFFF',
        flex: 0.8,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#4e73df',
    },
    button: {
        marginRight: theme.spacing(2),
        color: 'inherit',
        textDecoration: 'none',
        fontSize: '1.25em',
    },
}))

export default useStyles
