import React, { useState, useEffect, useContext } from 'react'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import client from '../../vendors/feather'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, TimePicker, Day } from '@material-ui/pickers'
import formatDate from '../../lib/formatDate'
import { Grid, InputLabel, TextField } from '@material-ui/core'
import { forEach } from 'mathjs'
import { ApiContext } from '../../store/contexts/api/apiContext'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import moment from 'moment'
import { motion } from 'framer-motion'
import { containerVariants } from '../../styles/componentStyle/formTransition'

const CalendarForm = (props) => {
    //no matter for what purpose is this component called, we need the static data
    const { apiState } = useContext(ApiContext)
    const { themePreference } = useContext(ThemeContext)

    const setDate = (e) => {
        //we need to format the date to the date format of the API !
        //date format used by the API : ISO date-time and we add 2 hour as it's GMT+2
        props.dispatchMethod({
            type: 'DATE',
            payload: {
                startAt: moment(e).add('2', 'h').toDate().toISOString(),
            },
        })
    }

    useEffect(() => {
        props.setState({ ...props.state, isAbleToGoNextSteps: false })
    }, [])
    
    const checkDay = (date) => {
        let day = date.toString().substring(0, 3)
        switch (day) {
            case 'Mon':
                return 'lundi'
                break
            case 'Tue':
                return 'mardi'
                break
            case 'Wed':
                return 'mercredi'
                break
            case 'Thu':
                return 'jeudi'
                break
            case 'Fri':
                return 'vendredi'
                break
            case 'Sat':
                return 'samedi'
                break
            case 'Sun':
                return 'dimanche'
                break
            default:
                return 'Day unknown'
        }
    }

    const handleMonthChange = async () => {}
    //this is the former function with the calendar, worked well but SOUBIRAN BOY decided to change it so ...
    /*const handleMonthChange = async () => {
        //let's at first consider that we fetch the ENTIRE calendar altough it's just one month needed
        await client
            .service('calendars')
            .find({
                /uery: {
                    room: {
                        campus: postInfo.campus,
                    },
                }, 
                TODO
                
            })
            .then((res) => {
                //first, we get all the days where a tutorat is planned in
                // the goal is to get the full days, because a day can be occupied but get still some free timeslots !
                // so we got to determine which one are really full to remove them from the calendar !

                let occupiedDaysList = []
                res.data.map((entry) => {
                    if (!occupiedDaysList.includes(entry.startAt) && entry.room.campus == postInfo.campus)
                        occupiedDaysList.push(entry.startAt)
                })

                //then, for each day, we get 2 list, on of the possible rooms for it, and the other for the actual used FULL rooms
                occupiedDaysList = occupiedDaysList.filter((day) => {
                    let availableRooms = apiState.roomsList.filter(
                        //the checkDay func only accept a date with classic javascript format
                        (room) => room.day == checkDay(new Date(day))
                    )

                    let usedRooms = []
                    res.data.forEach((entry) => {
                        if (entry.startAt == day && entry.full)
                            usedRooms.push(entry.room)
                    })

                    // we clean availableRooms by removing each rooms that are used for that day
                    availableRooms = availableRooms.filter(
                        (room) => !usedRooms.includes(room)
                    )
                    console.log(usedRooms, availableRooms)
                    if (availableRooms.length == 0) {
                        //if there is no room for that day, we had it to the "full" day list
                        return true
                        console.log(
                            'adding day : ',
                            day,
                            'to the occupied slots'
                        )
                    } else return false // in the contrary, the day still have free slots in it, so we do not return it
                })

                console.log('occupied days at the end :', occupiedDaysList)
                //now, occupiedDaysList is a list full of "disabled" day as they don't have free timeslots
                setOccupiedSlots(
                    occupiedDaysList.map((day) => {
                        //we get all the previous date as the calendar is fookin' bugued :)
                        let temp_date = new Date(day)
                        temp_date.setDate(temp_date.getDate() - 1)
                        //if (day.isFull)
                        return temp_date
                            .toISOString()
                            .substr(0, temp_date.toISOString().indexOf('T'))
                    })
                )
            })
            .catch((err) => {
                console.log(err)
                alert(
                    'Erreur de reseau ! Ta connexion est trop lente, la connexion avec le serveur a expiré !'
                )
                //console.log("error : ",err)
            })
    }*/

    return (
        <motion.div
            style={{
                background: 'inherit',
                overflowX: 'hidden',
            }}
            initial={{ x: '-300px', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: '-300px', opacity: 0 }}
        >
            <InputLabel id="date-label">Date</InputLabel>

            <DatePicker
                disablePast
                format="dd/MM/yyyy"
                Idlabel="date-label"
                views={['year', 'month', 'date']}
                value={props.contextState.startAt}
                onChange={setDate}
                //onOpen={handleMonthChange}
                renderInput={(props) => <TextField {...props} />}
                //onMonthChange={handleMonthChange}
                shouldDisableDate={(date) => {
                    // here is the former way to do it, worked well and was easier but well ...
                    /*if (
                                occupiedSlots.includes(
                                    new Date(date)
                                        .toISOString()
                                        .substr(
                                            0,
                                            new Date(date)
                                                .toISOString()
                                                .indexOf('T')
                                        )
                                )
                            )
                                console.log(
                                    'MATCH FOR : date matched : %s \n and \n date of the API occupied %s',
                                    new Date(date)
                                        .toISOString()
                                        .substr(
                                            0,
                                            new Date(date)
                                                .toISOString()
                                                .indexOf('T')
                                        ),
                                    occupiedSlots[0]
                                )

                        return occupiedSlots.includes(
                            new Date(date)
                                .toISOString()
                                .substr(
                                    0,
                                    new Date(date).toISOString().indexOf('T')
                                )
                        )
                            ? true
                            : false
                                */
                }}
            />
        </motion.div>
    )
}

export default CalendarForm
