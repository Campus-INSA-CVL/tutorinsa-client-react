import React, { useState, useContext } from 'react'
import {
    Container,
    CssBaseline,
    Card,
    Grid,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    IconButton,
    Button,
} from '@material-ui/core'
import { NavLink, Redirect } from 'react-router-dom'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/passwordResetStyle'
import logoTutorinsa from '../../images/logo_tutorat.png'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { motion } from 'framer-motion'
import { SendPasswordReset } from '../../components/misc/notificationBar'
import client from '../../vendors/feather'

export default function PasswordReset() {
    const classes = useStyles()
    const { authState } = useContext(AuthContext) //authState.isAuth handle the auth state !
    const [email, setEmail] = useState('')
    const [state, setState] = useState({
        status: 0,
        error: false,
    })

    const validate = () => {
        if (email.indexOf('@insa-cvl.fr') === -1) {
            setState({ ...state, error: true })
            return false
        } else {
            setState({ ...state, error: false })
            return true
        }
    }
    if (authState.isAuthenticated) return <Redirect to="/" />
    return (
        <motion.div
            className={classes.root}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Container className={classes.root} component="main" maxWidth="lg">
                <IconButton
                    className={classes.center}
                    color="inherit"
                    aria-label="menu"
                >
                    <NavLink to="/">
                        <img
                            className={classes.img}
                            src={logoTutorinsa}
                            alt="Logo de TutorINSA"
                        />
                    </NavLink>
                </IconButton>
                <CssBaseline />
                <Card className={classes.paper}>
                    <Typography component="h2" variant="h4" align="center">
                        Mot de passe oublié ?
                    </Typography>
                    <Typography component="h4" variant="h6" align="center">
                        Nous allons vous envoyez un mail pour réinitialiser
                        votre mot de passe :
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            id="mailINSA"
                            name="email"
                            type="mail"
                            label="Adresse mail INSA"
                            fullWidth
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            error={state.error}
                            helperText={
                                state.error &&
                                "L'adresse mail doit être une adresse INSA !"
                            }
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => {
                                //validate() = true : no error
                                validate() &&
                                    client
                                        .service('authManagement')
                                        .create({
                                            action: 'sendResetPwd',
                                            value: {
                                                email: email,
                                            },
                                        })
                                        .then((res) => {
                                            console.log(res)
                                            setState({ ...state, status: 1 })
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                            setState({ ...state, status: 2 })
                                        })
                            }}
                        >
                            Envoyer
                        </Button>
                    </FormControl>

                    {state.status == 1
                        ? (
                              <SendPasswordReset
                                  text="L'email de réinitialisation du mot de passe a bien été envoyé ! 
                         Retrouvez le dans votre boîte mail INSA !"
                                  reason="success"
                              />
                          ) && setState({ ...state, status: 0 })
                        : state.status == 2 && (
                              <SendPasswordReset
                                  text="L'adresse email INSA entrée n'est pas liée à Tutorinsa. Si celle-ci figure correspond pourtant 
                                bien à votre adresse, veuillez contacter la maintenance du site."
                                  reason="error"
                              />
                          ) &&
                          setState({ ...state, status: 0 })}
                    <Grid container direction="column">
                        <Grid item className={classes.center}>
                            <a
                                className={classes.links}
                                href="https://tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"
                            >
                                Politique RGPD
                            </a>
                        </Grid>
                        <Grid item className={classes.center}>
                            <NavLink className={classes.links} to="/signup">
                                Créer un compte !
                            </NavLink>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </motion.div>
    )
}
