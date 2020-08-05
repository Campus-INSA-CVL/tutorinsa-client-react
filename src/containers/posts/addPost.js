import React, { useState, Fragment, useEffect, useContext } from 'react'
import {
    FormControl,
    FormLabel,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Button,
    Grid,
    Fab,
    Dialog,
    Stepper,
    Step,
    StepLabel,
    DialogActions,
    DialogTitle,
    DialogContent,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
    ColorlibConnector,
    useColorlibStepIconStyles,
    ColorlibStepIcon,
    useStyles,
} from '../../styles/containerStyle/addPostStyle'
import CampusForm from '../../components/posts/addPost.campus'
import CalendarForm from '../../components/posts/post.calendar'
import DurationForm from '../../components/posts/post.duration'
import RoomForm from '../../components/posts/post.room'
import ContentForm from '../../components/posts/post.content'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import ReviewPost from '../../components/posts/addPost.review'
import client from '../../vendors/feather'
import { UserContext } from '../../store/contexts/user/userContext'
import { ApiContext } from '../../store/contexts/api/apiContext'
import fetchData from '../../lib/fetchData'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import { motion } from 'framer-motion'

export default function AddPost() {
    const classes = useStyles()
    const [state, setState] = useState({
        isAbleToGoNextSteps: false,
    })
    const [activeStep, setActiveStep] = useState(0)

    const { postInfo, dispatchPostInfo } = useContext(PostCrContext)
    const { userData, dispatchUserData } = useContext(UserContext)
    const { apiState, dispatchApiData } = useContext(ApiContext)
    const { themePreference } = useContext(ThemeContext)

    function getSteps() {
        return ['Campus', 'Date', 'Salle', 'Durée', 'Contenu']
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CampusForm state={state} setState={setState} />
            case 1:
                return postInfo.type == 'tuteur' ? (
                    <CalendarForm
                        contextState={postInfo}
                        dispatchMethod={dispatchPostInfo}
                        state={state}
                        setState={setState}
                    />
                ) : (
                    setActiveStep(4)
                )
            case 2:
                return (
                    <RoomForm
                        contextState={postInfo}
                        dispatchMethod={dispatchPostInfo}
                        state={state}
                        setState={setState}
                    />
                )
            case 3:
                return (
                    <DurationForm
                        contextState={postInfo}
                        dispatchMethod={dispatchPostInfo}
                        state={state}
                        setState={setState}
                    />
                )
            case 4:
                return (
                    <ContentForm
                        contextState={postInfo}
                        dispatchMethod={dispatchPostInfo}
                        state={state}
                        setState={setState}
                        userPost={postInfo}
                    />
                )
            case 5:
                return <ReviewPost />
            default:
                return 'Erreur - Step inconnue'
        }
    }
    const steps = getSteps()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setState({ ...state, isAbleToGoNextSteps: false })
    }

    const handleBack = () => {
        if (activeStep === 4 && postInfo.type == 'eleve') setActiveStep(0)
        else setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const commitPost = () => {
        if (postInfo.type == 'tuteur')
            client.service('posts').create({
                comment: postInfo.comment,
                type: postInfo.type,
                startAt: postInfo.startAt,
                duration: postInfo.duration,
                studentsCapacity: postInfo.studentsCapacity,
                tutorsCapacity: postInfo.tutorsCapacity,
                subjectId: postInfo.subjectId._id,
                roomId: postInfo.roomId._id,
            })
        else if (postInfo.type == 'eleve')
            client.service('posts').create({
                comment: postInfo.comment,
                type: postInfo.type,
                subjectId: postInfo.subjectId._id,
                campus: postInfo.campus,
            })
        else console.log('erreur - type de user inconnu !')

        //we close the create  pop-up and reset the request, and re fetch the posts by sending something a trigger to
        // to the posts component
        dispatchPostInfo({ type: 'RESET', payload: false })
    }

    const validateSteps = (direction) => {
        switch (activeStep) {
            case 0:
                if (postInfo.campus != '' && postInfo.type != '') {
                    setState({ ...state, isAbleToGoNextSteps: true })
                    console.log('called for step : ', activeStep)
                }
                break
            case 1:
                if (postInfo.date != '') {
                    setState({ ...state, isAbleToGoNextSteps: true })
                    console.log('called for step : ', activeStep)
                }
                break
            case 2:
                if (Object.keys(postInfo.roomId).length !== 0) {
                    setState({ ...state, isAbleToGoNextSteps: true })
                    console.log('called for step : ', activeStep)
                }
                break
            case 3:
                if (postInfo.duration != 0) {
                    setState({ ...state, isAbleToGoNextSteps: true })
                    console.log('called for step : ', activeStep)
                }
                break
            case 4:
                if (postInfo.type == 'tuteur') {
                    postInfo.comment != '' &&
                        !(Object.keys(postInfo.subjectId).length === 0) &&
                        postInfo.studentsCapacity != null &&
                        postInfo.tutorsCapacity != null &&
                        setState({ ...state, isAbleToGoNextSteps: true })
                } else
                    postInfo.comment != '' &&
                        !(Object.keys(postInfo.subjectId).length === 0) &&
                        setState({ ...state, isAbleToGoNextSteps: true })

                break
            default:
                setState({ ...state, isAbleToGoNextSteps: false })
        }
    }
    useEffect(() => {
        console.log(postInfo)
        validateSteps()
        console.log('state : ', state)
    }, [postInfo])

    /* DISCALIMER - MODELE ACTUEL POUR CREER UN POST  :
    on considère qu'il ne peut y avoir pour UN JOUR et UNE SALLE donnée, UN SEUL ET UNIQUE TUTORAT.
    Cela sous entend que si il y a 4 salles dispo le mardi, il ne peut y avoir que 4 tutorat cette journée là.
    Cela ne rend clairement pas compte de la réalité, mais tant pis. A améliorer plus tard.
    */
    return (
        <Dialog
            open={postInfo.togglePopUp}
            className={classes.dialog}
            onClose={() => dispatchPostInfo({ type: 'DIALOG', payload: false })}
            maxWidth="xs"
            aria-labelledby="post_cr_title"
            PaperProps={{ classes: { root: classes.root } }}
        >
            <DialogTitle
                id="post_cr_title"
                align="center"
                style={{
                    background: 'inherit',
                }}
            >
                Création d'une annonce
            </DialogTitle>
            <DialogContent
                style={{
                    background: 'inherit',
                }}
            >
                <Stepper
                    style={{
                        background: 'inherit',
                    }}
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<ColorlibConnector />}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconComponent={ColorlibStepIcon}
                                color={themePreference.textCardColor}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions style={{ background: 'inherit' }}>
                {activeStep === steps.length ? (
                    <Grid container justify="center">
                        <Button
                            onClick={commitPost}
                            className={classes.button}
                            variant="outlined"
                        >
                            Poster l'annonce
                        </Button>
                    </Grid>
                ) : (
                    <Grid container justify="center">
                        <Grid item>
                            <Button
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Précédent
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleNext}
                                className={classes.button}
                                disabled={!state.isAbleToGoNextSteps}
                                align="center"
                            >
                                {activeStep === steps.length - 1
                                    ? 'Terminer'
                                    : 'Suivant'}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </DialogActions>
        </Dialog>
    )
}
