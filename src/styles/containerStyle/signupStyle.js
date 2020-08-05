import React from 'react'
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

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        overflow: 'auto',
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            overflow: 'visible'
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
            overflow: 'visible'
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up(570)]: {
            flexDirection: 'row',

        }
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: "100%"
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    homeButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    formControl: {
        padding: '1rem'
    },
    dialogCard: {
        overflowX: "auto"
    },
    img: {
        height: '15vh',
        [theme.breakpoints.up(570)]: {
            height: 'auto'
        }
    }
}))

export default useStyles