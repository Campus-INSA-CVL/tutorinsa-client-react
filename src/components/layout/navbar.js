import React, { useState, useContext, Fragment } from 'react'
import {
    AppBar,
    IconButton,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    SwipeableDrawer,
    useMediaQuery,
    Grid,
    Divider,
    Typography,
    Popover,
    ListItemText,
} from '@material-ui/core/'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import logoTutorinsa from '../../images/logo_tutorat.png'
import { NavLink } from 'react-router-dom'
import useStyles from '../../styles/componentStyle/navbarStyle'
import SignedLinks from './signedLinks'
import UnsignedLinks from './unsignedLinks'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { UserContext } from '../../store/contexts/user/userContext'
import FacebookIcon from '@material-ui/icons/Facebook'
import logoINSA from '../../images/logo-insa.png'

export default function NavBar() {
    const { authState } = useContext(AuthContext) //authState.isAuth handle the auth state !
    const { userData } = useContext(UserContext)
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )
    const [openDrawer, setDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const classes = useStyles()
    return (
        <Fragment>
            {!isMobile ? (
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
            ) : (
                <Grid container justify="center">
                    <IconButton
                        color="inherit"
                        onClick={() => setDrawer(true)}
                        edge="start"
                    >
                        <MenuIcon htmlColor="#ffffff" />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={openDrawer}
                        onOpen={() => setDrawer(true)}
                        onClose={() => setDrawer(false)}
                    >
                        <Grid
                            container
                            justify="space-evenly"
                            style={{ width: 240 }}
                        >
                            <NavLink to="/">
                                <img
                                    className={classes.img}
                                    style={
                                        userData.appTheme
                                            ? userData.appTheme == 'dark'
                                                ? {}
                                                : {
                                                      filter: 'invert(1)',
                                                  }
                                            : {
                                                  filter: 'invert(1)',
                                              }
                                    }
                                    src={logoTutorinsa}
                                    alt="Logo de TutorINSA"
                                />
                            </NavLink>
                            <IconButton onClick={() => setDrawer(false)}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Grid>
                        <Divider />
                        {authState.isAuthenticated ? <SignedLinks /> : null}
                        {!authState.isAuthenticated ? <UnsignedLinks /> : null}
                        <Divider />
                        <Grid justify="flex-end">
                            <List>
                                <ListItem>
                                    <a
                                        className={classes.links}
                                        href="https://tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"
                                    >
                                        Politique RGPD
                                    </a>
                                </ListItem>
                                <ListItem
                                    button
                                    aria-owns={
                                        open ? 'mouse-over-popover' : undefined
                                    }
                                    aria-haspopup="true"
                                    onMouseEnter={(e) =>
                                        setAnchorEl(e.currentTarget)
                                    }
                                    onMouseLeave={() => setAnchorEl(null)}
                                >
                                    <ListItemText primary="Copyright © TutorINSA" />
                                </ListItem>

                                <NavLink
                                    className={classes.buttonMobile}
                                    to="/about"
                                >
                                    <ListItem button>
                                        <ListItemText primary="A propos" />
                                    </ListItem>
                                </NavLink>
                                <ListItem>
                                    <IconButton color="inherit">
                                        <a href="https://www.facebook.com/tutorinsacvl/">
                                            <FacebookIcon
                                                fontSize="large"
                                                color="inherit"
                                                style={
                                                    userData.appTheme
                                                        ? userData.appTheme ==
                                                          'light'
                                                            ? {}
                                                            : {
                                                                  color:
                                                                      '#ffffff',
                                                              }
                                                        : {}
                                                }
                                            />
                                        </a>
                                    </IconButton>
                                </ListItem>

                                <ListItem>
                                    <a href="https://www.insa-centrevaldeloire.fr/fr/">
                                        <img
                                            className={classes.img}
                                            src={logoINSA}
                                            alt="Logo de l'INSA Centre Val de Loire"
                                            style={
                                                userData.appTheme
                                                    ? userData.appTheme ==
                                                      'dark'
                                                        ? {}
                                                        : {
                                                              filter:
                                                                  'invert(1)',
                                                          }
                                                    : {
                                                          filter: 'invert(1)',
                                                      }
                                            }
                                        />
                                    </a>
                                </ListItem>

                                <Popover
                                    id="mouse-over-popover"
                                    style={{ pointerEvents: 'none' }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    onClose={() => setAnchorEl(null)}
                                    disableRestoreFocus
                                >
                                    <Typography variant="h5">
                                        Made by Esteban S., Jordan B., Cyprien
                                        L.
                                    </Typography>
                                </Popover>
                            </List>
                        </Grid>
                    </SwipeableDrawer>
                </Grid>
            )}
        </Fragment>
    )
}
