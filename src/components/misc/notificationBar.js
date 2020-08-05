import React, { useState, useContext } from 'react'
import { Slide, Snackbar } from '@material-ui/core'
import { AuthContext } from '../../store/contexts/auth/authContext'
import MuiAlert from '@material-ui/lab/Alert'
import { Alert } from '@material-ui/lab'

function SlideTransition(props) {
    return <Slide {...props} direction="up" />
}

function AlertModified(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorLogIn = () => {
    const { authState, dispatchAuth } = useContext(AuthContext)

    return (
        <Snackbar
            open={authState.showErrorLogin}
            onClose={() => {
                dispatchAuth({
                    type: 'HANDLE_ERROR',
                })
            }}
            TransitionComponent={Slide}
            message="Erreur - Identifiants non valides !"
            autoHideDuration={1500}
        >
            <Alert variant="filled" severity="error">
                Erreur - Identifiants non valides !
            </Alert>
        </Snackbar>
    )
}

export const SubscribtionNotif = (props) => {
    /* props : 
    - state 
    - flag : the field of the state that decides of the displaying of the alert
    - setState
    - serverity
    - creator
    */
    return (
        <Snackbar
            open={props.state[props.flag]}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={() =>
                props.setState({
                    ...props.state,
                    [props.flag]: false,
                })
            }
        >
            <AlertModified
                onClose={() =>
                    props.setState({
                        ...props.state,
                        [props.flag]: false,
                    })
                }
                severity={props.severity}
            >
                {props.severity == 'success'
                    ? `Vous vous êtes inscrit à l'annonce de ${
                          props.creator?.firstName
                      }
                ${props.creator?.lastName?.toUpperCase()} !`
                    : `Vous vous êtes bien désinscrit à l'annonce de ${
                          props.creator?.firstName
                      }
                ${props.creator?.lastName?.toUpperCase()} !`}
            </AlertModified>
        </Snackbar>
    )
}

export const PostStateNotification = (props) => {
    /* props : 
    - flag
    - state
    - setState
    - severity
    - text
    */
    return (
        <Snackbar
            open={props.state[props.flag]}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={() =>
                props.setState({
                    ...props.state,
                    [props.flag]: false,
                })
            }
        >
            <AlertModified
                onClose={() =>
                    props.setState({
                        ...props.state,
                        [props.flag]: false,
                    })
                }
                severity={props.severity}
            >
                {props.text}
            </AlertModified>
        </Snackbar>
    )
}

export const WelcomeBackAuth = () => {
    const [openAuth, setOpenAuth] = useState(true)
    return (
        <Snackbar
            open={openAuth}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={() => setOpenAuth(false)}
        >
            <AlertModified
                onClose={() => setOpenAuth(false)}
                severity="success"
            >
                Vous êtes authentifié ! Bon retour parmi nous !
            </AlertModified>
        </Snackbar>
    )
}

export const SendPasswordReset = (props) => {
    const [open, setOpen] = useState(true)
    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        >
            <AlertModified
                onClose={() => setOpen(false)}
                severity={props.reason}
            >
                {props.text}
            </AlertModified>
        </Snackbar>
    )
}
