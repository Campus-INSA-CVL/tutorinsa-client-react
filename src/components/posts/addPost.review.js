import React, { useContext } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import formatDuration from '../../lib/formatDuration'
import formatDate from '../../lib/formatDate'
import {motion} from 'framer-motion'

const ReviewPost = () => {
    const { postInfo, dispatchPostInfo } = useContext(PostCrContext)
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
                    <Typography>Résumé de votre annonce :</Typography>
                </Grid>

                {postInfo.type == 'tuteur' && (
                    <Grid item>Date : {postInfo.startAt}</Grid>
                )}

                {postInfo.type == 'tuteur' && (
                    <Grid item>
                        Durée : {formatDuration(postInfo.duration)}
                    </Grid>
                )}

                {postInfo.type == 'tuteur' && (
                    <Grid item>
                        Salle : {postInfo.roomId.name} ({postInfo.campus})
                    </Grid>
                )}

                <Grid item>
                    Type d'annonce :{' '}
                    {postInfo.type == 'eleve'
                        ? 'Demande étudiante'
                        : 'Annonce Tuteur'}
                </Grid>

                <Grid item>Matière : {postInfo.subjectId.name}</Grid>

                <Grid item container direction="column" spacing={2}>
                    Commentaire :{' '}
                    <Typography
                        style={{ border: '2px solid black', padding: '3%' }}
                    >
                        <cite>{postInfo.comment}</cite>
                    </Typography>
                </Grid>
            </Grid>
        </motion.div>
    )
}

export default ReviewPost
