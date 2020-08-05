import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Grid,
    useMediaQuery,
    Popover,
    Typography,
} from '@material-ui/core/'
import React, { useState, useContext } from 'react'
import logoINSA from '../../images/logo-insa.png'
import useStyles from '../../styles/componentStyle/footerStyle'
import FacebookIcon from '@material-ui/icons/Facebook'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    const classes = useStyles()
    const isMobile = useMediaQuery('(max-width:700px)')
    const [open, setOpen] = useState(false)

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
                            fontSize={isMobile ? 'small' : 'large'}
                            color="inherit"
                            style={{ color: 'white' }}
                        />
                    </a>
                </IconButton>

                <Grid style={{ width: 'auto' }} container justify="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? 'small' : 'medium'}
                        align="center"
                        className={classes.button}
                        onClick={isMobile ? () => setOpen(true) : null}
                    >
                        <a
                            className={classes.links}
                            href="https://tutorinsa.insa-cvl.org/politique%20de%20confidentialit%C3%A9.pdf"
                        >
                            {!isMobile ? 'Politique RGPD' : 'RGPD'}
                        </a>
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? 'small' : 'medium'}
                        align="center"
                        className={classes.button}
                    >
                        {!isMobile ? 'Copyright  © TutorINSA' : '©'}
                        <Popover open={open}>
                            <Typography>Copyright © TutorINSA</Typography>
                        </Popover>
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? 'small' : 'medium'}
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
}
