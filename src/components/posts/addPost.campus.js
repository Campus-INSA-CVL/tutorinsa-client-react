import React, { useContext, useEffect } from 'react'
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Grid,
} from '@material-ui/core'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import { ThemeContext } from '../../store/contexts/themes/themeContext'

const CampusForm = (props) => {
    const { postInfo, dispatchPostInfo } = useContext(PostCrContext)
    const { themePreference } = useContext(ThemeContext)

    const setCampus = (e) => {
        dispatchPostInfo({
            type: 'CAMPUS',
            payload: { name: [e.target.name], value: e.target.value },
        })
    }

    useEffect(() => {
        props.setState({ ...props.state, isAbleToGoNextSteps: false })
    }, [])
    return (
        <Grid
            container
            direction="column"
            spacing={2}
            justify="center"
            style={{
                background: 'inherit',
            }}
        >
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Votre campus : </FormLabel>
                    <RadioGroup
                        value={postInfo.campus}
                        onChange={setCampus}
                        name="campus"
                    >
                        <FormControlLabel
                            value="bourges"
                            control={<Radio />}
                            label="Bourges"
                        />
                        <FormControlLabel
                            value="blois"
                            control={<Radio />}
                            label="Blois"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Type de demande </FormLabel>
                    <RadioGroup
                        value={postInfo.type}
                        onChange={setCampus}
                        name="type"
                    >
                        <FormControlLabel
                            value="eleve"
                            control={<Radio />}
                            label="Etudiant"
                        />
                        <FormControlLabel
                            value="tuteur"
                            control={<Radio />}
                            label="Tuteur"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default CampusForm
