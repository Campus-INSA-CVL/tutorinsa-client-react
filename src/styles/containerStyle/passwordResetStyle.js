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
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },
    links: {
        color: 'inherit',
        textDecoration: 'none',
    },
    img: {
        height: '15vh',
        [theme.breakpoints.up(570)]: {
            height: 'auto',
        },
    },
    paper: {
        //marginTop: theme.spacing(8),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '3rem',
        height: 373,
        [theme.breakpoints.up(570)]: {
            width: 534,
        },
        boxSizing: 'border-box',
        boxShadow: '0 1rem 3rem rgba(0,0,0,.175)',
        borderRadius: '0.35rem',
        //overflow: "scroll"
    },
    formControl: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
}))

export default useStyles
