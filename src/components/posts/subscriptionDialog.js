import React, {useContext} from 'react'
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    TextareaAutosize,
    FormHelperText,
    CardHeader,
    ExpansionPanel,
    Typography,
    Grid,
    Button,
} from '@material-ui/core'
import {
    subscribeFromPost,
    unsubscribeFromPost,
} from '../../lib/subscriptionsFunctions'
import { useStyles } from '../../styles/containerStyle/addPostStyle'
import {ApiContext} from '../../store/contexts/api/apiContext'

const SubscriptionDialog = (props) => {
    // we don't need a flag props as there is only one flag
    const classes = useStyles()
    const {dispatchApiData} = useContext(ApiContext)
    return (
        <Dialog
            open={props.subscribtionState?.openDialogSelectRole}
            onClose={() =>
                props.setSubscribtionState({
                    ...props.subscribtionState,
                    openDialogSelectRole: false,
                })
            }
            style={{
                backdropFilter: 'blur(10px)',
            }}
            maxWidth="xs"
            aria-labelledby="subscription_title"
            PaperProps={{
                classes: {
                    root: classes.root,
                },
            }}
        >
            <DialogTitle id="subscription_title">
                <Typography variant="h3" align="center">
                    Séléctionner votre rôle dans cette annonce :
                </Typography>
            </DialogTitle>

            <DialogActions>
                <Grid container justify="space-evenly">
                    <Grid item>
                        <Button
                            disabled={
                                props.post?.fullStudents ||
                                !props.userData?.permissions?.includes('eleve')
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                subscribeFromPost(
                                    'eleve',
                                    props.setSubscribtionState,
                                    props.subscribtionState,
                                    props.post?._id,
                                    props.userData?._id,
                                    dispatchApiData
                                )
                            }}
                        >
                            Elève
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={
                                props.post?.fullTutors ||
                                !props.userData?.permissions?.includes('tuteur')
                            }
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                subscribeFromPost(
                                    'tuteur',
                                    props.setSubscribtionState,
                                    props.subscribtionState,
                                    props.post._id,
                                    props.userData?._id,
                                    dispatchApiData
                                )
                            }}
                        >
                            Tuteur
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default SubscriptionDialog
