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
        maxHeight: '80vh',
    },
    title: {
        fontSize: '1.25em',
    },
    postList: {
        flex: 0.7,
        height: 'fit-content',
        margin: 'auto',
    },
    sortBar: {
        maxHeight: '7.5vh',
        border: 'solid white 2px',
        padding: '1%',
    },
    timelinePostList: {
        maxHeight: '70vh',
        width: 'inherit',
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
    },
    gridPostList: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '95%',
        padding: '1%',
    },
    root: {
        height: '100%',
    },
    gridGeneral: {
        flex: 1,
        width: 'auto',
        height: 'inherit',
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    chip: {
        margin: 2,
    },
    itemSpace: {
        margin: '2%',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#4e73df',
    },
    sortPannel: {
        flex: 0.25,
        margin: 'auto',
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    },
    dialogTransparency: {
        margin: '1%',
        background: 'rgba(255,255,255,0.1)',
        border: 'solid 1px black',
        borderRadius: '2%',
    },
    dialog: {
        backdropFilter: 'blur(10px)',
    },

}))
export default useStyles
