import React, { useContext, useState, useEffect } from 'react'
import { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import { motion } from 'framer-motion'
import {
    containerVariants,
    useStyles,
} from '../../styles/containerStyle/calendarStyle'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import TutoLoader from '../../components/misc/loader'
import { Backdrop, Grid, Typography } from '@material-ui/core'
import PreRenderedPost from '../../components/posts/preRenderedPost'
import moment from 'moment'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import { Redirect } from 'react-router-dom'
import { useFind } from 'figbird'

export default function PostCalendar(props) {
    const classes = useStyles()
    const { postInfo, dispatchPostInfo } = useContext(PostCrContext)
    const [redirect, setRedirect] = useState(false)
    const handleDateClick = (arg) => {
        dispatchPostInfo({
            type: 'DATE',
            payload: {
                startAt: moment(arg.date).toDate().toISOString(),
            },
        })
        dispatchPostInfo({
            type: 'DIALOG',
            payload: true,
        })
        setRedirect(true)
    }

    const { data, status, error, isFetching } = useFind('posts', {
        realtime: 'refetch',
    })

    useEffect(() => {
        status == 'error' &&
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-POST_CALENDAR]"
            )
    }, [status])
    const renderEventContent = (eventInfo) => {
        const post = eventInfo?.event?.extendedProps?.post
        return <PreRenderedPost userPost={post} />
    }
    if (redirect) return <Redirect to="/posts" />
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.root}
        >
            {!isFetching ? (
                <div>
                    <Typography
                        align="center"
                        variant="h4"
                        style={{ padding: '1%' }}
                    >
                        Calendrier des annonces : cliquez sur un créneau pour
                        créer une annonce à la date correspondante !
                    </Typography>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            bootstrapPlugin,
                        ]}
                        weekends={true}
                        aspectRatio={2}
                        dateClick={handleDateClick}
                        initialView="dayGridMonth"
                        events={data?.map((post) => {
                            return {
                                date: moment(post.startAt).format('YYYY-MM-DD'),
                                extendedProps: { post },
                            }
                        })}
                        eventContent={renderEventContent}
                        height={props.height ? props.height : '70vh'}
                    />
                </div>
            ) : (
                <Grid
                    container
                    direction="column"
                    alignContent="center"
                    justify="center"
                >
                    <Backdrop className={classes.backdrop} open={isFetching}>
                        <TutoLoader />
                    </Backdrop>
                </Grid>
            )}
        </motion.div>
    )
}
