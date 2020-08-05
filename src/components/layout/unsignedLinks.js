import React from 'react'
import { Grid, Button, useMediaQuery } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import useStyles from '../../styles/componentStyle/navbarStyle'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

export default function UnsignedLinks() {
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width:700px)')

  return (
    <Grid container direction="row">

<NavLink className={classes.button} to="/login">
        <Button startIcon={<LockOpenIcon />} variant="contained"
          color="primary"
          align="center"
          size={isMobile ? "small" : "medium"}>
          {!isMobile ? "Login" : ""}
        </Button>
      </NavLink>

    <NavLink className={classes.button} to="/signup">
        <Button variant="contained"
          color="primary"
          align="center"
          startIcon={<AssignmentIndIcon />}
          size={isMobile ? "small" : "medium"}>
          {!isMobile ? 'SignUp' : ""}
        </Button>
      </NavLink>
    </Grid>
  )
}
