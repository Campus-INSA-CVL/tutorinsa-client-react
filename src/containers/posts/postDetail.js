import React, { useState, Fragment, useContext, useEffect } from 'react'
import {
    Card,
    Grid,
    Typography,
    CardActions,
    Button,
    Divider,
    CardContent,
    Backdrop,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
    Popover,
    Paper,
    useMediaQuery,
} from '@material-ui/core'
import EditPost from './editPost'
import Autocomplete from '@material-ui/lab/Autocomplete'
import ScheduleIcon from '@material-ui/icons/Schedule'
import useStyles from '../../styles/componentStyle/postStyle'
import EditIcon from '@material-ui/icons/Edit'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import EventIcon from '@material-ui/icons/Event'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SchoolIcon from '@material-ui/icons/School'
import RoomIcon from '@material-ui/icons/Room'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import TutoLoader from '../../components/misc/loader'
import client from '../../vendors/feather'
import formatDate from '../../lib/formatDate'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { UserContext } from '../../store/contexts/user/userContext'
import { PostEditContext } from '../../store/contexts/posts/postEditContext'
import { Redirect } from 'react-router-dom'
import { DatePicker, TimePicker, Day } from '@material-ui/pickers'
import formatDuration from '../../lib/formatDuration'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import { ApiContext } from '../../store/contexts/api/apiContext'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { useQuery } from 'react-query'
import { fetchDetailedPost } from '../../lib/fetchData'
import {
    unsubscribeFromPost,
    fetchStudents,
} from '../../lib/subscriptionsFunctions'
import {
    SubscribtionNotif,
    PostStateNotification,
} from '../../components/misc/notificationBar'
import { BorderLinearProgress } from '../../components/misc/capacityBar'
import SubscriptionDialog from '../../components/posts/subscriptionDialog'
import { useGet } from 'figbird'
import SendIcon from '@material-ui/icons/Send'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'

