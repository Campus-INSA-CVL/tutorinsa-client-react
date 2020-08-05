import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    postDisplay: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    gridList: {
        margin:"1%",
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width:"80%"
    },
    card: {
        padding: '1%',
        boxShadow: '10px 5px 5px black',
    },
    root: {
        height: '100%',
        width: 'auto',
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    typo: {
        alignContent: 'center',
    },
    gridText: {
        color: '#FFFFFF',
        flex: 0.8,
    },
})

export default useStyles