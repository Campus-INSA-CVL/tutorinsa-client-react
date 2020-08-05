import React from 'react'
import useStyles, {containerVariants} from '../../styles/componentStyle/aboutStyle'
import {
    Grid,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from '@material-ui/core'
import TeamInfo from '../../containers/misc/teamContact'
import BuildIcon from '@material-ui/icons/Build'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import {motion} from 'framer-motion'

export default function About() {
    const classes = useStyles()

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.root}
        >
            <Grid container direction="column" justify="space-around" >
                <Grid item>
                    <Typography variant="h2" align="center">
                        Voici l'équipe en charge du développement de ce projet !
                    </Typography>
                </Grid>

                <Grid
                    item
                    container
                    direction="row"
                    justify="space-evenly"
                    className={classes.teamSpec}
                >
                    {TeamInfo.map((person) => {
                        let alt = String(`${person.lastname}_img`)
                        return (
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardMedia
                                        component="img"
                                        className={classes.image}
                                        alt={alt}
                                        src={person.photo}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                            align="center"
                                        >
                                            <BuildIcon /> {person.job}{' '}
                                            <BuildIcon />
                                        </Typography>
                                        <Typography variant="body2">
                                            {person.lastname} <br />{' '}
                                            {person.firstname}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container justify="space-evenly">
                                            {person.social_networks.map(
                                                (social_net) => {
                                                    switch (social_net.name) {
                                                        case 'Facebook':
                                                            return (
                                                                <Grid item>
                                                                    <a
                                                                        href={
                                                                            social_net.link
                                                                        }
                                                                    >
                                                                        <FacebookIcon />
                                                                    </a>
                                                                </Grid>
                                                            )
                                                        case 'Twitter':
                                                            return (
                                                                <Grid item>
                                                                    <a
                                                                        href={
                                                                            social_net.link
                                                                        }
                                                                    >
                                                                        <TwitterIcon />
                                                                    </a>
                                                                </Grid>
                                                            )
                                                        case 'Github':
                                                            return (
                                                                <Grid item>
                                                                    <a
                                                                        href={
                                                                            social_net.link
                                                                        }
                                                                    >
                                                                        <GitHubIcon />
                                                                    </a>
                                                                </Grid>
                                                            )
                                                        case 'LinkedIn':
                                                            return (
                                                                <Grid item>
                                                                    <a
                                                                        href={
                                                                            social_net.link
                                                                        }
                                                                    >
                                                                        <LinkedInIcon />
                                                                    </a>
                                                                </Grid>
                                                            )
                                                        default:
                                                            return null
                                                    }
                                                }
                                            )}
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </motion.div>
    )
}
