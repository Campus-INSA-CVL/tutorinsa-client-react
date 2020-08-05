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

const useStyles = makeStyles({
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
        maxHeight: 475
    },
    root: {
        height: "100%",
        width: "auto"
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    gridGeneral: {
        margin: '1%',
        flex: 0.8,
        width: 'auto'
    },
    questionPanel: {
        borderLeft: ".4rem solid #4e73df !important",
    },
    responsePanel: {
        backgroundColor: "rgba(0,255,0, 0.3)"
    },
    typo: {
        color: "#FFFFFF"
    }
})
export default useStyles