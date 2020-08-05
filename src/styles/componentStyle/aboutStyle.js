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
    root: {
        height: "100%",
        width: "auto"
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    image: {
        maxHeight: 450,
        maxWidth: 450
    },
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
        minWidth: 400
    },
    teamSpec: {
        flex: 0.7,
        padding: "1%",
        width: "100%"
    }
})
export default useStyles