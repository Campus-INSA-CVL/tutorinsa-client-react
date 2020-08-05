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
    responsive: {
        margin: '1%',
    },
    button: {
        marginRight: theme.spacing(2),
        color: 'inherit',
        textDecoration: 'none',
        fontSize: '1.25em',
    },
    title: {
        flexGrow: 1,
    },
    img: {
        height: 50,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#4e73df',
    },
}))

export default useStyles
