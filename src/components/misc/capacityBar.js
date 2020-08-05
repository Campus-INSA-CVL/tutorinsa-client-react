import { withStyles } from '@material-ui/core/styles'
import {LinearProgress} from '@material-ui/core'

export const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
        width: '50%',
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor:
            'linear-gradient(90deg, rgba(0,212,255,1) 3%, rgba(9,9,121,1) 57%, rgba(2,0,36,1) 97%)',
    },
}))(LinearProgress)