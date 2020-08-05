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
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
    },
    root: {
        height: '100%',
        padding: '1%',
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    commentaryBox: {
        //padding:"2%",
        flex: 0.6,
    },
    infoGrid: {
        //padding:"2%",
        flex: 0.4,
    },
    icon: {
        fontSize: '1.5rem',
    },
    detailGrid: {
        padding: '5%',
        minHeight: 500,
        minWidth: 450,
        fontSize: '1.5rem',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#4e73df',
    },
}))
export default useStyles
