import React, { useState, useContext, useEffect } from 'react'
import {
    TextField,
    Card,
    CardHeader,
    CardContent,
    Select,
    FormControl,
    InputLabel,
    Input,
    MenuItem,
    Chip,
    Button,
    CardActions,
    Grid,
    Slider,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Typography,
} from '@material-ui/core/'
import useStyles from '../../styles/containerStyle/postsStyle'
import SchoolIcon from '@material-ui/icons/School'
import { DateTimePicker } from '@material-ui/pickers'
import { round } from 'mathjs'
import { ApiContext } from '../../store/contexts/api/apiContext'
import client from '../../vendors/feather'
import fetchData from '../../lib/fetchData'
import { ThemeContext } from '../../store/contexts/themes/themeContext'

export default function SortPanel() {
    const classes = useStyles()
    const { apiState, dispatchApiData } = useContext(ApiContext)

    const [request, setRequest] = useState({})
    const [requestToCommit, setCommitedRequest] = useState({})
    const { themePreference } = useContext(ThemeContext)

    const submitRequest = () => {
        //as we re fetch some post, we mark the fact that a filter request is made
        // from another comp and we give the query to the post
        dispatchApiData({
            type: 'FILTER_REQUEST',
            payload: requestToCommit,
        })
        dispatchApiData({ type: 'SORTING_REQUEST_MADE' })
    }

    const marks = []
    for (let i = 0; i <= 300; i += 60) {
        let hour = round(i / 60)
        marks.push({
            value: i,
            label: `${hour} h `,
        })
    }

    useEffect(() => {
        console.log(requestToCommit)
    }, [requestToCommit])

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h4">
                    Chercher une annonce :
                </Typography>{' '}
                <br />
                <br />
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    spacing={2}
                >
                    <Grid item className={classes.itemSpace}>
                        <InputLabel id="mutiple-chip-label">
                            {' '}
                            Choix des matières{' '}
                        </InputLabel>
                        <Select
                            name="tags"
                            labelId="mutiple-chip-label"
                            fullWidth
                            multiple
                            value={request.tags || []}
                            onChange={(e) => {
                                setRequest({
                                    ...request,
                                    tags: e.target.value,
                                }),
                                    setCommitedRequest({
                                        ...requestToCommit,
                                        subjectId: {
                                            $in: e.target.value.map(
                                                (subject) => subject._id
                                            ),
                                        },
                                    })
                            }}
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
                                    ))}{' '}
                                </div>
                            )}
                        >
                            {' '}
                            {apiState.subjectsList.map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    {' '}
                                    {tag.name}{' '}
                                </MenuItem>
                            ))}{' '}
                        </Select>{' '}
                    </Grid>

                    <Grid item className={classes.itemSpace}>
                        <InputLabel id="date-label">
                            {' '}
                            Choix de la date{' '}
                        </InputLabel>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            name="date"
                            variant="inline"
                            ampm={false}
                            labelId="date-label"
                            value={request.startAt || new Date()}
                            onChange={(e) => {
                                setRequest({ ...request, startAt: e }),
                                    setCommitedRequest({
                                        ...requestToCommit,
                                        startAt: e,
                                    })
                            }}
                            disablePast
                            format="dd/MM/yyyy HH:mm"
                            shouldDisableTime={(timeValue, clockType) => {
                                if (clockType === 'day' && timeValue % 2) {
                                    console.log(timeValue)
                                    return true
                                }
                            }}
                        />
                    </Grid>

                    <Grid item className={classes.itemSpace}>
                        <InputLabel id="duration-label">
                            {' '}
                            Choix de la durée (en minutes)
                        </InputLabel>
                        <Slider
                            name="duration"
                            labelId="duration-label"
                            value={request.duration || [30, 300]}
                            step={30}
                            min={30}
                            max={300}
                            marks={marks}
                            valueLabelDisplay="auto"
                            onChange={(e, value) => {
                                setRequest({ ...request, duration: value }),
                                    setCommitedRequest({
                                        ...requestToCommit,
                                        duration: {
                                            $lte: value[1],
                                            $gte: value[0],
                                        },
                                    })
                            }}
                        />
                    </Grid>

                    <Grid item className={classes.itemSpace}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                {' '}
                                Profil recherché{' '}
                            </FormLabel>
                            <RadioGroup
                                name="type"
                                value={request.type || ''}
                                onChange={(e) => {
                                    setRequest({
                                        ...request,
                                        type: e.target.value,
                                    }),
                                        setCommitedRequest({
                                            ...requestToCommit,
                                            type: e.target.value,
                                        })
                                }}
                            >
                                <FormControlLabel
                                    value="tuteur"
                                    control={<Radio />}
                                    label="Tuteur"
                                />
                                <FormControlLabel
                                    value="eleve"
                                    control={<Radio />}
                                    label="Etudiant"
                                />
                            </RadioGroup>{' '}
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            onClick={submitRequest}
                        >
                            Rechercher
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            size="medium"
                            color="primary"
                            variant="outlined"
                            disabled={!apiState.requestMade}
                            onClick={() => {
                                setRequest({})
                                setCommitedRequest({})
                                dispatchApiData({
                                    type: 'RESET_REQUEST_MADE',
                                })
                            }}
                        >
                            Réinitialiser
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>{' '}
        </Card>
    )
}
