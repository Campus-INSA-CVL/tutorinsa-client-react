import React, { useContext, useState, useEffect } from 'react'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, TimePicker } from '@material-ui/pickers'
import {
    Grid,
    InputLabel,
    Typography,
    FormHelperText,
    TextField,
    FormControl,
} from '@material-ui/core'
import { floor } from 'mathjs'
import formatDuration from '../../lib/formatDuration'
import client from '../../vendors/feather'
import moment from 'moment'
import { motion } from 'framer-motion'
import { containerVariants } from '../../styles/componentStyle/formTransition'

const DurationForm = (props) => {
    //state handling duration and the restriction about it

    const roomStartHour = moment(new Date(props.contextState.roomId.startAt))
        .subtract('60', 'm')
        .toDate() //we retrieve one hour as it's GMT+1.00
    const roomEndHour = moment(roomStartHour)
        .add(props.contextState.roomId.duration, 'm')
        .toDate()

    const [selectedValue, setValue] = useState({
        begin: roomStartHour,
        end: roomEndHour,
    })

    const [state, setState] = useState({
        errorText: '',
        firstConnexion: false,
    })

    const setDuration = (e, name) => {
        setValue({ ...selectedValue, [name]: e })
    }

    useEffect(() => {
        props.setState({ ...props.state, isAbleToGoNextSteps: false })
    }, [])
    
    const durationValidation = () => {
        let error = false
        let errorText = ''
        const calculatedDuration = floor(
            (selectedValue.end - selectedValue.begin) / (1000 * 60)
        )
        console.log(calculatedDuration)
        if (selectedValue.begin > selectedValue.end) {
            error = true
            errorText +=
                "L'heure de début ne peut être supérieur à celle de fin de séance ! \n"
        }

        if (calculatedDuration < 30) {
            error = true
            errorText +=
                'La durée de la séance ne peut être inférieur à la durée minimale autorisée ! \n'
        }

        if (calculatedDuration > props.contextState.roomId.duration) {
            error = true
            errorText +=
                'La durée de la séance ne peut être supérieur à la durée maximale autorisée ! \n'
        }

        if (selectedValue.begin > moment(roomEndHour).subtract('30', 'm')) {
            error = true
            errorText +=
                "Comme la durée minimal autorisée est une demi heure, on ne peut séléctionenr une heure de début de séance à \
                moins d'une demi heure de l'heure de fin de la salle ! \n"
        }
        setState({ ...state, errorText: errorText })

        return error
    }

    // former func to fetch the data, considered the fact that in one space-time context, there was more than one post
    /*const fetchData = async (key) => {
        //we will work with only one entry of the calendar or 0 if there is nothing planned on that day
        client
            .service('calendars')
            .find({
                query:{
                startAt : props.contextState.date,
                room : props.contextState.room
            }
            TODO !
            })
            .then((res) => {
                const slot = res.data.filter(
                    (entry) =>
                        entry.room._id == props.contextState.room._id &&
                        entry.startAt == props.contextState.date
                )[0] //this is the space-time context of the tutorat session

                if (slot != undefined)
                    //if there is already some slots in the selected date/room combo
                    setValue({
                        ...selectedValue,
                        slots: slot.slots,
                    })
            })
            .res((err) => console.log(err))
    }*/

    useEffect(() => {
        console.log(selectedValue, state)

        if (selectedValue.begin != null && selectedValue.end != null) {
            if (durationValidation())
                //if there is an error of validation, we can't go to the next step
                props.dispatchMethod({
                    type: 'DURATION',
                    payload: { duration: 0 },
                })
            else {
                //a difference of date() is given in ms so we convert it to min
                const calculatedDuration = floor(
                    (selectedValue.end - selectedValue.begin) / (1000 * 60)
                )
                props.dispatchMethod({
                    type: 'DURATION',
                    payload: { duration: calculatedDuration },
                })
                // we thus need to add the hours and the minutes to the date (we choosed it
                // with the start duration of the post ! )
                props.dispatchMethod({
                    type: 'DATE',
                    payload: {
                        startAt: moment(props.contextState.startAt)
                            .set({
                                hour: moment(selectedValue.begin)
                                    .add('2', 'h')

                                    .toDate()
                                    .getHours(),
                                minute: moment(selectedValue.begin)
                                    .add('2', 'h')
                                    .toDate()
                                    .getMinutes(),
                            })
                            .toDate()
                            .toISOString(),
                    },
                })
            }
        }
    }, [selectedValue])

    return (
        <motion.div
            style={{
                background: 'inherit',
            }}
            initial={{ x: '-300px', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: '-300px', opacity: 0 }}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography component="h6" color="textSecondary">
                        Durée minimum : 30 min <br />
                        Durée maximum :{' '}
                        {formatDuration(props.contextState.roomId.duration)}
                    </Typography>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item xs>
                        <TimePicker
                            minTime={
                                new Date(
                                    0,
                                    0,
                                    0,
                                    roomStartHour.getHours(),
                                    roomStartHour.getMinutes() - 1
                                )
                            }
                            maxTime={
                                new Date(
                                    0,
                                    0,
                                    0,
                                    roomEndHour.getHours(),
                                    roomEndHour.getMinutes() + 1
                                )
                            }
                            renderInput={(props) => <TextField {...props} />}
                            label="Début de la séance"
                            ampm={false}
                            value={selectedValue.begin}
                            error={false}
                            onChange={(e) => setDuration(e, 'begin')}
                            /*shouldDisableTime={(timeValue, clockType) => {
                            if (clockType === 'hours' && timeValue % 2) {
                                return true
                            }
                        }}*/
                        />
                    </Grid>
                    <Grid item xs>
                        <TimePicker
                            renderInput={(props) => <TextField {...props} />}
                            minTime={
                                new Date(
                                    0,
                                    0,
                                    0,
                                    moment(new Date(selectedValue.begin)) // we had 30min as it's the minimal time available for a session
                                        .add(30, 'm')
                                        .toDate()
                                        .getHours(),
                                    moment(new Date(selectedValue.begin))
                                        .add(30, 'm')
                                        .toDate()
                                        .getMinutes() - 1
                                )
                            }
                            maxTime={
                                new Date(
                                    0,
                                    0,
                                    0,
                                    roomEndHour.getHours(),
                                    roomEndHour.getMinutes() + 1
                                )
                            }
                            label="Fin de la séance"
                            error={state.errorText != '' && true}
                            clearable
                            ampm={false}
                            value={selectedValue.end}
                            onChange={(e) => setDuration(e, 'end')}
                            error={false}
                        />
                    </Grid>
                </Grid>

                <Grid item>
                    <FormHelperText style={{ color: 'red' }}>
                        {state.errorText}
                    </FormHelperText>
                </Grid>
            </Grid>
        </motion.div>
    )
}

export default DurationForm
