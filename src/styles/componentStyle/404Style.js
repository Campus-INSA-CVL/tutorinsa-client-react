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
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
        minWidth: 400
    },
    image: {
        width: 450
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    typo: {
        color: "#ffffff"
    }
})


export default useStyles