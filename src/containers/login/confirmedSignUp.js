import React, { useCallback, useEffect, Fragment } from 'react'
import { Typography, Button, Grid, Backdrop } from '@material-ui/core'
import { useQuery } from 'react-query'
import useStyles from '../../styles/containerStyle/homeStyle'
import TutoLoader from '../../components/misc/loader'
import { NavLink } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School'
import client from '../../vendors/feather'

const ConfirmedSignedUp = (props) => {
    const user_token = new URLSearchParams(
        document.location.search.substring(1)
    ).get('token')
    const classes = useStyles()

    const verifySignUp = useCallback(async (key, token) => {
        console.log('called')
        const res = await client.service('authManagement').create({
            action: 'verifySignupLong',
            value: token,
        }).catch(err => console.log(err))
        console.log('res :',res)
        return res 
    }, [])

    const { data, isSuccess, isLoading, status } = useQuery(
        ['verifySignUp', user_token],
        verifySignUp
    )

    console.log('status :', status)

    return (
        <Fragment>
            {!isLoading ? (
                isSuccess ? (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className={classes.root}
                    >
                        <Grid item>
                            <Typography variant="h2" color='primary'>
                                Bonjour {data.firstName}{' '}
                                {data.lastName.toUpperCase()}
                                <br />
                                Votre inscription à Tutor'INSA a bien été
                                confirmée, votre compte a bien été crée !
                            </Typography>
                        </Grid>

                        <Grid item>
                            <NavLink className={classes.button} to="/">
                                <Button
                                    startIcon={<SchoolIcon />}
                                    color="primary"
                                    variant="outlined"
                                    size="large"
                                >
                                    Commencer à utiliser la plateforme !
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justify="center" className={classes.root}>
                        <Typography variant="h1">
                            Il semblerait qu'il y ait un problème avec l'API,
                            veuillez recliquer sur le lien envoyé dans le mail
                            de confirmation d'inscription !
                        </Typography>
                    </Grid>
                )
            ) : (
                <Grid
                    container
                    direction="column"
                    alignContent="center"
                    justify="center"
                    className={classes.root}
                >
                    <Backdrop className={classes.backdrop} open={isLoading}>
                        <TutoLoader />
                    </Backdrop>
                </Grid>
            )}
        </Fragment>
    )
}

export default ConfirmedSignedUp
