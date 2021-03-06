import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Check from '@material-ui/icons/Check'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import EventIcon from '@material-ui/icons/Event'
import RoomIcon from '@material-ui/icons/Room'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import StepConnector from '@material-ui/core/StepConnector'
import MessageIcon from '@material-ui/icons/Message'

export const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector)

export const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
    },
})

export function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles()
    const { active, completed } = props
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    const icons = {
        1: <LocationCityIcon fontSize={isMobile ? 'small' : 'medium'} />,
        2: <EventIcon fontSize={isMobile ? 'small' : 'medium'} />,
        3: <RoomIcon fontSize={isMobile ? 'small' : 'medium'} />,
        4: <TimelapseIcon fontSize={isMobile ? 'small' : 'medium'} />,
        5: <MessageIcon fontSize={isMobile ? 'small' : 'medium'} />,
    }

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    )
}
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

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1%',
        background: 'rgba(255,255,255,0.1)',
        border: 'solid 1px black',
        borderRadius: '2%',
    },
    dialog: {
        backdropFilter: 'blur(10px)',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        padding: '5%',
        background: 'inherit',
    },
}))
