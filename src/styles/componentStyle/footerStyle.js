import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    footer: {
        marginBottom: 0
    },
    button: {
        color: "white",
        textDecoration: "none",
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(700)]: {
            fontSize: '1.25em',
        }
    },
    img: {
        height: 50
    },
    links: {
        color: "inherit",
        textDecoration: "none",

    },
    fb: {
        display: 'block',
        marginLeft: "auto",
        marginRight: "auto"
    }
}))

export default useStyles