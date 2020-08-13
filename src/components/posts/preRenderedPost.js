import React, { Fragment, useState, useContext, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardActionArea,
    Typography,
    IconButton,
    CardActions,
    Grid,
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    Snackbar,
} from '@material-ui/core'
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    FacebookShareCount,
    RedditShareCount,
    FacebookIcon,
    EmailIcon,
    LinkedinIcon,
    TwitterIcon,
    RedditIcon,
    InstapaperIcon,
} from 'react-share'
import MuiAlert from '@material-ui/lab/Alert'
import useStyles from '../../styles/componentStyle/preRenderedPostStyle'
import SchoolIcon from '@material-ui/icons/School'
import TodayIcon from '@material-ui/icons/Today'
import RoomIcon from '@material-ui/icons/Room'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'
import SendIcon from '@material-ui/icons/Send'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import { NavLink, Redirect } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import client from '../../vendors/feather'
import formatDate from '../../lib/formatDate'
import { ApiContext } from '../../store/contexts/api/apiContext'
import formatDuration from '../../lib/formatDuration'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { UserContext } from '../../store/contexts/user/userContext'
import {
    subscribeFromPost,
    unsubscribeFromPost,
} from '../../lib/subscriptionsFunctions'
import { SubscribtionNotif } from '../misc/notificationBar'
import SubscriptionDialog from '../../components/posts/subscriptionDialog'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'

const iconsList = (route) => [
    <EmailShareButton url={route}>
        <EmailIcon size={32} round={true} />
    </EmailShareButton>,

    <FacebookShareButton
        url={route}
        quote="Participez à cette super séance !"
        hashtag="#Tutorinsa"
    >
        <FacebookIcon size={32} round={true} />
    </FacebookShareButton>,

    <InstapaperShareButton url={route}>
        <InstapaperIcon size={32} round={true} />
    </InstapaperShareButton>,

    <LinkedinShareButton url={route}>
        <LinkedinIcon size={32} round={true} />
    </LinkedinShareButton>,

    <RedditShareButton url={route}>
        <RedditIcon size={32} round={true} />
    </RedditShareButton>,

    <TwitterShareButton url={route}>
        <TwitterIcon size={32} round={true} />{' '}
    </TwitterShareButton>,
]