export default function Post(props) {
    const classes = useStyles()
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    const post_id = props.match.params.post_id

    const { authState } = useContext(AuthContext)
    const { userData } = useContext(UserContext)
    const { dispatchApiData } = useContext(ApiContext)
    const { postEditInfo, dispatchEditedInfo } = useContext(PostEditContext)
    const { dispatchPostInfo } = useContext(PostCrContext)

    // destructurate this one in small ones
    const [state, setState] = useState({
        postEditedSuccessfuly: false,
        toggleModif: false,
        loading: true,
        render: false,
        redirect: false,
    })

    const [studentListState, setStudentListState] = useState({
        studentsList: [],
        toggleStudentList: false,
    })

    //handling the subscriptions displays
    const [subscribtionState, setSubscribtionState] = useState({
        successSubscribe: false,
        successUnSubscribe: false,
        isUserRegistered: false,
        isAuthor: false,
        openDialogSelectRole: false,
    })

    const [fetchStudentsTrigger, setfetchStudentsTrigger] = useState(false)

    const [post, setPost] = useState()
    const [redirect, setRedirect] = useState(false)

    const toggleEditPost = () => setState({ ...state, toggleModif: true })

    const deletePost = () => {
        client
            .service('posts')
            .remove(post_id)
            .then(() => {
                setState({ ...state, redirect: true })
            })
    }

    const { data: detailedPost, status, error, isFetching, refetch } = useGet(
        'posts',
        post_id,
        {
            realtime: 'refetch',
        }
    )

    //we don't use figbird as we require a trigger to search the students list
    const {
        data: studentsList,
        isSuccess: studentsFetched,
        isError: studentsFetchError,
    } = useQuery(
        ['fetchStudents', post, fetchStudentsTrigger],
        fetchStudents,
        {}
    )

    useEffect(() => {
        if (status == 'error' && error?.code == 400) {
            //it means that the post does not exist
            window.location.href = '/404'
        } else if (status == 'error')
            !state.redirect &&
                window.alert(
                    "Problème de réseau - l'API ne répond pas [code : FETCH-POST_DETAILED]"
                )

        if (status == 'success') {
            /*if the posts exists, then we display the data and 
            create an initial modification request state  !
            If we want to edit the post, it will be with some presets : 
            the actual data of the post
             */
            setPost(detailedPost)
        }
    }, [status, detailedPost])

    useEffect(() => {
        //check if the user is the author or not and get the info about the subscribes students if this
        // is a tutor post

        if (post?.creator?._id == userData._id) {
            post?.type == 'tuteur' && setfetchStudentsTrigger(true)
            setSubscribtionState({ ...subscribtionState, isAuthor: true })
            dispatchEditedInfo({
                type: 'LOAD_DATA',
                payload: {
                    duration: detailedPost?.duration,
                    roomId: detailedPost?.room,
                    startAt: detailedPost?.startAt,
                    comment: detailedPost?.comment,
                    subjectId: detailedPost?.subject,
                    studentsCapacity: detailedPost?.studentsCapacity,
                    tutorsCapacity: detailedPost?.tutorsCapacity,
                    campus: detailedPost?.room.campus,
                },
            })
        } else if (
            post?.studentsIds?.includes(userData._id) ||
            post?.tutorsIds?.includes(userData._id)
        ) {
            setState({
                ...state,
                loading: false,
            })
            setSubscribtionState({
                ...subscribtionState,
                isUserRegistered: true,
            })
        } else setState({ ...state, loading: false })
    }, [post])

    useEffect(() => {
        if (studentsFetched) {
            let temp_student_array = []

            studentsList?.data.map((student) =>
                temp_student_array.push({
                    lastName: student.lastName,
                    firstName: student.firstName,
                    email: student.email,
                    year: student.year,
                    department: student.department,
                })
            )
            //we set the loading to false as it's the last thing to do (when the user is the author)
            //in order to show the post Details
            setState({
                ...state,
                loading: false,
            })
            setStudentListState({
                ...studentListState,
                studentsList: temp_student_array,
            })
        }

        studentsFetchError &&
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-STUDENTS_LIST]"
            )
    }, [studentsFetched, studentsFetchError])

    useEffect(() => {
        if (!authState.loading && authState.isAuthenticated) {
            setState({ ...state, render: true })
        } else if (!authState.loading && !authState.isAuthenticated) {
            return <Redirect to="/" />
        }
    }, [authState])

    useEffect(() => {
        console.log('zebi :', state)
    }, [state])
    //we wait 2 seconds till the post snackbar informs that the post was deleted
    if (state.redirect) setTimeout(() => (window.location = '/profil'), 2000)
    if (redirect) return <Redirect to="/posts" />

    return state.render ? (
        <Grid
            container
            direction="column"
            className={classes.root}
            style={
                isMobile
                    ? {
                          height: 'auto',
                      }
                    : {}
            }
            justify="space-evenly"
        >
            {!state.loading ? (
                <Fragment>
                    <Grid container justify="space-evenly">
                        <Typography
                            variant={isMobile ? 'h4' : 'h2'}
                            align="center"
                        >
                            Annonce - {post_id}
                        </Typography>

                        {post?.type == 'tuteur' ? (
                            !subscribtionState.isAuthor ? (
                                subscribtionState.isUserRegistered ? (
                                    //the author ( for a tutor post ) can't unsubsribe/subscribe from his one post !
                                    <Button
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        onClick={() =>
                                            unsubscribeFromPost(
                                                setSubscribtionState,
                                                subscribtionState,
                                                post,
                                                userData._id,
                                                dispatchApiData
                                            )
                                        }
                                    >
                                        Se désinscrire
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        onClick={() =>
                                            setSubscribtionState({
                                                ...subscribtionState,
                                                openDialogSelectRole: true,
                                            })
                                        }
                                    >
                                        S'inscire
                                    </Button>
                                )
                            ) : null
                        ) : (
                            <Button
                                variant="contained"
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
                                            value: post.campus,
                                        },
                                    })
                                    dispatchPostInfo({
                                        type: 'CONTENT',
                                        payload: {
                                            name: 'subjectId',
                                            value: post.subject,
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
                        )}
                    </Grid>
                    <Divider variant="middle" />
                    <Grid container direction={isMobile && "column"}>
                        <Grid
                            item
                            className={classes.infoGrid}
                            style={isMobile ? { flex: 1,
                            maxWidth:"100%" } : {}}
                        >
                            <Card className={classes.card}>
                                <Grid
                                    container
                                    direction="column"
                                    spacing={isMobile && 4}
                                    justify={!isMobile && 'space-evenly'}
                                    style={
                                        !isMobile
                                            ? {
                                                  padding: '5%',
                                                  minHeight: 500,
                                                  minWidth: 450,
                                                  fontSize: '1.5rem',
                                              }
                                            : { padding: '5%' }
                                    }
                                >
                                    <Grid item>
                                        <Typography variant="h2" align="center">
                                            Détails
                                        </Typography>
                                        <Divider variant="middle" />
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        //justify="center"
                                    >
                                        <SchoolIcon className={classes.icon} />
                                        <strong>Auteur</strong> :{' '}
                                        {post?.creator.firstName
                                            .charAt(0)
                                            .toUpperCase() +
                                            post?.creator.firstName.slice(1)}
                                        {` ${post?.creator.lastName.toUpperCase()}`}{' '}
                                        (
                                        <a
                                            href={`mailto:${post?.creator.email}?subject=Tutor'insa`}
                                        >
                                            {post?.creator.email}
                                        </a>
                                        )
                                    </Grid>
                                    {post?.type == 'eleve' && (
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            //justify="center"
                                        >
                                            <LocationCityIcon
                                                className={classes.icon}
                                            />
                                            <strong>Campus</strong> :{' '}
                                            {post.campus}
                                        </Grid>
                                    )}
                                    {post?.type == 'tuteur' && (
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            //justify="center"
                                        >
                                            <RoomIcon
                                                className={classes.icon}
                                            />
                                            <strong>Salle</strong> :{' '}
                                            {post?.room.name} (
                                            {post?.room.campus})
                                        </Grid>
                                    )}
                                    {post?.type == 'tuteur' && (
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            //justify="center"
                                        >
                                            <EventIcon
                                                className={classes.icon}
                                            />
                                            <strong>Date</strong> :{' '}
                                            {formatDate(post?.startAt)}
                                        </Grid>
                                    )}
                                    {post?.type == 'tuteur' && (
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            //justify="center"
                                        >
                                            <ScheduleIcon
                                                className={classes.icon}
                                            />
                                            <strong>Durée</strong> :{' '}
                                            {formatDuration(post?.duration)}
                                        </Grid>
                                    )}
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        //justify="center"
                                    >
                                        <AddCircleIcon
                                            className={classes.icon}
                                        />
                                        <strong>Crée le</strong> :{' '}
                                        {formatDate(post?.createdAt)}
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        //justify="center"
                                    >
                                        <EditIcon className={classes.icon} />
                                        <strong>Modifié le</strong>:{' '}
                                        {formatDate(post?.updatedAt)}
                                    </Grid>
                                </Grid>

                                <CardActions>
                                    <Grid container justify="space-evenly">
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={deletePost}
                                                disabled={
                                                    !subscribtionState.isAuthor
                                                }
                                            >
                                                Supprimer
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={toggleEditPost}
                                                disabled={
                                                    !subscribtionState.isAuthor
                                                }
                                            >
                                                Modifier
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid
                            item
                            className={classes.commentaryBox}
                            container
                            alignContent="center"
                            direction="column"
                            spacing={2}
                                style={isMobile ? {
                                    flex: 1,
                                    maxWidth:"100%"
                                } : {}}
                        >
                            <Card className={classes.card}>
                                <Typography variant="h2" align="center">
                                    Matière : {post?.subject?.name}
                                </Typography>

                                <CardContent>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="space-evenly"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Divider variant="middle" />
                                        </Grid>
                                        <Grid item align="center">
                                            {post?.comment}
                                        </Grid>
                                        <Grid item>
                                            <Divider variant="middle" />
                                        </Grid>
                                        {post?.type == 'tuteur' && (
                                            <Grid
                                                item
                                                container
                                                direction="column"
                                                align="center"
                                                justify="space-evenly"
                                            >
                                                <Grid item>
                                                    Nombre d'étudiants inscrits
                                                    : {post?.studentsIds.length}{' '}
                                                    / {post?.studentsCapacity}
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={
                                                            post.studentsIds
                                                                .length *
                                                            (100 /
                                                                post?.studentsCapacity)
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    Nombre de tuteurs :{' '}
                                                    {post?.tutorsIds.length} /{' '}
                                                    {post?.tutorsCapacity}
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={
                                                            post?.tutors
                                                                .length *
                                                            (100 /
                                                                post?.tutorsCapacity)
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                        {post?.type == 'tuteur' && (
                                            <Grid item>
                                                <Divider variant="middle" />
                                            </Grid>
                                        )}

                                        {post?.type == 'tuteur' && (
                                            <Grid
                                                item
                                                container
                                                direction="column"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <Typography variant="h5">
                                                        Liste des tuteurs :
                                                    </Typography>
                                                </Grid>

                                                <Grid
                                                    item
                                                    container
                                                    spacing={2}
                                                    direction="row"
                                                    style={{
                                                        overflow: 'scroll',
                                                        maxHeight: 200,
                                                    }}
                                                >
                                                    {post?.tutors?.map(
                                                        (tuteurProfil) => (
                                                            <Grid item xs>
                                                                <Card
                                                                    style={{
                                                                        border:
                                                                            '2px ridge black',
                                                                    }}
                                                                >
                                                                    <CardContent
                                                                        style={{
                                                                            maxWidth: 300,
                                                                        }}
                                                                    >
                                                                        <Typography variant="h5">
                                                                            {
                                                                                tuteurProfil.firstName
                                                                            }{' '}
                                                                            {tuteurProfil.lastName.toUpperCase()}{' '}
                                                                            (
                                                                            <a
                                                                                href={`mailto:${tuteurProfil.email}?subject=Tutor'insa`}
                                                                            >
                                                                                {
                                                                                    post
                                                                                        ?.creator
                                                                                        .email
                                                                                }
                                                                            </a>
                                                                            )
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="h6"
                                                                            component="h2"
                                                                            color="textSecondary"
                                                                            gutterBottom
                                                                        >
                                                                            {
                                                                                tuteurProfil
                                                                                    .year
                                                                                    .name
                                                                            }
                                                                            ,{' '}
                                                                            {
                                                                                tuteurProfil
                                                                                    .department
                                                                                    .name
                                                                            }
                                                                            <br />
                                                                            Nombre
                                                                            de
                                                                            post(s)
                                                                            :{' '}
                                                                            {
                                                                                tuteurProfil
                                                                                    .createdPostsIds
                                                                                    .length
                                                                            }
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                        )
                                                    )}
                                                </Grid>
                                            </Grid>
                                        )}

                                        {subscribtionState.isAuthor &&
                                            post?.type == 'tuteur' && (
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        endIcon={
                                                            <PeopleAltIcon />
                                                        }
                                                        onClick={() =>
                                                            setStudentListState(
                                                                {
                                                                    ...studentListState,
                                                                    toggleStudentList: true,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        Liste des étudiants
                                                    </Button>
                                                    <Popover
                                                        style={{
                                                            padding: '2%',
                                                        }}
                                                        open={
                                                            studentListState.toggleStudentList
                                                        }
                                                        onClose={() =>
                                                            setStudentListState(
                                                                {
                                                                    ...studentListState,
                                                                    toggleStudentList: false,
                                                                }
                                                            )
                                                        }
                                                        anchorOrigin={{
                                                            vertical: 'center',
                                                            horizontal:
                                                                'center',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'center',
                                                            horizontal:
                                                                'center',
                                                        }}
                                                    >
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            justify="space-evenly"
                                                            style={{
                                                                padding: '5%',
                                                            }}
                                                        >
                                                            <Typography
                                                                gutterBottom
                                                                variant="h3"
                                                            >
                                                                Liste des
                                                                étudiants
                                                                inscrits
                                                            </Typography>

                                                            <TableContainer
                                                                component={
                                                                    Paper
                                                                }
                                                                style={{
                                                                    border:
                                                                        '1px solid black',
                                                                }}
                                                            >
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell align="center">
                                                                                Nom
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                Prénom
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                Email
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                Année
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                Spécialité
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {studentListState.studentsList?.map(
                                                                            (
                                                                                row,
                                                                                index
                                                                            ) => (
                                                                                <TableRow
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {' '}
                                                                                    <TableCell
                                                                                        align="center"
                                                                                        component="th"
                                                                                        scope="row"
                                                                                    >
                                                                                        {
                                                                                            row.lastName
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="center"
                                                                                        component="th"
                                                                                        scope="row"
                                                                                    >
                                                                                        {
                                                                                            row.firstName
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell align="center">
                                                                                        {
                                                                                            row.email
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell align="center">
                                                                                        {
                                                                                            row
                                                                                                .year
                                                                                                .name
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell align="center">
                                                                                        {
                                                                                            row
                                                                                                .department
                                                                                                .name
                                                                                        }
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>
                                                    </Popover>
                                                </Grid>
                                            )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <EditPost
                        setPost={setPost}
                        state={state}
                        open={state.toggleModif}
                        userPost={post}
                        setState={setState}
                    />
                    <SubscriptionDialog
                        setSubscribtionState={setSubscribtionState}
                        subscribtionState={subscribtionState}
                        post={post}
                        userData={userData}
                    />
                    <SubscribtionNotif
                        severity="success"
                        state={subscribtionState}
                        flag={'successSubscribe'}
                        setState={setSubscribtionState}
                        creator={post?.creator}
                    />
                    <SubscribtionNotif
                        severity="info"
                        state={subscribtionState}
                        flag={'successUnSubscribe'}
                        setState={setSubscribtionState}
                        creator={post?.creator}
                    />
                    <PostStateNotification
                        severity="error"
                        state={state}
                        flag={'redirect'}
                        setState={setState}
                        text="L'annonce a bien été supprimée ! Vous allez être redirigée ..."
                    />
                    <PostStateNotification
                        flag={'postEditedSuccessfuly'}
                        state={state}
                        setState={setState}
                        severity="success"
                        text="L'annonce a bien été modifiée !"
                    />
                </Fragment>
            ) : (
                <Grid
                    container
                    direction="column"
                    alignContent="center"
                    justify="center"
                >
                    <Backdrop className={classes.backdrop} open={state.loading}>
                        <TutoLoader />
                    </Backdrop>
                </Grid>
            )}
        </Grid>
    ) : (
        <Grid
            container
            direction="column"
            alignContent="center"
            justify="center"
        >
            <Backdrop className={classes.backdrop} open={!state.render}>
                <TutoLoader />
            </Backdrop>
        </Grid>
    )
}
