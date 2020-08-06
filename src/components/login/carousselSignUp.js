import React, { useState, useContext } from 'react'
import { ClickAwayListener, useMediaQuery } from '@material-ui/core'
import SlideImage1 from '../../images/tutorinsa_slide_1.jpeg'
import SlideImage2 from '../../images/tutorinsa_slide_2.jpeg'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import { red, blue, green } from '@material-ui/core/colors'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'

const CarousselSignUp = () => {
    const [state, setState] = useState({
        openCaroussel: true,
        redirect: false,
    })
    const isMobile = useMediaQuery('(max-width:700px)')
    const { authState, dispatchAuth } = useContext(AuthContext)

    if (state.redirect) return <Redirect to="/signup" />
    return (
        !isMobile && (
            <ClickAwayListener
                onClickAway={() => setState({ ...state, openCaroussel: false })}
            >
                <AutoRotatingCarousel
                    label={
                        !authState.isAuthentified
                            ? "S'inscire"
                            : "J'ai compris !"
                    }
                    open={state.openCaroussel}
                    onClose={() => setState({ ...state, openCaroussel: false })}
                    onStart={() => setState({ ...state, redirect: true })}
                    //mobile={isMobile}
                >
                    <Slide
                        media={
                            <img
                                src={SlideImage1}
                                alt="First slider for the caroussel"
                            />
                        }
                        mediaBackgroundStyle={{ backgroundColor: red[400] }}
                        style={{ backgroundColor: red[600] }}
                        title="Ouvert à tous, pour un grand nombre de matières !"
                        subtitle="Adoptez une méthode efficace pour réviser vos cours !"
                    />
                    <Slide
                        media={
                            <img
                                src={SlideImage2}
                                alt="Second slider for the caroussel"
                            />
                        }
                        mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                        style={{ backgroundColor: blue[600] }}
                        title="Difficultées prononcées ou révisions de dernières minutes ?"
                        subtitle="Pourquoi ne pas commencer maintenant ? Et pour cela, rien de plus simple !"
                    />
                </AutoRotatingCarousel>
            </ClickAwayListener>
        )
    )
}

export default CarousselSignUp
