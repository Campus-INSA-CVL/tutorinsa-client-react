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
    paper: {
        //marginTop: theme.spacing(8),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.up(570)]: {
            width: 534
        },
        boxSizing: 'border-box',
        boxShadow: '0 1rem 3rem rgba(0,0,0,.175)',
        borderRadius: '0.35rem'
            //overflow: "scroll"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        borderRadius: '10rem',
        border: '1px solid #ced4da',
        fontSize: '0.8rem',
        width: '100%',
        padding: ' 1rem',
        marginBottom: '1rem',
        textAlign: 'center',
        backgroundColor: '#4e73df'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: "100%"
    },
    center: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    links: {
        color: 'inherit',
        textDecoration: 'none'
    },
    img: {
        height: '15vh',
        [theme.breakpoints.up(570)]: {
            height: 'auto'
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#4e73df',
      }
}))

export default useStyles