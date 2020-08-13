import React from 'react'
import {
    Grid,
    Button,
    useMediaQuery,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import useStyles from '../../styles/componentStyle/navbarStyle'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

export default function UnsignedLinks() {
    const classes = useStyles()
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    if (!isMobile)
        return (
            <Grid container direction="row">
                <NavLink className={classes.button} to="/login">
                    <Button
                        startIcon={<LockOpenIcon />}
                        variant="contained"
                        color="primary"
                        align="center"
                        size="medium"
                    >
                        Se connecter
                    </Button>
                </NavLink>

                <NavLink className={classes.button} to="/signup">
                    <Button
                        variant="contained"
                        color="primary"
                        align="center"
                        startIcon={<AssignmentIndIcon />}
                        size="medium"
                    >
                        S'inscrire
                    </Button>
                </NavLink>
            </Grid>
        )
    else
        return (
            <List>
                <NavLink className={classes.buttonMobile} to="/login">
                    <ListItem button>
                        <ListItemIcon>
                            <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary="Se connecter" />
                    </ListItem>
                </NavLink>

                <NavLink className={classes.buttonMobile} to="/signup">
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="S'inscrire" />
                    </ListItem>
                </NavLink>
            </List>
        )
}
