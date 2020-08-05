import React from 'react'
import logoTutorinsa from '../../images/logo_tutorat.png'
import '../../styles/css/loaderStyle.css'
import { Grid, Backdrop } from '@material-ui/core'

const TutoLoader = (props) => {
    return <Grid container direction="column" alignItems="center" justify="center">
        <img
            style={props.color && { backgroundColor: props.color }}
            alt="Tutor'INSA Loader !"
            src={logoTutorinsa}
            className="rotate"
        />
    </Grid>
}

export default TutoLoader