const PreRenderedPost = (props) => {
    const classes = useStyles()

    const { apiState, dispatchApiData } = useContext(ApiContext)
    const { authState } = useContext(AuthContext)
    const { userData } = useContext(UserContext)
    const { themePreference } = useContext(ThemeContext)
    const { dispatchPostInfo } = useContext(PostCrContext)

    const [state, setState] = useState({
        openDialogSelectRole: false,
        successSubscribe: false,
        successUnSubscribe: false,
    })
    const [redirect, setRedirect] = useState(false)

    const redirectToPostDetail = (route) => {
        return <Redirect to={route} />
    }

    if (redirect) return <Redirect to="/posts" />
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
            }}
        >
            <Card
                className={
                    props.userPost.type == 'eleve'
                        ? classes.studentStyle
                        : classes.tutorStyle
                }
                key={props.key}
                style={
                    props.userPost.type == 'eleve'
                        ? {
                              borderLeft: themePreference.greenTitleCard,
                          }
                        : {
                              borderLeft: themePreference.purpleTitleCard,
                          }
                }
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        style={
                            props.userPost.type == 'eleve'
                                ? { color: '#1cc88a' }
                                : { color: '#9d2ab7' }
                        }
                    >
                        {props.userPost.type == 'eleve'
                            ? 'DEMANDE ÉTUDIANT '
                            : 'OFFRE TUTEUR'}
                    </Typography>
                    <Divider />
                    <br />
                    <CardActionArea
                        disabled={!authState.isAuthenticated}
                        onClick={() =>
                            redirectToPostDetail(`/post/${props.userPost._id}`)
                        }
                    >
                        <NavLink
                            className={classes.navlink}
                            to={`/post/${props.userPost._id}`}
                        >
                            <Grid container direction="column" align="baseline">
                                <Grid
                                    item
                                    xs
                                    container
                                    spacing={1}
                                    alignItems="center"
                                >
                                    {props.userPost.type == 'eleve' && (
                                        <Grid item>
                                            <LocationCityIcon />
                                        </Grid>
                                    )}
                                    {props.userPost.type == 'eleve' && (
                                        <Grid item>
                                            {props.userPost.campus}
                                        </Grid>
                                    )}
                                </Grid>

                                <Grid
                                    item
                                    xs
                                    container
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <SchoolIcon />
                                    </Grid>
                                    <Grid item>
                                        {props.userPost.subject.name}
                                    </Grid>
                                </Grid>

                                {authState.isAuthenticated &&
                                    props.userPost.type == 'tuteur' && (
                                        <Grid
                                            item
                                            xs
                                            container
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <RoomIcon />
                                            </Grid>
                                            <Grid item>
                                                {props.userPost.room.name}
                                            </Grid>
                                        </Grid>
                                    )}

                                {authState.isAuthenticated &&
                                    props.userPost.type == 'tuteur' && (
                                        <Grid
                                            item
                                            xs
                                            container
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <TodayIcon />
                                            </Grid>
                                            <Grid item>
                                                {formatDate(
                                                    props.userPost.startAt
                                                )}
                                            </Grid>
                                        </Grid>
                                    )}
                                {props.userPost.type == 'tuteur' && (
                                    <Grid
                                        item
                                        xs
                                        container
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <ScheduleIcon />
                                        </Grid>
                                        <Grid item>
                                            {formatDuration(
                                                props.userPost.duration
                                            )}
                                        </Grid>
                                    </Grid>
                                )}

                                {authState.isAuthenticated && (
                                    <Grid
                                        item
                                        xs
                                        container
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <SupervisorAccountIcon />
                                        </Grid>
                                        <Grid item>
                                            {`${
                                                props.userPost?.creator?.firstName
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                props.userPost?.creator?.firstName.slice(
                                                    1
                                                )
                                            } ${props.userPost?.creator?.lastName.toUpperCase()}`}
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </NavLink>
                    </CardActionArea>
                </CardContent>

                <CardActions>
                    {authState.isAuthenticated &&
                    props.userPost?.type == 'tuteur' &&
                    authState.isAuthenticated ? (
                        props.userPost.type == 'tuteur' ? (
                            <motion.div>
                                {!(
                                    props.userPost?.creator?._id == userData._id
                                ) && (
                                    <Button
                                        variant={
                                            props.userPost?.studentsIds?.includes(
                                                userData._id
                                            ) ||
                                            props.userPost?.tutorsIds?.includes(
                                                userData._id
                                            )
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        color="primary"
                                        disable={
                                            userData._id ==
                                            props.userPost.creatorId
                                        }
                                        onClick={
                                            props.userPost?.studentsIds?.includes(
                                                userData._id
                                            ) ||
                                            props.userPost?.tutorsIds?.includes(
                                                userData._id
                                            )
                                                ? () => {
                                                      unsubscribeFromPost(
                                                          setState,
                                                          state,
                                                          props.userPost,
                                                          userData._id,
                                                          dispatchApiData
                                                      )
                                                  }
                                                : () => {
                                                      setState({
                                                          ...state,
                                                          openDialogSelectRole: true,
                                                      })
                                                  }
                                        }
                                        endIcon={
                                            props.userPost?.studentsIds?.includes(
                                                userData._id
                                            ) ||
                                            props.userPost?.tutorsIds?.includes(
                                                userData._id
                                            ) ? (
                                                <DoneOutlinedIcon />
                                            ) : (
                                                <AddBoxOutlinedIcon />
                                            )
                                        }
                                    >
                                        {props.userPost?.studentsIds?.includes(
                                            userData._id
                                        ) ||
                                        props.userPost?.tutorsIds?.includes(
                                            userData._id
                                        )
                                            ? 'Se désinscrire'
                                            : 'Participer'}
                                    </Button>
                                )}

                                <SubscriptionDialog
                                    setSubscribtionState={setState}
                                    subscribtionState={state}
                                    post={props.userPost}
                                    userData={userData}
                                />
                            </motion.div>
                        ) : (
                            <Button
                                variant="outlined"
                                color="primary"
                                endIcon={<SendIcon />}
                                onClick={() => {
                                    dispatchPostInfo({
                                        type: 'CAMPUS',
                                        payload: {
                                            name: 'type',
                                            value: 'tuteur',
                                        },
                                    })
                                    dispatchPostInfo({
                                        type: 'CAMPUS',
                                        payload: {
                                            name: 'campus',
                                            value: props.userPost.campus,
                                        },
                                    })
                                    dispatchPostInfo({
                                        type: 'CONTENT',
                                        payload: {
                                            name: 'subjectId',
                                            value: props.userPost.subject,
                                        },
                                    })
                                    dispatchPostInfo({
                                        type: 'DIALOG',
                                        payload: true,
                                    })
                                    setRedirect(true)
                                }}
                            >
                                Répondre à l'annonce
                            </Button>
                        )
                    ) : (
                        ''
                    )}

                    <Grid container spacing={2} justify="flex-end">
                        {iconsList('some_url //TODO').map((icon, index) => {
                            return (
                                <Grid item key={index}>
                                    {icon}
                                </Grid>
                            )
                        })}
                    </Grid>
                </CardActions>
            </Card>

            {authState.isAuthenticated && (
                <Fragment>
                    <SubscribtionNotif
                        severity="success"
                        state={state}
                        flag={'successSubscribe'}
                        setState={setState}
                        creator={props.userPost.creator}
                    />

                    <SubscribtionNotif
                        severity="info"
                        state={state}
                        flag={'successUnSubscribe'}
                        setState={setState}
                        creator={props.userPost.creator}
                    />
                </Fragment>
            )}
        </motion.div>
    )
}
export default PreRenderedPost
