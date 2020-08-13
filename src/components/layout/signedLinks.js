import React, { useContext, useState } from 'react'
import {
    Button,
    Grid,
    useMediaQuery,
    Fab,
    Backdrop,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HelpIcon from '@material-ui/icons/Help'
import ExitToApp from '@material-ui/icons/ExitToApp'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import AddIcon from '@material-ui/icons/Add'
import TodayIcon from '@material-ui/icons/Today'
import BuildIcon from '@material-ui/icons/Build'
import { NavLink, useLocation } from 'react-router-dom'
import useStyles, {
    containerVariants,
} from '../../styles/componentStyle/navbarStyle'
import { AuthContext } from '../../store/contexts/auth/authContext'
import client from '../../vendors/feather'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import { UserContext } from '../../store/contexts/user/userContext'
import { motion } from 'framer-motion'
import TutoLoader from '../misc/loader'

export default function SignedLinks() {
    const classes = useStyles()
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    const { dispatchAuth } = useContext(AuthContext)
    const { postInfo, dispatchPostInfo } = useContext(PostCrContext)
    const { userData, dispatchUserData } = useContext(UserContext)

    const [state, setState] = useState({
        isLoggedOut: false,
    })
    const location = useLocation().pathname
    if (!isMobile)
        return (
            <Grid container direction="row">
                <Grid item xs>
                    <NavLink className={classes.button} to="/profil">
                        <Button
                            startIcon={<AccountCircleIcon />}
                            variant="contained"
                            color="primary"
                            align="center"
                            size="medium"
                        >
                            Profil
                        </Button>
                    </NavLink>

                    <NavLink className={classes.button} to="/posts">
                        <Button
                            variant="contained"
                            color="primary"
                            align="center"
                            startIcon={<LibraryBooksIcon />}
                            size="medium"
                        >
                            Annonces
                        </Button>
                    </NavLink>

                    <NavLink className={classes.button} to="/calendar">
                        <Button
                            variant="contained"
                            color="primary"
                            align="center"
                            startIcon={<TodayIcon />}
                            size="medium"
                        >
                            Calendrier
                        </Button>
                    </NavLink>

                    {userData?.permissions?.includes('admin') && (
                        <NavLink className={classes.button} to="/">
                            <Button
                                variant="contained"
                                color="primary"
                                align="center"
                                startIcon={<BuildIcon />}
                                size="medium"
                                onClick={() => {
                                    dispatchUserData({
                                        type: 'SWITCH_ADMIN_PANEL',
                                    })
                                }}
                            >
                                Panel Administrateur
                            </Button>
                        </NavLink>
                    )}
                </Grid>

                {location === '/posts' && (
                    <Grid item xs>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={classes.button}
                        >
                            <Fab
                                color="primary"
                                variant="extended"
                                onClick={() =>
                                    dispatchPostInfo({
                                        type: 'DIALOG',
                                        payload: true,
                                    })
                                }
                            >
                                <AddIcon className={classes.extendedIcon} />
                                Ajouter une annonce
                            </Fab>
                        </motion.div>
                    </Grid>
                )}

                <Grid item xs container direction="row" justify="flex-end">
                    <NavLink className={classes.button} to="/help">
                        <Button
                            variant="contained"
                            color="primary"
                            align="center"
                            size="medium"
                            startIcon={<HelpIcon />}
                        >
                            Aide
                        </Button>
                    </NavLink>

                    <NavLink className={classes.button} to="/">
                        <Button
                            variant="contained"
                            className={classes.extendedIcon}
                            color="primary"
                            align="center"
                            size="medium"
                            startIcon={<ExitToApp />}
                            onClick={() => {
                                setState({ ...state, isLoggedOut: true })
                                client.logout().then((res) => {
                                    dispatchAuth({ type: 'LOG_OUT' })
                                    setState({ ...state, isLoggedOut: false })
                                })
                            }}
                        >
                            Se déconnecter
                        </Button>
                    </NavLink>
                </Grid>

                <Grid
                    container
                    direction="column"
                    alignContent="center"
                    justify="center"
                >
                    <Backdrop
                        className={classes.backdrop}
                        open={state.isLoggedOut}
                    >
                        <TutoLoader />
                    </Backdrop>
                </Grid>
            </Grid>
        )
    else
        return (
            <List>
                <NavLink className={classes.buttonMobile} to="/profil">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profil" />
                    </ListItem>
                </NavLink>

                <NavLink className={classes.buttonMobile} to="/calendar">
                    <ListItem button>
                        <ListItemIcon>
                            <TodayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Calendrier" />
                    </ListItem>
                </NavLink>

                <NavLink className={classes.buttonMobile} to="/posts">
                    <ListItem button>
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Annonces" />
                    </ListItem>
                </NavLink>

                {userData?.permissions?.includes('admin') && (
                    <NavLink className={classes.buttonMobile} to="/">
                        <ListItem
                            button
                            onClick={() => {
                                dispatchUserData({
                                    type: 'SWITCH_ADMIN_PANEL',
                                })
                            }}
                        >
                            <ListItemIcon>
                                <BuildIcon />
                            </ListItemIcon>
                            <ListItemText primary="Panel Administrateur" />
                        </ListItem>
                    </NavLink>
                )}

                <Divider />
                <NavLink className={classes.buttonMobile} to="/help">
                    <ListItem button>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Aide" />
                    </ListItem>
                </NavLink>

                <NavLink className={classes.buttonMobile} to="/">
                    <ListItem
                        button
                        onClick={() => {
                            setState({ ...state, isLoggedOut: true })
                            client.logout().then((res) => {
                                dispatchAuth({ type: 'LOG_OUT' })
                                setState({ ...state, isLoggedOut: false })
                            })
                        }}
                    >
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Se Déconnecter" />
                    </ListItem>
                </NavLink>

                <Grid
                    container
                    direction="column"
                    alignContent="center"
                    justify="center"
                >
                    <Backdrop
                        className={classes.backdrop}
                        open={state.isLoggedOut}
                    >
                        <TutoLoader />
                    </Backdrop>
                </Grid>
            </List>
        )
}
