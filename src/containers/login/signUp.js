import React, { useState, useContext, useEffect } from 'react'
import {
    IconButton,
    CssBaseline,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
} from '@material-ui/core/'
import logoTutorinsa from '../../images/logo_tutorat.png'
import PersoInput from '../../components/login/persoInput'
import Review from '../../components/login/review'
import SubjectInput from '../../components/login/subjectsInput'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/signupStyle'
import { NavLink, Redirect } from 'react-router-dom'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { motion } from 'framer-motion'
import { UserCrContext } from '../../store/contexts/user/createUserContext'

const steps = ['Informations personnelles', 'Scolarité', 'Confirmation']

export default function SignUp() {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const { authState, dispatchAuth } = useContext(AuthContext) //authState.isAuth handle the auth state !
    const {userCrProfil} = useContext(UserCrContext)

    useEffect(() => {
        console.log(userCrProfil)        
    }, [userCrProfil])
    
    
    if (authState.isAuthenticated) return <Redirect to="/" />

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <PersoInput handleStep={() => setActiveStep(1)} />
            case 1:
                return <SubjectInput handleStep={() => setActiveStep(2)} />
            case 2:
                return <Review handleStep={() => setActiveStep(3)} />
            default:
                throw new Error('Unknown step')
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

  
    return (
        <motion.div
            className={classes.root}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <CssBaseline />
            <IconButton color="inherit" aria-label="menu">
                <NavLink to="/">
                    <img
                        className={classes.img}
                        src={logoTutorinsa}
                        alt="Logo de TutorINSA"
                    />
                </NavLink>
            </IconButton>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Créer un compte
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography
                                    style={{ padding: '1rem' }}
                                    component="h3"
                                    variant="h4"
                                    align="center"
                                >
                                    Compte crée !
                                </Typography>
                                <NavLink to="/" className={classes.navlink}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        align="center"
                                        className={classes.homeButton}
                                    >
                                        Revenir à l'accueil
                                    </Button>
                                </NavLink>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Précédent
                                        </Button>
                                    )}
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </motion.div>
    )
}
