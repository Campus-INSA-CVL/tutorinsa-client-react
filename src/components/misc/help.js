import React, { useState, useContext } from 'react'
import {
    Grid,
    Typography,
    Card,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    TextField,
    Button,
    InputLabel,
    CardActions,
    TextareaAutosize,
    useMediaQuery
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import Questions_Sample from '../../containers/misc/textData'
import useStyles, {
    containerVariants,
} from '../../styles/componentStyle/helpStyle'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../store/contexts/themes/themeContext'

export default function Help() {
    const classes = useStyles()
    const { themePreference } = useContext(ThemeContext)
    const [question, setQuestion] = useState({
        title: '',
        content: '',
    })

    const isMobile = useMediaQuery(
        `(max-width:${process.env.REACT_APP_MOBILE_LENGTH}px)`
    )

    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value })
    }
    const submitQuestion = () => {
        console.log(question)
    }
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.root}
        >
            <Grid
                container
                direction="column"
                justify="space-evenly"
                style={!isMobile ? { height: 'inherit' } : {}}
            >
                <Grid item>
                    <Typography variant="h2" align="center">
                        Besoin d'aide ? Vous êtes au bon endroit !
                    </Typography>
                </Grid>

                <Grid
                    item
                    container
                    direction="row"
                    className={classes.gridGeneral}
                    spacing={8}
                >
                    <Grid item xs>
                        <Card className={classes.card}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="h4" align="center">
                                        Questions fréquentes
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Divider variant="middle" />
                                </Grid>

                                <Grid
                                    item
                                    container
                                    direction="column"
                                    spacing={2}
                                >
                                    {Questions_Sample.map((question_post) => {
                                        return (
                                            <Grid item xs>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        fullWidth
                                                        className={
                                                            classes.questionPanel
                                                        }
                                                    >
                                                        <Typography>
                                                            {
                                                                question_post.request
                                                            }
                                                        </Typography>
                                                    </ExpansionPanelSummary>

                                                    <ExpansionPanelDetails
                                                        className={
                                                            classes.responsePanel
                                                        }
                                                    >
                                                        <Typography>
                                                            {
                                                                question_post.response
                                                            }
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs>
                        <Card
                            className={classes.card}
                            style={{
                                overflowY: 'scroll',
                            }}
                        >
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="h4" align="center">
                                        Vous voulez faire remonter une erreur ?
                                        Un Bug ? Ou simplement une question ?
                                        Contactez nous !
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Divider variant="middle" />
                                </Grid>

                                <Grid
                                    item
                                    container
                                    direction="column"
                                    spacing={2}
                                >
                                    <Grid item xs>
                                        <InputLabel id="title-label">
                                            Titre :{' '}
                                        </InputLabel>
                                        <TextField
                                            onChange={handleChange}
                                            variant="outlined"
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            Idlabel="title-label"
                                            name="title"
                                        />
                                    </Grid>

                                    <Grid item xs>
                                        <InputLabel id="content-label">
                                            Question :{' '}
                                        </InputLabel>
                                        <TextareaAutosize
                                            variant="outlined"
                                            autoFocus
                                            margin="dense"
                                            fullWidth
                                            Idlabel="content-label"
                                            name="content"
                                            rowsMin={3}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                <CardActions>
                                    <Button
                                        size="medium"
                                        color="primary"
                                        onClick={submitQuestion}
                                    >
                                        Envoyer la requête
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </motion.div>
    )
}
