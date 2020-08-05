import React, { Fragment, useState, useEffect, useContext } from 'react'
import client from '../../vendors/feather'
import {
    InputLabel,
    Select,
    MenuItem,
    Divider,
    FormLabel,
    Grid,
    TextareaAutosize,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Slider,
    TextField,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ApiContext } from '../../store/contexts/api/apiContext'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'

const ContentForm = (props) => {
    //no matter for what purpose is this component called, we need the static data
    const { apiState, dispatchApiData } = useContext(ApiContext)

    const setContent = (e) => {
        props.dispatchMethod({
            type: 'CONTENT',
            payload: {
                name: [e.target.name],
                value: e.target.value,
            },
        })
    }

    useEffect(() => {
        props.setState({ ...props.state, isAbleToGoNextSteps: false })
    }, [])

    return (
        <Grid container direction="column" justify="space-evenly" spacing={2}>
            <Grid item direction="column">
                <TextField
                    error={props.postEditInfo?.comment?.length > 440}
                    multiline
                    helperText={
                        props.postEditInfo?.comment?.length > 440
                            ? 'Le commentaire ne peut dépasser 440 caractères !'
                            : ''
                    }
                    placeholder="Commentaire ..."
                    label="Commentaire"
                    value={props.contextState.comment}
                    name="comment"
                    onChange={(e) =>
                        props.dispatchMethod({
                            type: 'CONTENT',
                            payload: {
                                name: [e.target.name],
                                value: e.target.value,
                            },
                        })
                    }
                    variant="outlined"
                />
            </Grid>

            <Grid item>
                <FormControl fullWidth>
                    <Autocomplete
                        label="Matière"
                        value={props.contextState?.subjectId}
                        options={apiState.subjectsList}
                        getOptionLabel={(option) => option.name}
                        name="subject"
                        onChange={(e, subject) => {
                            props.dispatchMethod({
                                type: 'CONTENT',
                                payload: {
                                    name: 'subjectId',
                                    value: subject,
                                },
                            })
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Matière"
                                variant="outlined"
                            />
                        )}
                    />
                </FormControl>
            </Grid>

            {props.userPost.type == 'tuteur' && (
                <Grid item>
                    <Typography>
                        Limite d'étudiants inscrits : (minimum 5 et maximum 20)
                    </Typography>
                    <Slider
                        onChange={(e, value) => {
                            props.dispatchMethod({
                                type: 'CONTENT',
                                payload: {
                                    name: 'studentsCapacity',
                                    value: value,
                                },
                            })
                        }}
                        name="studentsCapacity"
                        value={props.contextState.studentsCapacity || 5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={5}
                        max={20}
                    />
                </Grid>
            )}

            {props.userPost.type == 'tuteur' && (
                <Grid item>
                    <Typography>
                        Limite de tuteurs inscrits : (minimum 1 et maximum 5)
                    </Typography>
                    <Slider
                        onChange={(e, value) =>
                            props.dispatchMethod({
                                type: 'CONTENT',
                                payload: {
                                    name: 'tutorsCapacity',
                                    value: value,
                                },
                            })
                        }
                        value={props.contextState.tutorsCapacity || 1}
                        name="tutorsCapacity"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={5}
                    />
                </Grid>
            )}

            {props.userPost.type == 'tuteur' && (
                <Grid item justify="center">
                    Total :{' '}
                    {props.contextState.studentsCapacity +
                        props.contextState.tutorsCapacity}
                </Grid>
            )}
        </Grid>
    )
}

export default ContentForm
