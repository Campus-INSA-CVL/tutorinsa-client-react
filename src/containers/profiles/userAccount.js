import React, { Fragment, useState, useContext, useEffect } from 'react'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    CardActions,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    DialogContentText,
    DialogContent,
    Divider,
    Input,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    ExpansionPanelDetails,
    ExpansionPanel,
    ExpansionPanelSummary,
    Backdrop,
    Tabs,
    Tab,
    Switch,
    FormControlLabel,
} from '@material-ui/core'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/profileStyle'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SchoolIcon from '@material-ui/icons/School'
import generalUserTemplate, { postTest } from '../misc/userData'
import Skeleton from '@material-ui/lab/Skeleton'
import MuiAlert from '@material-ui/lab/Alert'
import { Redirect } from 'react-router-dom'
import PreRenderedPost from '../../components/posts/preRenderedPost'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { UserContext } from '../../store/contexts/user/userContext'
import client from '../../vendors/feather'
import formatDate from '../../lib/formatDate'
import { fetchUserPosts, fetchUserSubscribedPosts } from '../../lib/fetchData'
import TutoLoader from '../../components/misc/loader'
import { ApiContext } from '../../store/contexts/api/apiContext'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import { useFind } from 'figbird'
import NightsStayIcon from '@material-ui/icons/NightsStay'
import WbSunnyIcon from '@material-ui/icons/WbSunny'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function UserAccount(props) {
    const classes = useStyles()
    const { authState } = useContext(AuthContext)
    const { userData, dispatchUserData } = useContext(UserContext)
    const { apiState, dispatchApiData } = useContext(ApiContext)
    const { themePreference, dispatchThemeInfo } = useContext(ThemeContext)

    const [open_0, setOpen_0] = useState(false)
    const [open_1, setOpen_1] = useState(false)
    const [open_2, setOpen_2] = useState(false)
    const [open_3, setOpen_3] = useState(false)

    //formated user data

    const [userFormatedData, updateUserData] = useState(generalUserTemplate)
    const [filteredSubscribedData, setFilteredSubscribedData] = useState([])

    //state of the page
    const [state, setState] = useState({
        loading: true,
        firstConnexion: true,
        render: false,
        Prénom: '',
        Nom: '',
        'Adresse email INSA': '',
        'Rôle(s)': '',
        display: 'userPostsData',
    })

    //request state handling the field that needed to be updated, we need a intern state to show the
    // request on the edit field, in order not to modify the actual state displaying the data (userFormatedData)
    const [userUpdated, setUpdate] = useState({
        userInfoClone: generalUserTemplate,
        request: {},
    })

    const accessList = ['eleve', 'tuteur'] //Casl => permission => add Admin :)

    const {
        status: userPostsStatus,
        data: userPostsData,
        isFetching: fetchingUserPost,
    } = useFind('posts', {
        realtime: 'refetch',
        query: {
            $limit: 200,
            creatorId: userData._id,
        },
    })

    const {
        status: userSubscribedPostsStatus,
        data: userSubscribedPostsData,
        isFetching: fetchingSubscibedPost,
    } = useFind('posts', {
        realtime: 'refetch',
        query: {
            $limit: 200,
        },
    })

    const validate = () => {
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let error = false
        const errors = {
            Prénom: '',
            Nom: '',
            'Adresse email INSA': '',
            'Rôle(s)': '',
        }

        if (userUpdated.userInfoClone.Utilisateur?.Prénom?.length == 0) {
            error = true
            errors.Prénom = 'Un prénom doit être rentré !'
        }
        if (userUpdated.userInfoClone.Utilisateur?.Nom?.length == 0) {
            error = true
            errors.Nom = 'Un nom doit être rentré !'
        }
        if (
            userUpdated.userInfoClone.Scolarité['Adresse email INSA'].indexOf(
                '@insa-cvl.fr'
            ) === -1
        ) {
            error = true
            errors['Adresse email INSA'] =
                'L\'adresse mail doit contenir "@insa-cvl.fr" !'
        }
        if (userUpdated.userInfoClone.Scolarité['Rôle(s)'].length == 0) {
            error = true
            errors['Rôle(s)'] = 'Vous devez choisir au moins un rôle !'
        }
        /*if (userUpdated.userInfoClone.password.length == 0) {
            error = true
            errors.passwordError = 'Les mots de passes ne peuvent être vide !'
            errors.passwordVerifError =
                'Les mots de passes ne peuvent être vide !'
        }
        if (userUpdated.userInfoClone.password.length > 0) {
            if (!passwordRegExp.test(userUpdated.userInfoClone.password)) {
                errors.passwordError = 'Le mot de passe doit être valide !'
                error = true
            }
            if (userUpdated.userInfoClone.password != userUpdated.userInfoClone.passwordVerif) {
                errors.passwordVerifError =
                    'Les mots de passes doivent correspondre !'
                error = true
            }
        }*/

        setState({ ...state, ...errors })

        return error
    }

    const formatData = (userData) => {
        //used to re format the Data (update the state that display the data), so we can display it the right way but
        //ALSO reset the request state

        //console.log(userData)
        let formatCreatedDate = formatDate(userData.createdAt)

        let formatUpdateddDate = formatDate(userData.updatedAt)

        let formatedTemplate = {
            Utilisateur: {
                Prénom: userData.firstName,
                Nom: userData.lastName,
                ID: userData._id,
                //Abonnements: userData.subscriptions,
            },
            Scolarité: {
                'Adresse email INSA': userData.email,
                Année: userData.year.name, // we use here the name and not the object for the data display !
                Spécialité: userData.department.name, // At each submit, from the name we can get back the id and submit it to the context !
                'Rôle(s)': userData.permissions,
            },
            'Préfèrence des matières': {
                //'Activer les notifications': null,
                'Matière préférèes': userData.favoriteSubjects.map(
                    (subject) => subject.name
                ),
                'Matière en difficultées': userData.difficultSubjects.map(
                    (subject) => subject.name
                ),
            },
            'A propos du compte': {
                'Date de souscription': formatCreatedDate,
                'Dernière date de modificaton': formatUpdateddDate,
            },

            'Paramètre de la plateforme': {
                Thème: userData.appTheme,
            },
        }

        //displaying data
        updateUserData(formatedTemplate)

        //reseting request state
        setUpdate({ userInfoClone: formatedTemplate, request: {} })

        setState({ ...state, loading: false, firstConnexion: false })
    }

    const handleOpen = (number) => {
        switch (number) {
            case 0:
                setOpen_0(true)
                break
            case 1:
                setOpen_1(true)
                break
            case 2:
                setOpen_2(true)
                break
            case 3:
                setOpen_3(true)
                break
            default:
                null
        }
    }

    const handleClose = (number) => {
        switch (number) {
            case 0:
                setOpen_0(false)
                break
            case 1:
                setOpen_1(false)
                break
            case 2:
                setOpen_2(false)
                break
            case 3:
                setOpen_3(false)
                break
            default:
                null
        }
    }

    const handleChange = (e, keyName) => {
        let fieldCommited // fieldComited equal the field that need to be passed to the API
        let valueCommited = e.target.value //we make a clone of e.target.value to perform some operation
        // on the Année and specialité field as we need to get the right object from the name

        switch (e.target.name) {
            case 'Prénom':
                fieldCommited = 'firstName'
                break
            case 'Nom':
                fieldCommited = 'lastName'
                break
            case 'Adresse email INSA':
                fieldCommited = 'email'
                break
            case 'Année':
                fieldCommited = 'yearId'
                valueCommited = apiState.yearsList.filter(
                    (year) => year.name === e.target.value
                )[0]._id // we get the _id from the name of the year
                break
            case 'Spécialité':
                fieldCommited = 'departmentId'
                valueCommited = apiState.departmentsList.filter(
                    (department) => department.name === e.target.value
                )[0]._id // we get the _id from the name of the department
                break
            case 'Rôle(s)':
                fieldCommited = 'permissions'
                break
            case 'Matière préférèes':
                fieldCommited = 'favoriteSubjectsIds'
                //we select only the IDs
                valueCommited = e.target.value.map(
                    (subjectSelected) =>
                        apiState.subjectsList.filter(
                            (subject) => subjectSelected === subject.name
                        )[0]._id
                )
                break
            case 'Matière en difficultées':
                fieldCommited = 'difficultSubjectsIds'
                valueCommited = e.target.value.map(
                    (subjectSelected) =>
                        apiState.subjectsList.filter(
                            (subject) => subjectSelected === subject.name
                        )[0]._id
                )
                break
        }

        setUpdate({
            ...userUpdated,
            userInfoClone: {
                ...userUpdated.userInfoClone,
                [keyName]: {
                    ...userUpdated.userInfoClone[keyName],
                    [e.target.name]: e.target.value,
                },
            },
            request: {
                ...userUpdated.request,
                [fieldCommited]: valueCommited,
            },
        })
    }

    const submitChange = (number) => {
        //fetch data at each rendering and update a state : dataFetched in order to re-render or not the card
        // with some preloadeder element wraping all the stuff !
        // ne pas oublier formDataFetched !

        if (!validate()) {
            setState({ ...state, loading: true })

            client
                .service('users')
                .patch(userData._id, userUpdated.request)
                .then((res) => {
                    dispatchUserData({ type: 'GET_USER_INFO', payload: res })
                })
                .catch((err) => console.log(err))
            //console.log('submitted : ', userUpdated)
            switch (number) {
                case 0:
                    setOpen_0(false)
                    break
                case 1:
                    setOpen_1(false)
                    break
                case 2:
                    setOpen_2(false)
                    break
                case 3:
                    setOpen_3(false)
                    break
                default:
                    null
            }
        }
    }

    // hook listening to context change for the user
    useEffect(() => {
        if (!state.firstConnexion)
            //as the profil change, we need to refetch the data as he is the auther of his posts
            formatData(userData)
    }, [userData])

    useEffect(() => {
        state.render && state.firstConnexion && formatData(userData)
        console.log('state :', state)
    }, [state])

    useEffect(() => {
        if (userSubscribedPostsStatus == 'success') {
            setFilteredSubscribedData(
                userSubscribedPostsData?.filter(
                    (post) =>
                        post.creatorId != userData._id &&
                        (post.studentsIds?.includes(userData._id) ||
                            post.tutorsIds?.includes(userData._id))
                )
            )
        } else if (userSubscribedPostsStatus == 'error')
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-POST_SUBSCRIBED]"
            )
    }, [userSubscribedPostsStatus, userSubscribedPostsData])

    useEffect(() => {
        console.log('filtered : ',filteredSubscribedData)
    }, [filteredSubscribedData])
    useEffect(() => {
        if (userPostsStatus == 'error')
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-POST_USER]"
            )
    }, [userPostsStatus])

    useEffect(() => {
        if (!authState.loading && authState.isAuthenticated) {
            setState({ ...state, render: true })
        } else if (!authState.loading && !authState.isAuthenticated) {
            return <Redirect to="/" />
        }
    }, [authState])
    //first connexion to the page : fetchData from context APi

    return state.render ? (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.gridGeneral}
        >
            <Grid container direction="row" justify="space-evenly">
                <Grid
                    item
                    xs
                    container
                    direction="column"
                    style={{ margin: '1%' }}
                >
                    <Grid item>
                        <Typography
                            color="#ffffff"
                            variant="h3"
                            align="center"
                            style={{ padding: '1%' }}
                        >
                            Mon Profil
                        </Typography>
                    </Grid>

                    <Grid item container direction="column" spacing={2}>
                        {Object.keys(userFormatedData).map((keyName, index) => {
                            return (
                                <Grid item key={index}>
                                    {!state.loading ? (
                                        <Fragment>
                                            <Dialog
                                                open={
                                                    (index == 0 && open_0) ||
                                                    (index == 1 && open_1) ||
                                                    (index == 2 && open_2) ||
                                                    (index == 3 && open_3)
                                                }
                                                onClose={handleClose}
                                                aria-labelledby="form-dialog-title"
                                            >
                                                <DialogTitle id="form-dialog-title">
                                                    {keyName} - Modifications
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Veuillez rentrez vos
                                                        nouvelles informations !
                                                    </DialogContentText>
                                                    {Object.keys(
                                                        userFormatedData[
                                                            keyName
                                                        ]
                                                    ).map((keyName2, index) => {
                                                        if (
                                                            keyName2 ==
                                                                'Matière préférèes' ||
                                                            keyName2 ==
                                                                'Matière en difficultées'
                                                        ) {
                                                            return (
                                                                <FormControl
                                                                    fullWidth
                                                                    key={index}
                                                                >
                                                                    <InputLabel
                                                                        shrink
                                                                    >
                                                                        {
                                                                            keyName2
                                                                        }
                                                                    </InputLabel>

                                                                    <Select
                                                                        labelId="mutiple-chip-label-prefered"
                                                                        fullWidth
                                                                        multiple
                                                                        name={
                                                                            keyName2
                                                                        }
                                                                        value={
                                                                            userUpdated
                                                                                .userInfoClone[
                                                                                keyName
                                                                            ][
                                                                                keyName2
                                                                            ]
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                keyName
                                                                            )
                                                                        }}
                                                                        displayEmpty
                                                                        input={
                                                                            <Input id="select-multiple-chip" />
                                                                        }
                                                                        renderValue={(
                                                                            selected
                                                                        ) => {
                                                                            return (
                                                                                <div>
                                                                                    {selected.map(
                                                                                        (
                                                                                            value
                                                                                        ) => (
                                                                                            <Chip
                                                                                                key={
                                                                                                    value
                                                                                                }
                                                                                                label={
                                                                                                    value
                                                                                                }
                                                                                                className={
                                                                                                    classes.chip
                                                                                                }
                                                                                                icon={
                                                                                                    <SchoolIcon />
                                                                                                }
                                                                                                /*onDelete={(
                                                                                            data
                                                                                        ) => {
                                                                                            userUpdated.userInfoClone[
                                                                                                keyName
                                                                                            ][
                                                                                                keyName2
                                                                                            ].filter(
                                                                                                (
                                                                                                    subject
                                                                                                ) =>
                                                                                                    subject._id !==
                                                                                                    data._id
                                                                                            )
                                                                                        }}*/
                                                                                            />
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            )
                                                                        }}
                                                                    >
                                                                        {apiState.subjectsList.map(
                                                                            (
                                                                                subject
                                                                            ) => (
                                                                                <MenuItem
                                                                                    key={
                                                                                        subject._id
                                                                                    }
                                                                                    value={
                                                                                        subject.name
                                                                                    } //we need the object to get the IDs
                                                                                >
                                                                                    {
                                                                                        subject.name
                                                                                    }
                                                                                </MenuItem>
                                                                            )
                                                                        )}
                                                                    </Select>
                                                                </FormControl>
                                                            )
                                                        } else if (
                                                            keyName2 ==
                                                            'Rôle(s)'
                                                        ) {
                                                            return (
                                                                <FormControl
                                                                    fullWidth
                                                                    key={index}
                                                                    error={
                                                                        state[
                                                                            'Rôle(s)'
                                                                        ] != ''
                                                                    }
                                                                    helperText={
                                                                        state[
                                                                            'Rôle(s)'
                                                                        ]
                                                                    }
                                                                >
                                                                    <InputLabel
                                                                        shrink
                                                                    >
                                                                        {
                                                                            keyName2
                                                                        }
                                                                    </InputLabel>

                                                                    <Select
                                                                        labelId="mutiple-chip-label-prefered"
                                                                        fullWidth
                                                                        multiple
                                                                        name={
                                                                            keyName2
                                                                        }
                                                                        value={
                                                                            userUpdated
                                                                                .userInfoClone[
                                                                                keyName
                                                                            ][
                                                                                keyName2
                                                                            ]
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                keyName
                                                                            )
                                                                        }}
                                                                        displayEmpty
                                                                        input={
                                                                            <Input id="select-multiple-chip" />
                                                                        }
                                                                        renderValue={(
                                                                            selected
                                                                        ) => (
                                                                            <div>
                                                                                {selected.map(
                                                                                    (
                                                                                        value,
                                                                                        index
                                                                                    ) => (
                                                                                        <Chip
                                                                                            key={
                                                                                                value
                                                                                            }
                                                                                            label={
                                                                                                value
                                                                                            }
                                                                                            className={
                                                                                                classes.chip
                                                                                            }
                                                                                            icon={
                                                                                                <SchoolIcon />
                                                                                            }
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    >
                                                                        {accessList.map(
                                                                            (
                                                                                choice
                                                                            ) => (
                                                                                <MenuItem
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    value={
                                                                                        choice
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        choice
                                                                                    }
                                                                                </MenuItem>
                                                                            )
                                                                        )}
                                                                    </Select>
                                                                </FormControl>
                                                            )
                                                        } else if (
                                                            keyName2 == 'ID' ||
                                                            keyName2 ==
                                                                'Date de souscription' ||
                                                            keyName2 ==
                                                                'Dernière date de modificaton'
                                                        )
                                                            return null
                                                        else if (
                                                            keyName2 ==
                                                                'Année' ||
                                                            keyName2 ==
                                                                'Spécialité'
                                                        ) {
                                                            return (
                                                                <FormControl
                                                                    fullWidth
                                                                >
                                                                    <InputLabel id="label_select">
                                                                        {
                                                                            keyName2
                                                                        }
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="label_select"
                                                                        fullWidth
                                                                        name={
                                                                            keyName2
                                                                        }
                                                                        value={
                                                                            userUpdated
                                                                                .userInfoClone[
                                                                                keyName
                                                                            ][
                                                                                keyName2
                                                                            ]
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                keyName
                                                                            )
                                                                        }}
                                                                    >
                                                                        {keyName2 ==
                                                                        'Année'
                                                                            ? apiState.yearsList.map(
                                                                                  (
                                                                                      year
                                                                                  ) => {
                                                                                      return (
                                                                                          <MenuItem
                                                                                              key={
                                                                                                  year._id
                                                                                              }
                                                                                              value={
                                                                                                  year.name
                                                                                              }
                                                                                          >
                                                                                              {
                                                                                                  year.name
                                                                                              }
                                                                                          </MenuItem>
                                                                                      )
                                                                                  }
                                                                              )
                                                                            : apiState.departmentsList.map(
                                                                                  (
                                                                                      department
                                                                                  ) => {
                                                                                      return (
                                                                                          <MenuItem
                                                                                              key={
                                                                                                  department._id
                                                                                              }
                                                                                              value={
                                                                                                  department.name
                                                                                              }
                                                                                          >
                                                                                              {
                                                                                                  department.name
                                                                                              }
                                                                                          </MenuItem>
                                                                                      )
                                                                                  }
                                                                              )}
                                                                    </Select>
                                                                </FormControl>
                                                            )
                                                        }
                                                        //for basic text fields
                                                        else
                                                            return (
                                                                <TextField
                                                                    key={index}
                                                                    autoFocus
                                                                    margin="dense"
                                                                    name={
                                                                        keyName2
                                                                    }
                                                                    label={
                                                                        keyName2
                                                                    }
                                                                    defaultValue={
                                                                        userUpdated
                                                                            .userInfoClone[
                                                                            keyName
                                                                        ][
                                                                            keyName2
                                                                        ]
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleChange(
                                                                            e,
                                                                            keyName
                                                                        )
                                                                    }}
                                                                    fullWidth
                                                                    error={
                                                                        state[
                                                                            keyName2
                                                                        ] != ''
                                                                    }
                                                                    helperText={
                                                                        state[
                                                                            keyName2
                                                                        ]
                                                                    }
                                                                />
                                                            )
                                                    })}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        onClick={() =>
                                                            handleClose(index)
                                                        }
                                                        color="primary"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            submitChange(index)
                                                        }
                                                        color="primary"
                                                    >
                                                        Confirmer les
                                                        changements
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={
                                                        <ExpandMoreIcon />
                                                    }
                                                >
                                                    <Typography
                                                        gutterBottom
                                                        variant="h3"
                                                    >
                                                        {keyName}
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Card
                                                        className={classes.card}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Grid
                                                                container
                                                                direction="column"
                                                            >
                                                                {Object.keys(
                                                                    userFormatedData[
                                                                        keyName
                                                                    ]
                                                                ).map(
                                                                    (
                                                                        keyName2,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <Grid
                                                                                item
                                                                                xs
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        keyName2
                                                                                    }
                                                                                </strong>

                                                                                :
                                                                                <Typography>
                                                                                    {(() => {
                                                                                        switch (
                                                                                            keyName2
                                                                                        ) {
                                                                                            case 'Matière préférèes':
                                                                                                return userFormatedData[
                                                                                                    keyName
                                                                                                ][
                                                                                                    keyName2
                                                                                                ].map(
                                                                                                    (
                                                                                                        data
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            <Chip
                                                                                                                icon={
                                                                                                                    <SchoolIcon />
                                                                                                                }
                                                                                                                label={
                                                                                                                    data
                                                                                                                }
                                                                                                            />
                                                                                                        )
                                                                                                    }
                                                                                                )
                                                                                                break

                                                                                            case 'Matière en difficultées':
                                                                                                return userFormatedData[
                                                                                                    keyName
                                                                                                ][
                                                                                                    keyName2
                                                                                                ].map(
                                                                                                    (
                                                                                                        data
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            <Chip
                                                                                                                icon={
                                                                                                                    <SchoolIcon />
                                                                                                                }
                                                                                                                label={
                                                                                                                    data
                                                                                                                }
                                                                                                            />
                                                                                                        )
                                                                                                    }
                                                                                                )
                                                                                                break
                                                                                            case 'Rôle(s)':
                                                                                                return userFormatedData[
                                                                                                    keyName
                                                                                                ][
                                                                                                    keyName2
                                                                                                ].map(
                                                                                                    (
                                                                                                        data
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            <Chip
                                                                                                                icon={
                                                                                                                    <SchoolIcon />
                                                                                                                }
                                                                                                                label={
                                                                                                                    data
                                                                                                                }
                                                                                                            />
                                                                                                        )
                                                                                                    }
                                                                                                )
                                                                                                break
                                                                                            case 'Année':
                                                                                                return userFormatedData[
                                                                                                    keyName
                                                                                                ][
                                                                                                    keyName2
                                                                                                ]

                                                                                                break
                                                                                            case 'Spécialité':
                                                                                                return userFormatedData[
                                                                                                    keyName
                                                                                                ][
                                                                                                    keyName2
                                                                                                ]

                                                                                                break
                                                                                            case 'Thème':
                                                                                                return (
                                                                                                    <Grid
                                                                                                        container
                                                                                                        spacing={
                                                                                                            2
                                                                                                        }
                                                                                                    >
                                                                                                        <FormControlLabel
                                                                                                            control={
                                                                                                                <Switch
                                                                                                                    checked={
                                                                                                                        userData?.appTheme ==
                                                                                                                        'dark'
                                                                                                                    }
                                                                                                                    onChange={() => {
                                                                                                                        //as it's asynchronous, we take the opposite of the desired value
                                                                                                                        if (
                                                                                                                            userData?.appTheme ==
                                                                                                                            'dark'
                                                                                                                        ) {
                                                                                                                            console.log(
                                                                                                                                'zebi'
                                                                                                                            )
                                                                                                                            dispatchThemeInfo(
                                                                                                                                {
                                                                                                                                    type:
                                                                                                                                        'LIGHT_THEME',
                                                                                                                                }
                                                                                                                            )
                                                                                                                            client
                                                                                                                                .service(
                                                                                                                                    'users'
                                                                                                                                )
                                                                                                                                .patch(
                                                                                                                                    userData._id,
                                                                                                                                    {
                                                                                                                                        appTheme:
                                                                                                                                            'light',
                                                                                                                                    }
                                                                                                                                )
                                                                                                                                .then(
                                                                                                                                    (
                                                                                                                                        res
                                                                                                                                    ) => {
                                                                                                                                        dispatchUserData(
                                                                                                                                            {
                                                                                                                                                type:
                                                                                                                                                    'GET_USER_INFO',
                                                                                                                                                payload: res,
                                                                                                                                            }
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                )
                                                                                                                        } else {
                                                                                                                            dispatchThemeInfo(
                                                                                                                                {
                                                                                                                                    type:
                                                                                                                                        'DARK_THEME',
                                                                                                                                }
                                                                                                                            )
                                                                                                                            client
                                                                                                                                .service(
                                                                                                                                    'users'
                                                                                                                                )
                                                                                                                                .patch(
                                                                                                                                    userData._id,
                                                                                                                                    {
                                                                                                                                        appTheme:
                                                                                                                                            'dark',
                                                                                                                                    }
                                                                                                                                )
                                                                                                                                .catch(
                                                                                                                                    (
                                                                                                                                        err
                                                                                                                                    ) =>
                                                                                                                                        console.log(
                                                                                                                                            'regur',
                                                                                                                                            err
                                                                                                                                        )
                                                                                                                                )
                                                                                                                                .then(
                                                                                                                                    (
                                                                                                                                        res
                                                                                                                                    ) => {
                                                                                                                                        dispatchUserData(
                                                                                                                                            {
                                                                                                                                                type:
                                                                                                                                                    'GET_USER_INFO',
                                                                                                                                                payload: res,
                                                                                                                                            }
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                )
                                                                                                                        }
                                                                                                                    }}
                                                                                                                />
                                                                                                            }
                                                                                                        />
                                                                                                        <Typography
                                                                                                            secondaryText
                                                                                                        >
                                                                                                            {userData.appTheme ==
                                                                                                            'dark' ? (
                                                                                                                <NightsStayIcon fontSize="2rem" />
                                                                                                            ) : (
                                                                                                                <WbSunnyIcon fontSize="2rem" />
                                                                                                            )}
                                                                                                        </Typography>
                                                                                                    </Grid>
                                                                                                )
                                                                                                break
                                                                                            default:
                                                                                                return userFormatedData[
                                                                                                    keyName
                                                                                                ][
                                                                                                    keyName2
                                                                                                ]
                                                                                                break
                                                                                        }
                                                                                    })()}
                                                                                </Typography>
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                )}
                                                            </Grid>
                                                        </CardContent>
                                                        <CardActions>
                                                            {keyName ==
                                                                'A propos du compte' ||
                                                            keyName ==
                                                                'Paramètre de la plateforme' ? (
                                                                ''
                                                            ) : (
                                                                <Button
                                                                    size="small"
                                                                    color="primary"
                                                                    onClick={() => {
                                                                        handleOpen(
                                                                            index
                                                                        )
                                                                    }}
                                                                >
                                                                    <EditIcon />
                                                                </Button>
                                                            )}
                                                        </CardActions>
                                                    </Card>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </Fragment>
                                    ) : (
                                        <Skeleton
                                            variant="rect"
                                            width={683}
                                            height={97}
                                        />
                                    )}
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="column"
                    align="center"
                    item
                    xs
                    style={{ margin: '1%' }}
                >
                    <Tabs
                        style={{ padding: '1%' }}
                        value={state.display}
                        onChange={(e, value) =>
                            setState({ ...state, display: value })
                        }
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab
                            label={
                                <Typography variant="h4">
                                    Mes Annonces
                                </Typography>
                            }
                            value={'userPostsData'}
                        />
                        <Tab
                            label={
                                <Typography variant="h4">
                                    Mes Abonnements
                                </Typography>
                            }
                            value={'userSubscribedPostsData'}
                        />
                    </Tabs>

                    <Grid item container direction="column" spacing={2}>
                        {!fetchingUserPost && !fetchingSubscibedPost ? (
                            state.display == 'userPostsData' ? (
                                userPostsData?.length == 0 ? (
                                    <Typography
                                        align="center"
                                        style={{ width: '100%' }}
                                        variant="h2"
                                    >
                                        Aucune annonce trouvée !
                                    </Typography>
                                ) : (
                                    userPostsData?.map((post, index) => {
                                        return (
                                            <Grid item>
                                                <PreRenderedPost
                                                    userPost={post}
                                                    key={index}
                                                />
                                            </Grid>
                                        )
                                    })
                                )
                            ) : filteredSubscribedData?.length == 0 ? (
                                <Typography
                                    align="center"
                                    style={{ width: '100%' }}
                                    variant="h2"
                                >
                                    Aucune annonce trouvée !
                                </Typography>
                            ) : (
                                filteredSubscribedData?.map((post, index) => {
                                    return (
                                        <Grid item>
                                            <PreRenderedPost
                                                userPost={post}
                                                key={index}
                                            />
                                        </Grid>
                                    )
                                })
                            )
                        ) : (
                            <Grid
                                item
                                container
                                direction="column"
                                spacing={4}
                                style={{ flex: 1 }}
                            >
                                <Grid item>
                                    <Skeleton
                                        variant="rect"
                                        width={'100%'}
                                        height={150}
                                    />
                                </Grid>
                                <Grid item>
                                    <Skeleton
                                        variant="rect"
                                        width={'100%'}
                                        height={150}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </motion.div>
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
