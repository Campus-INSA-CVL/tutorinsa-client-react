import React, { useState, useContext, useEffect } from 'react'
import logoINSA from '../../images/logo-insa.png'
import logoTutorinsa from '../../images/logo_tutorat.png'
import { NavLink, Redirect } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {
    useMediaQuery,
    IconButton,
    Card,
    Container,
    Typography,
    Grid,
    CssBaseline,
    Button,
    Avatar,
    TextField,
    Backdrop,
} from '@material-ui/core'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/loginStyle'
import '../../styles/css/invalidForm.css'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { UserContext } from '../../store/contexts/user/userContext'
import client from '../../vendors/feather'
import { ErrorLogIn } from '../../components/misc/notificationBar'
import TutoLoader from '../../components/misc/loader'
import { ApiContext } from '../../store/contexts/api/apiContext'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { logIn } from '../../lib/loginFunctions'
import { useMutation } from 'figbird'

export default function Login(props) {
    const classes = useStyles()
    const [state, setState] = useState({
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        loadingLogIn: false,
    })
    const [showErrorLogin, setErrorLogin] = useState(false)

    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    const { authState, dispatchAuth } = useContext(AuthContext) //authState.isAuth handle the auth state !
    const { userData, dispatchUserData } = useContext(UserContext)
    const { apiState, dispatchApiData } = useContext(ApiContext)

    /*const { data, isSuccess, isError, status } = useQuery(
        ['logIn', state.loadingLogIn, state.email, state.password],
        logIn
    )*/

    const { data, status, error, create } = useMutation('authentication', {
        strategy: 'local',
    })

    const validate = () => {
        let error = false
        const errors = {
            emailError: '',
            passwordError: '',
        }
        if (state.email.indexOf('@insa-cvl.fr') === -1) {
            error = true
            errors.emailError = 'L\'adresse mail doit contenir "@insa-cvl.fr" !'
        }
        if (state.password.length == 0) {
            error = true
            errors.passwordError = 'Le mot de passe ne peut être vide !'
        }
        setState({ ...state, ...errors })
        if (!error) {
            setState({ ...state, loadingLogIn: true })
            //figbird hook doesn't seems to handle the strategy field to store the token into localStorage
            // so now we use the old client from feathers client interface, TO FIX
            client
                .authenticate({
                    email: state.email,
                    password: state.password,
                    strategy: 'local',
                })
                .then((res) => {
                    setState({ ...state, loadingLogIn: true })
                    dispatchAuth({ type: 'LOG_IN' })
                    dispatchUserData({
                        type: 'GET_USER_INFO',
                        payload: res.user,
                    })
                    props.setNotifAuth(true)
                })
                .catch((err) => {
                    setState({
                        ...state,
                        loadingLogIn: false,
                    })
                    setErrorLogin(true)
                })
        }
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        validate()
    }

    useEffect(() => {
        // the API responded right, but with a wrong
        // answer for the user (invalid login, somewhat)

        !error && console.log('data : ', data)
        console.log(status, error)
        // the "state.loadingLogIn" is here to mark that a real fetch has been made
        if (error?.code == 401) {
            setState({
                ...state,
                loadingLogIn: false,
            })
            setErrorLogin(true)
        } else if (status == 'success') {
            dispatchAuth({ type: 'LOG_IN' })
            dispatchUserData({
                type: 'GET_USER_INFO',
                payload: data.user,
            })
            props.setNotifAuth(true)
        }

        error &&
            error?.code != 401 &&
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-LOGIN]"
            )
    }, [status, error])

    useEffect(() => {
        console.log('state :', showErrorLogin)
    }, [showErrorLogin])
    if (authState.isAuthenticated) return <Redirect to="/" />
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.root}
        >
            <Container className={classes.root} component="main" maxWidth="lg">
                <IconButton className={classes.center} color="inherit">
                    <NavLink to="/">
                        <img
                            className={classes.img}
                            src={logoTutorinsa}
                            alt="Logo de TutorINSA"
                        />
                    </NavLink>
                </IconButton>
                <CssBaseline />
                <Card className={classes.paper} style={
                    isMobile ? {
                        overflowY: "scroll"
                    } : {}
                }>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>

                    <form
                        onSubmit={handleSumbit}
                        className={classes.form}
                        noValidate
                    >
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <TextField
                                    required
                                    error={
                                        state.emailError == '' ? false : true
                                    }
                                    fullWidth
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="Entrez votre email"
                                    helperText={state.emailError}
                                    value={state.email}
                                    variant="outlined"
                                    className={
                                        state.emailError == ''
                                            ? null
                                            : 'inputField'
                                    }
                                />
                            </Grid>

                            <Grid item xs>
                                <TextField
                                    required
                                    error={
                                        state.passwordError == '' ? false : true
                                    }
                                    fullWidth
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    helperText={state.passwordError}
                                    value={state.password}
                                    variant="outlined"
                                    className={
                                        state.passwordError == ''
                                            ? null
                                            : 'inputField'
                                    }
                                />
                            </Grid>

                            <Grid item xs>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSumbit}
                                >
                                    Login
                                </Button>
                            </Grid>

                            <Grid item container direction="column">
                                <Grid item xs className={classes.center}>
                                    <a
                                        className={classes.links}
                                        href="https://tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"
                                    >
                                        Politique RGPD
                                    </a>
                                </Grid>

                                <Grid item className={classes.center}>
                                    <NavLink
                                        className={classes.links}
                                        to="/signup"
                                    >
                                        Créer un compte !
                                    </NavLink>
                                </Grid>

                                <Grid item className={classes.center}>
                                    <NavLink
                                        className={classes.links}
                                        to="/passwordReset"
                                    >
                                        Mot de passe oublié ?
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Card>

                <IconButton
                    className={classes.center}
                    color="inherit"
                    aria-label="menu"
                >
                    <img
                        className={classes.img}
                        src={logoINSA}
                        alt="Logo de l'INSA Centre Val de Loire"
                    />
                </IconButton>
            </Container>

            <ErrorLogIn
                showErrorLogin={showErrorLogin}
                setErrorLogin={setErrorLogin}
            />
            <Backdrop className={classes.backdrop} open={state.loadingLogIn}>
                <TutoLoader />
            </Backdrop>
        </motion.div>
    )
}
