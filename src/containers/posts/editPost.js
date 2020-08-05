import React, { useContext, useState, useEffect } from 'react'
import { ApiContext } from '../../store/contexts/api/apiContext'
import { PostEditContext } from '../../store/contexts/posts/postEditContext'
import {
    Card,
    Grid,
    Typography,
    LinearProgress,
    CardActions,
    Button,
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    Divider,
    TextareaAutosize,
    CardContent,
    Backdrop,
    FormHelperText,
    CardHeader,
    ExpansionPanel,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
    Popover,
    Paper,
} from '@material-ui/core'
import { DatePicker, TimePicker, Day } from '@material-ui/pickers'
import client from '../../vendors/feather'
import CampusForm from '../../components/posts/addPost.campus'
import CalendarForm from '../../components/posts/post.calendar'
import DurationForm from '../../components/posts/post.duration'
import RoomForm from '../../components/posts/post.room'
import ContentForm from '../../components/posts/post.content'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import { useStyles } from '../../styles/containerStyle/editPostStyle'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { PostStateNotification } from '../../components/misc/notificationBar'

export default function EditPost(props) {
    const classes = useStyles()
    const { apiState } = useContext(ApiContext)
    const { postEditInfo, dispatchEditedInfo } = useContext(PostEditContext)
    const { themePreference } = useContext(ThemeContext)

    const [stepperValid, setStepperValid] = useState({
        isAbleToGoNextSteps: false,
        isModified: false,
    })
    const [activeStep, setActiveStep] = useState(0)

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <CalendarForm
                        contextState={postEditInfo}
                        dispatchMethod={dispatchEditedInfo}
                        setState={setStepperValid}
                        state={stepperValid}
                    />
                )
            case 1:
                return (
                    <RoomForm
                        contextState={postEditInfo}
                        dispatchMethod={dispatchEditedInfo}
                        state={stepperValid}
                        setState={setStepperValid}
                    />
                )
            case 2:
                return (
                    <DurationForm
                        contextState={postEditInfo}
                        dispatchMethod={dispatchEditedInfo}
                        state={stepperValid}
                        setState={setStepperValid}
                    />
                )
            case 3:
                return (
                    <Grid container justify="center">
                        <CheckCircleIcon fontSize="large" color="inherit" />
                    </Grid>
                )
            default:
                return 'Erreur - Step inconnue'
        }
    }

    const steps = ['Date', 'Salle', 'Durée']

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setStepperValid({ ...stepperValid, isAbleToGoNextSteps: false }) //reset the form validation for each steps of the stepper !
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const validateSteps = () => {
        switch (activeStep) {
            case 0:
                postEditInfo.date != '' &&
                    setStepperValid({
                        ...stepperValid,
                        isAbleToGoNextSteps: true,
                    })
                break
            case 1:
                !(Object.keys(postEditInfo.roomId).length !== 0) &&
                    setStepperValid({
                        ...stepperValid,
                        isAbleToGoNextSteps: true,
                    })
                break
            case 2:
                postEditInfo.duration != 0 &&
                    setStepperValid({
                        ...stepperValid,
                        isAbleToGoNextSteps: true,
                    })
                break
            default:
                setStepperValid({ ...stepperValid, isAbleToGoNextSteps: false })
        }
    }

    const commitChanges = () => {
        //we're starting to make a request
        props.setState({ ...props.state, loading: true })

        client
            .service('posts')
            .patch(props.userPost?._id, {
                ...postEditInfo,
                subjectId: postEditInfo?.subjectId._id,
                roomId: postEditInfo?.roomId._id,
            })
            .then((res) => {
                props.setState({
                    ...props.state,
                    toggleModif: false,
                    postEditedSuccessfuly: true,
                })
                setStepperValid({ ...stepperValid, isModified: true })
            })
            .catch((err) => console.log('err : ', err))
    }

    useEffect(() => {
        validateSteps()
        console.log('request post : ', postEditInfo)
    }, [activeStep, postEditInfo])

    return (
        <Dialog
            open={props.open}
            onClose={() =>
                props.setState({ ...props.state, toggleModif: false })
            }
            maxWidth="xs"
            aria-labelledby="post_edit_title"
            className={classes.dialog}
            PaperProps={{ classes: { root: classes.root } }}
        >
            <DialogTitle id="post_edit_title" style={{ background: 'inherit' }}>
                Modification de l'annonce
            </DialogTitle>
            <DialogContent style={{ background: 'inherit', minWidth: 300 }}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h5">Contenu : </Typography>
                        </Grid>

                        <Grid item>
                            <ContentForm
                                contextState={postEditInfo}
                                dispatchMethod={dispatchEditedInfo}
                                userPost={props.userPost}
                                state={stepperValid}
                                setState={setStepperValid}
                            />
                        </Grid>
                    </Grid>

                    {props.userPost?.type == 'tuteur' && (
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h5">
                                    Créneau horaire :{' '}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography className={classes.instructions}>
                                    {getStepContent(activeStep)}
                                </Typography>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Précédent
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color={
                                                activeStep === steps.length
                                                    ? 'green'
                                                    : 'primary'
                                            }
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={
                                                !stepperValid.isAbleToGoNextSteps
                                            }
                                            align="center"
                                        >
                                            {activeStep === steps.length - 1
                                                ? 'Terminer'
                                                : activeStep != steps.length &&
                                                  'Suivant'}
                                            {activeStep === steps.length &&
                                                'Réglages enregistrées !'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions style={{ background: 'inherit' }}>
                <Button
                    align="center"
                    variant="contained"
                    color="primary"
                    onClick={commitChanges}
                    disabled={
                        postEditInfo?.comment?.length > 440 ||
                        (activeStep != 3 &&
                            postEditInfo?.startAt != props.userPost?.startAt)
                    }
                >
                    Confirmer les changements
                </Button>
            </DialogActions>
        </Dialog>
    )
}
