import React, { Fragment, useState, useEffect, useContext } from 'react'
import client from '../../vendors/feather'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import {
    InputLabel,
    Select,
    CircularProgress,
    MenuItem,
    Grid,
} from '@material-ui/core'
import { ApiContext } from '../../store/contexts/api/apiContext'
import { useQuery } from 'react-query'
import moment from 'moment'
import { motion } from 'framer-motion'
import { containerVariants } from '../../styles/componentStyle/formTransition'

const RoomForm = (props) => {
    const { apiState, dispatchApiData } = useContext(ApiContext)

    const [roomList, setRooms] = useState([])
    const [state, setState] = useState({
        loading: true,
    })

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

    /*const fetchData = async () => {
        if (roomList.length == 0)
            await client
                .service('calendars')
                .find({
                    query: {
                       startAt: props.contextState.date
                    },
                    
                })
                .then((res) => {
                    let availableRooms = apiState.roomsList.filter(
                        //the checkDay func only accept a date with classic javascript format
                        (room) => room.day == checkDay(new Date(props.contextState.date))
                    )

                    let usedRooms = []
                    // remove the "entry.startAt == props.contextState.date" when the query will work as
                    // the res.data will already be filtered by the API
                    res.data.forEach((entry) => {
                        if (entry.startAt == props.contextState.date && entry.full)
                            usedRooms.push(entry.room)
                    })

                    // we clean availableRooms by removing each rooms that are used for that day
                    availableRooms = availableRooms.filter(
                        (room) => !usedRooms.includes(room)
                    )
                    console.log(usedRooms, availableRooms)
                    setRooms(availableRooms)
                    setState({ ...state, loading: false })
                })
                .catch((err) => {
                    console.log(err)
                    alert(
                        'Erreur de reseau ! Ta connexion est trop lente, la connexion avec le serveur a expiré !'
                    )
                    //console.log("error : ",err)
                })
        setState({ ...state, firstConnexion: false })
    }*/

    const fetchRoomsIdsForTheDay = async (key, date) => {
        const minDate = moment(date)
            .set({
                hour: '8',
                minute: '0',
            })
            .toDate()
            .toUTCString()
        const maxDate = moment(date)
            .set({
                hour: '23',
                minute: '59',
            })
            .toDate()
            .toUTCString()
        const res = await client.service('posts').find({
            query: {
                startAt: {
                    $lte: maxDate,
                    $gte: minDate,
                },
                type: 'tuteur',
            },
        })

        //let's directly get the ids of the rooms used on the day
        return res?.data
            ?.filter((post) => post?.room?.campus === props.contextState.campus)
            .map((post) => post.room._id)
    }

    const {
        data: roomsIdsForTheDay,
        isSuccess: roomsIdsForTheDayFetched,
        isError: roomsIdsForTheDayError,
    } = useQuery(
        ['fetchRoomsIdsForTheDay', props.contextState.startAt],
        fetchRoomsIdsForTheDay
    )

    const setRoom = (e) => {
        const roomObject = apiState?.roomsList?.filter(
            (room) => room?._id === e.target.value._id
        )[0]

        props.dispatchMethod({
            type: 'ROOM',
            payload: {
                roomId: e.target.value,
            },
        })
    }

    useEffect(() => {
        if (roomsIdsForTheDayFetched) {
            // roomsIdsForTheDay means the already full rooms that can't be used today
            let availableRoomsIds = apiState?.roomsList
                ?.filter(
                    //the checkDay func only accept a date with classic javascript format
                    (room) =>
                        room.campus == props.contextState.campus &&
                        room.day ==
                            checkDay(new Date(props.contextState.startAt))
                )
                .map((room) => room._id)
            console.log('debugging : ', availableRoomsIds, roomsIdsForTheDay)
            // if a roomId in the "availableRoomsIds" list is on "roomsIdsForTheDay" list,
            // we get rid of him and thus we filter the "availableRoomsIds"
            availableRoomsIds = availableRoomsIds?.filter(
                (roomId) => !roomsIdsForTheDay?.includes(roomId)
            )

            //at the end, "availableRoomsIds" become likely "availableRoomsIdsForTheDay" !
            //we thus return all the room objects whose id's matches the "availableRoomsIds" list !
            setRooms(
                apiState.roomsList.filter((room) =>
                    availableRoomsIds?.includes(room._id)
                )
            )
            //as there is no room, we need to flag that by a empty object to the context
            roomList.length == 0 &&
                props.dispatchMethod({
                    type: 'ROOM',
                    payload: {
                        roomId: {},
                    },
                })
            setState({ ...state, loading: false })
        }

        roomsIdsForTheDayError &&
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-ROOMS-CR-POST]"
            )
    }, [roomsIdsForTheDayFetched, roomsIdsForTheDayError])

    useEffect(() => {
        props.setState({ ...props.state, isAbleToGoNextSteps: false })
    }, [])

    return (
        <motion.div
            style={{
                background: 'inherit',
            }}
            initial={{ x: '-300px', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: '-300px', opacity: 0 }}
        >
            <Grid container direction="column" justify="space-evenly">
                <InputLabel id="room">Salle : </InputLabel>
                <Select
                    value={props.contextState.roomId._id}
                    Idlabel="room"
                    onChange={setRoom}
                    fullWidth
                >
                    {state.loading ? (
                        <Grid container justify="center">
                            <CircularProgress />
                        </Grid>
                    ) : roomList.length == 0 ? (
                        <MenuItem disabled value={{}}>
                            Aucune salle disponible ce jour là !
                        </MenuItem>
                    ) : (
                        roomList.map((room) => {
                            return (
                                <MenuItem value={room._id}>
                                    {room.name}
                                </MenuItem>
                            )
                        })
                    )}
                </Select>
            </Grid>
        </motion.div>
    )
}

export default RoomForm
