import React, { useState, useContext, useEffect } from 'react'
import {
    AppBar,
    IconButton,
    Toolbar
} from '@material-ui/core/'
import logoTutorinsa from '../../images/logo_tutorat.png'
import { NavLink } from 'react-router-dom'
import useStyles from '../../styles/componentStyle/navbarStyle'
import SignedLinks from './signedLinks'
import UnsignedLinks from './unsignedLinks'
import { AuthContext } from '../../store/contexts/auth/authContext'

export default function NavBar() {
    const { authState } = useContext(AuthContext) //authState.isAuth handle the auth state !

    const classes = useStyles()
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.button}
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

                {authState.isAuthenticated ? <SignedLinks /> : null}
                {!authState.isAuthenticated ? <UnsignedLinks /> : null}
            </Toolbar>
        </AppBar>
    )
}
