import React, { useContext } from 'react'
import { Typography, Button } from '@material-ui/core'
import useStyles from '../../styles/containerStyle/signupStyle'
import { NavLink } from 'react-router-dom'
import { UserCrContext } from '../../store/contexts/user/createUserContext'
import client from '../../vendors/feather'

const Review = () => {
    const classes = useStyles()
    const { userCrProfil } = useContext(UserCrContext)
    const commitUser = () => {
        //console.log('commited  :  ', userCrProfil)
        let formatedProfileCommited = {
            firstName:userCrProfil.firstName,
            lastName:userCrProfil.lastName,
            email: userCrProfil.email,
            password: userCrProfil.password,
            yearId: userCrProfil.year._id,
            departmentId: userCrProfil.department._id,
            favoriteSubjectsIds: userCrProfil.favoriteSubjects.map(
                (subject) => {
                    return subject._id
                }
            ),
            difficultSubjectsIds: userCrProfil.difficultSubjects.map(
                (subject) => {
                    return subject._id
                }
            ),
            permissions: userCrProfil.permissions,
        }

        switch (formatedProfileCommited.permissions) {
            case 'Tuteur':
                formatedProfileCommited.permissions = ['tuteur']
                break
            case 'Etudiant':
                formatedProfileCommited.permissions = ['eleve']
                break
            case 'Les deux':
                formatedProfileCommited.permissions = ['eleve', 'tuteur']
                break
            default:
                break
        }

        //console.log(formatedProfileCommited)
        client
            .service('users')
            .create(formatedProfileCommited)
            .catch((err) => console.log('error : ', err))
    }
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" align="center">
                Pour terminer la création de votre compte, un mail de
                confirmation va vous être envoyé sur votre mail INSA !
            </Typography>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={commitUser}
            >
                <NavLink className={classes.navlink} to="/">
                    Envoyer le mail !
                </NavLink>
            </Button>
        </React.Fragment>
    )
}

export default Review
