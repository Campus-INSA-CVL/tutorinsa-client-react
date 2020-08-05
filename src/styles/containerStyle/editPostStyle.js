import { makeStyles, withStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        padding: '5%',
    },
    root: {
        margin: '1%',
        background: 'rgba(255,255,255,0.1)',
        border:'solid 1px black',
        borderRadius:'2%'
    },
    dialog: {
        backdropFilter: 'blur(10px)',
    },
}))
