import React, { useContext, useState, useEffect } from 'react'
import {
    Grid,
    Typography,
    Button,
    GridList,
    Backdrop,
    useMediaQuery,
} from '@material-ui/core/'
import { Skeleton } from '@material-ui/lab'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/homeStyle'
import logoTutorinsa from '../../images/logo_tutorat.png'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../store/contexts/auth/authContext'
import CarousselSignUp from '../../components/login/carousselSignUp'
import { UserContext } from '../../store/contexts/user/userContext'
import client from '../../vendors/feather'
import { motion } from 'framer-motion'
import PreRenderedPost from '../../components/posts/preRenderedPost'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import TutoLoader from '../../components/misc/loader'
import { useFind } from 'figbird'

export default function Home() {
    const classes = useStyles()
    const { authState, dispatchAuth } = useContext(AuthContext)
    const [lastestPost, setLastestPost] = useState({
        limit: 3,
    })
    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )
    const { themePreference } = useContext(ThemeContext)

    const { status, error, data, isFetching } = useFind('posts', {
        query: {
            $limit: lastestPost.limit | 3,
            $sort: {
                startedAt: -1,
            },
        },
        realtime: 'refetch',
    })

    useEffect(() => {
        if (status == 'error')
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-STATIC-API-DATA]"
            )
    }, [status])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.root}
        >
            {!authState.isLoading ? (
                <Grid
                    container
                    style={
                        isMobile
                            ? {
                                  overflowY: 'scroll',
                                  height: 'inherit',
                              }
                            : {
                                  height: 'inherit',
                              }
                    }
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    {!authState.loading && !authState.isAuthenticated && (
                        <CarousselSignUp />
                    )}

                    <Grid
                        item
                        container
                        direction={isMobile && 'column'}
                        justify="center"
                        spacing={!isMobile && 4}
                    >
                        <Grid item align={isMobile && 'center'}>
                            <img src={logoTutorinsa} alt="Logo de TutorINSA" />
                        </Grid>

                        <Grid item className={classes.gridText}>
                            <Typography variant="h3" align="center">
                                Bienvenue sur Tutor<strong>INSA</strong>
                            </Typography>
                            <br />
                            <Typography align="center">
                                Une plateforme de tutorat regroupant l'ensemble
                                des matières proposés par l'INSA Centre Val de
                                Loire. Des tuteurs bénévoles peuvent poster des
                                annonces pour vous permettre de vous
                                <strong> améliorer</strong>, de{' '}
                                <strong> travailler une notion</strong> ou de{' '}
                                <strong>préparer un examen</strong>.
                            </Typography>
                            <br />
                            <Typography align="center">
                                Vous retrouverez donc l'ensemble des{' '}
                                <strong>offres</strong> des tuteurs, prêt à
                                donner cours, et l'ensemble des{' '}
                                <strong>demandes</strong> des élèves,
                                nécessitant de l'aide dans certaines matières.
                            </Typography>
                            <br />
                            {authState.isAuthenticated ? null : (
                                <Typography align="center">
                                    Élève ? Tuteur ?{' '}
                                    <NavLink
                                        to="/signup"
                                        className={classes.navlink}
                                    >
                                        Rejoins nous !
                                    </NavLink>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        container
                        direction="column"
                        align="center"
                        className={classes.postDisplay}
                    >
                        <Typography variant="h2" style={{ color: 'white' }}>
                            Annonces les plus récentes :
                        </Typography>

                        <br />
                        <GridList
                            className={classes.gridList}
                            style={{ border: themePreference.borderPost }}
                            cols={isMobile ? 1 : 3}
                            spacing={2}
                            cellHeight={isMobile && "auto"}
                        >
                            {!isFetching ? (
                                data?.map((post, index) => (
                                    <Grid item style={{ padding: '1%' }}>
                                        <PreRenderedPost
                                            userPost={post}
                                            key={index}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justify="center"
                                >
                                    <Grid item>
                                        <Skeleton
                                            variant="rect"
                                            width={'50%'}
                                            height={300}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </GridList>
                    </Grid>
                </Grid>
            ) : (
                <Grid
                    container
                    direction="column"
                    alignContent="center"
                    justify="center"
                >
                    <Backdrop
                        className={classes.backdrop}
                        open={authState.isLoading}
                    >
                        <TutoLoader />
                    </Backdrop>
                </Grid>
            )}
        </motion.div>
    )
}
