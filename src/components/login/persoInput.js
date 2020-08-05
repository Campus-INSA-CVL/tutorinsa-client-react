import React, { useState, useContext, useEffect } from 'react'
import { Grid, TextField, Button } from '@material-ui/core/'
import useStyles from '../../styles/containerStyle/signupStyle'
import '../../styles/css/invalidForm.css'
import { UserCrContext } from '../../store/contexts/user/createUserContext'

export default function PersoInput(props) {
    const [state, setState] = useState({
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
        passwordVerifError: '',
    })

    const { userCrProfil, dispatchUserCr } = useContext(UserCrContext)
    const classes = useStyles()

    const validate = () => {
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        //console.log(passwordRegExp.test(userCrProfil.password))
        let error = false
        const errors = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            passwordVerifError: '',
        }

        if (userCrProfil.firstName.length == 0) {
            error = true
            errors.firstNameError = 'Un prénom doit être rentré !'
        }
        if (userCrProfil.lastName.length == 0) {
            error = true
            errors.lastNameError = 'Un nom doit être rentré !'
        }
        if (userCrProfil.email.indexOf('@insa-cvl.fr') === -1) {
            error = true
            errors.emailError = 'L\'adresse mail doit contenir "@insa-cvl.fr" !'
        }
        if (userCrProfil.password.length == 0) {
            error = true
            errors.passwordError = 'Les mots de passes ne peuvent être vide !'
            errors.passwordVerifError =
                'Les mots de passes ne peuvent être vide !'
        }
        if (userCrProfil.password.length > 0) {
            if (!passwordRegExp.test(userCrProfil.password)) {
                errors.passwordError = 'Le mot de passe doit être valide !'
                error = true
            }
            if (userCrProfil.password != userCrProfil.passwordVerif) {
                errors.passwordVerifError =
                    'Les mots de passes doivent correspondre !'
                error = true
            }
        }

        setState({ ...state, ...errors })

        return error
    }

    const onChange = (e) => {
        dispatchUserCr({
            type: 'PERSONAL_INFO',
            payload: {
                name: [e.target.name],
                value: e.target.value,
            },
        })
        //setState({ ...state, [e.target.name]: e.target.value })
        //console.log(state)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        //console.log(state)
        if (!validate()) {
            props.handleStep()
        }
    }
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="firstName"
                        label="Prénom"
                        onChange={onChange}
                        value={userCrProfil.firstName}
                        required
                        error={state.firstNameError == '' ? false : true}
                        helperText={state.firstNameError}
                        fullWidth
                        className={
                            state.firstNameError == '' ? null : 'inputField'
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={state.lastNameError == '' ? false : true}
                        value={userCrProfil.lastName}
                        onChange={onChange}
                        required
                        name="lastName"
                        label="Nom"
                        fullWidth
                        helperText={state.lastNameError}
                        className={
                            state.lastNameError == '' ? null : 'inputField'
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={state.emailError == '' ? false : true}
                        onChange={onChange}
                        value={userCrProfil.email}
                        required
                        name="email"
                        type="mail"
                        label="Adresse mail INSA"
                        fullWidth
                        autoComplete="email"
                        helperText={state.emailError}
                        className={state.emailError == '' ? null : 'inputField'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={state.passwordError == '' ? false : true}
                        onChange={onChange}
                        value={userCrProfil.password}
                        required
                        name="password"
                        type="password"
                        label="Mot de passe"
                        fullWidth
                        helperText={
                            '8 caractères minimum dont une majusucule, une minuscule, un nombre et un caractère spécial ' +
                            state.passwordError
                        }
                        className={
                            state.passwordError == '' ? null : 'inputField'
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={state.passwordVerifError == '' ? false : true}
                        className={
                            state.passwordVerifError == '' ? null : 'inputField'
                        }
                        value={userCrProfil.passwordVerif}
                        onChange={onChange}
                        required
                        name="passwordVerif"
                        type="password"
                        helperText={state.passwordVerifError}
                        label="Confirmation du mot de passe"
                        fullWidth
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    className={classes.button}
                >
                    {'Suivant'}
                </Button>
            </Grid>
        </React.Fragment>
    )
}
