import React from 'react'
import logoTutorinsa from '../../images/logo_tutorat.png'
import '../../styles/css/loaderStyle.css'
import { Grid, useMediaQuery } from '@material-ui/core'

const TutoLoader = (props) => {
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <img
                style={isMobile ? { minHeight: 150, minWidth: 150 } : {}}
                alt="Tutor'INSA Loader !"
                src={logoTutorinsa}
                className="rotate"
            />
        </Grid>
    )
}

export default TutoLoader
