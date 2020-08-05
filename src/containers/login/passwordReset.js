import React, { useState, useEffect, Fragment } from 'react'
import {
    Typography,
    Button,
    TextField,
    Container,
    FormControl,
    Card,
    Grid,
} from '@material-ui/core'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/homeStyle'
import TutoLoader from '../../components/misc/loader'
import { NavLink } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School'
import client from '../../vendors/feather'
import { SendPasswordReset } from '../../components/misc/notificationBar'
import { motion } from 'framer-motion'

const ConfirmedSignedUp = (props) => {
    const classes = useStyles()
    const user_token = new URLSearchParams(
        document.location.search.substring(1)
    ).get('token')

    const [state, setState] = useState({
        newPassword: '',
        status: 0,
        error: false,
    })

    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const validate = () => {
        if (!passwordRegExp.test(state.newPassword)) {
            setState({ ...state, error: true })
            return false
        } else {
            setState({ ...state, error: false })
            return true
        }
    }
    return (
        <motion.div
            className={classes.root}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Container className={classes.root} component="main" maxWidth="lg">
                <Card className={classes.paper}>
                    <Typography component="h4" variant="h6" align="center">
                        Nouveau mot de passe :
                    </Typography>
                    <Grid container justify="center">
                        <FormControl className={classes.formControl}>
                            <TextField
                                required
                                label="Mot de passe"
                                fullWidth
                                error={state.error}
                                type="password"
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        newPassword: e.target.value,
                                    })
                                }
                                helperText={
                                    state.error && 'Le mot de passe doit être valide ! :  8 caractères minimum dont une majusucule, une minuscule, un nombre et un caractère spécial '
                                }
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={() =>
                                    validate() &&
                                    client
                                        .service('authManagement')
                                        .create({
                                            action: 'sendResetPwd',
                                            value: {
                                                password: state.newPassword,
                                                token: user_token,
                                            },
                                        })
                                        .then((res) =>
                                            setState({ ...state, status: 1 })
                                        )
                                        .catch((err) =>
                                            setState({ ...state, status: 2 })
                                        )
                                }
                            >
                                Envoyer
                            </Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                        </FormControl>
                    </Grid>
                </Card>

                {state.status == 1 ? (
                    <SendPasswordReset
                        text="Le nouveau mot de passe a bien été changé ! "
                        reason="success"
                    />
                ) : (
                    state.status == 2 && (
                        <SendPasswordReset
                            text="Erreur au niveau de l'API, veuillez contacter le support !"
                            reason="error"
                        />
                    )
                )}
            </Container>
        </motion.div>
    )
}

export default ConfirmedSignedUp
