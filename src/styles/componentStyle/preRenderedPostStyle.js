import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    title: {
        fontSize: '1.25em'
    },
    navlink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    studentStyle: {
        borderLeft: ".4rem solid #1cc88a !important",
        padding: '1%',
        boxShadow: '10px 5px 5px black'
    },
    tutorStyle: {
        borderLeft: ".4rem solid #9d2ab7 !important",
        padding: '1%',
        boxShadow: '10px 5px 5px black'
    }

})
export default useStyles