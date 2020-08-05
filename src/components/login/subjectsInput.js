import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    Chip,
    Input,
    FormControl,
    FormHelperText,
    CircularProgress,
} from '@material-ui/core'
import useStyles from '../../styles/containerStyle/signupStyle'
import '../../styles/css/invalidForm.css'
import SchoolIcon from '@material-ui/icons/School'
import { UserCrContext } from '../../store/contexts/user/createUserContext'
import { ApiContext } from '../../store/contexts/api/apiContext'

export default function SubjectInput(props) {
    const classes = useStyles()
    const [state, setState] = useState({
        PrefSubjectError: '',
        DifficultSubjectError: '',
        yearError: '',
        departmentError: '',
        accountError: '',
    })

    const { apiState } = useContext(ApiContext)
    console.log(apiState)
    const { userCrProfil, dispatchUserCr } = useContext(UserCrContext)

    const settings = [
        {
            label: 'Année',
            value: userCrProfil.year,
            options:
                apiState.yearsList.length == 0
                    ? undefined
                    : apiState.yearsList.map((year) => {
                          return year
                      }),
            name: 'year',
            errorText: state.yearError,
        },
        {
            label: 'Spécialité',
            value: userCrProfil.department,
            options:
                apiState.departmentsList.length == 0
                    ? undefined
                    : apiState.departmentsList.map((department) => {
                          return department
                      }),
            name: 'department',
            errorText: state.departmentError,
        },
        {
            label: 'Type de compte',
            value: userCrProfil.permissions,
            options: [
                { name: 'Tuteur' },
                { name: 'Etudiant' },
                { name: 'Les deux' },
            ],
            name: 'permissions',
            errorText: state.accountError,
        },
    ]

    const validate = () => {
        let error = false
        const errors = {
            PrefSubjectError: '',
            DifficultSubjectError: '',
            yearError: '',
            departmentError: '',
            accountError: '',
        }

        if (userCrProfil.favoriteSubjects.length == 0) {
            error = true
            errors.PrefSubjectError =
                'Veuillez séléctionner une des options ci-dessous !'
        }
        if (userCrProfil.difficultSubjects.length == 0) {
            error = true
            errors.DifficultSubjectError =
                'Veuillez séléctionner une des options ci-dessous !'
        }
        if (userCrProfil.year.length == 0) {
            error = true
            errors.yearError = 'Veuillez séléctionner une année !'
        }
        if (userCrProfil.department.length == 0) {
            error = true
            errors.departmentError = 'Veuillez séléctionner une spécialité !'
        }
        if (userCrProfil.permissions.length == 0) {
            error = true
            errors.accountError = 'Veuillez séléctionner un type de profil !'
        }

        setState({ ...state, ...errors })

        return error
    }

    const handleChange = (e) => {
        //setState({ ...state, [e.target.name]: e.target.value })
        dispatchUserCr({
            type: 'SUBJECT_INPUT',
            payload: {
                name: [e.target.name],
                value: e.target.value,
            },
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(state)
        if (!validate()) {
            //validate returns boolean, true means you're good to proceed
            props.handleStep()
        }
    }

    useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} className={classes.formControl}>
                    <InputLabel id="mutiple-chip-label-prefered">
                        Matières préférées
                    </InputLabel>

                    <FormControl
                        fullWidth
                        className={
                            state.PrefSubjectError == '' ? null : 'inputField'
                        }
                        error={state.PrefSubjectError != ''}
                    >
                        <Select
                            labelId="mutiple-chip-label-prefered"
                            fullWidth
                            multiple
                            value={userCrProfil.favoriteSubjects}
                            name="favoriteSubjects"
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value.name}
                                            className={classes.chip}
                                            icon={<SchoolIcon />}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            {apiState.subjectsList.length == 0 ? (
                                <Grid container justify="center">
                                    <CircularProgress />
                                </Grid>
                            ) : (
                                apiState.subjectsList.map((subject) => (
                                    <MenuItem
                                        key={subject._id}
                                        value={subject} //we need the object to get the IDs
                                    >
                                        {subject.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>

                        <FormHelperText>
                            {state.PrefSubjectError}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid xs={12} className={classes.formControl}>
                    <InputLabel id="mutiple-chip-label-hated">
                        Matières en difficultés
                    </InputLabel>
                    <FormControl
                        fullWidth
                        className={
                            state.DifficultSubjectError == ''
                                ? null
                                : 'inputField'
                        }
                        error={state.DifficultSubjectError != ''}
                    >
                        <Select
                            labelId="mutiple-chip-label-hated"
                            fullWidth
                            multiple
                            value={userCrProfil.difficultSubjects}
                            name="difficultSubjects"
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value.name}
                                            className={classes.chip}
                                            icon={<SchoolIcon />}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            {apiState.subjectsList.length == 0 ? (
                                <Grid container justify="center">
                                    <CircularProgress />
                                </Grid>
                            ) : (
                                apiState.subjectsList.map((subject) => (
                                    <MenuItem
                                        key={subject._id}
                                        value={subject} //we need the object to get the IDs
                                    >
                                        {subject.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>

                        <FormHelperText>
                            {state.DifficultSubjectError}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {settings.map((setting) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.formControl}
                        >
                            <InputLabel>{setting.label}</InputLabel>
                            <FormControl
                                fullWidth
                                className={
                                    setting.errorText == ''
                                        ? null
                                        : 'inputField'
                                }
                                error={setting.errorText == '' ? false : true}
                            >
                                <Select
                                    fullWidth
                                    name={setting.name}
                                    onChange={handleChange}
                                    value={setting.value}
                                >
                                    {typeof setting.options == 'undefined' ? (
                                        <Grid container justify="center">
                                            <CircularProgress />
                                        </Grid>
                                    ) : (
                                        setting.options.map((option) => {
                                            return (
                                                <MenuItem
                                                    value={
                                                        setting.name ==
                                                        'permissions'
                                                            ? option.name
                                                            : option
                                                    }
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            )
                                        })
                                    )}
                                </Select>
                                <FormHelperText>
                                    {setting.errorText}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    )
                })}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                className={classes.button}
            >
                {'Suivant'}
            </Button>
        </React.Fragment>
    )
}
