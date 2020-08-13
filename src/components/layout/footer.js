import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Grid,
    List,
    Popover,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery
} from '@material-ui/core/'
import React, { useState } from 'react'
import logoINSA from '../../images/logo-insa.png'
import useStyles from '../../styles/componentStyle/footerStyle'
import FacebookIcon from '@material-ui/icons/Facebook'
import { NavLink } from 'react-router-dom'

export default function Footer(props) {
    const classes = useStyles()
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    if (!isMobile)
        return (
            <AppBar position="sticky" className={classes.footer}>
                <Toolbar>
                    <IconButton color="inherit">
                        <a href="https://www.insa-centrevaldeloire.fr/fr/">
                            <img
                                className={classes.img}
                                src={logoINSA}
                                alt="Logo de l'INSA Centre Val de Loire"
                            />
                        </a>
                    </IconButton>

                    <IconButton color="inherit" className={classes.fb}>
                        <a href="https://www.facebook.com/tutorinsacvl/">
                            <FacebookIcon
                                fontSize="large"
                                color="inherit"
                                style={{ color: 'white' }}
                            />
                        </a>
                    </IconButton>

                    <Grid
                        style={{ width: 'auto' }}
                        container
                        justify="flex-end"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            align="center"
                            className={classes.button}
                        >
                            <a
                                className={classes.links}
                                href="https://tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"
                            >
                                Politique RGPD
                            </a>
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            align="center"
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            className={classes.button}
                            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                            onMouseLeave={() => setAnchorEl(null)}
                        >
                            Copyright © TutorINSA
                        </Button>

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
                                Made by Esteban S., Jordan B., Cyprien L.
                            </Typography>
                        </Popover>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            align="center"
                            className={classes.button}
                        >
                            <NavLink to="/about" className={classes.links}>
                                A propos
                            </NavLink>
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    else
        return null
}
