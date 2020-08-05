import React from 'react'
import useStyles from '../../styles/componentStyle/404Style'
import '../../styles/css/404Animation.css'
import { Grid, Typography, Button, emphasize } from '@material-ui/core'
import img_404 from '../../images/404_pic.jpg'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import logoTutorinsa from '../../images/logo_tutorat.png'

const Error404 = (props) => {
    const classes = useStyles()

    /*return (
        <Grid
            container
            direction="column"
            className={classes.root}
            justify="space-evenly"
            alignItems="center"
        >
            <Grid item>
                <img
                    alt="Aouf, quelle l'erreur !"
                    src={img_404}
                    className={classes.image}
                />
            </Grid>

            <Grid item>
                <Typography
                    variant="h1"
                    align="center"
                    className={classes.typo}
                >
                    Erreur 404
                </Typography>
            </Grid>

            <Grid
                item
                container
                style={{ width: '100%' }}
                justify="center"
                spacing={2}
            >
                <Grid item>
                    <NavLink to="/help" className={classes.navlink}>
                        <Button variant="contained" color="primary">
                            Appeler à l'aide !
                        </Button>
                    </NavLink>
                </Grid>

                <Grid item>
                    <NavLink to="/" className={classes.navlink}>
                        <Button variant="contained" color="primary">
                            Retourner à la page d'accueil !
                        </Button>
                    </NavLink>
                </Grid>
            </Grid>
        </Grid>
    )*/

    // this is a free template on Internet
    var parallax = function (e) {
            var windowWidth = $(window).width()
            if (windowWidth < 768) return
            var halfFieldWidth = $('.parallax').width() / 2,
                halfFieldHeight = $('.parallax').height() / 2,
                fieldPos = $('.parallax').offset(),
                x = e.pageX,
                y = e.pageY - fieldPos.top,
                newX = (x - halfFieldWidth) / 30,
                newY = (y - halfFieldHeight) / 30
            $('.parallax [class*="wave"]').each(function (index) {
                $(this).css({
                    transition: '',
                    transform:
                        'translate3d(' +
                        index * newX +
                        'px,' +
                        index * newY +
                        'px,0px)',
                })
            })
        },
        stopParallax = function () {
            $('.parallax [class*="wave"]').css({
                transform: 'translate(0px,0px)',
                transition: 'all .7s',
            })
            setTimeout(function () {
                $('.parallax [class*="wave"]').css('transition', '')
            }, 700)
        }
    $(document).ready(function () {
        $('.not-found').on('mousemove', parallax)
        $('.not-found').on('mouseleave', stopParallax)
    })

    return (
        <div class="not-found parallax">
            <div class="sky-bg"></div>
            <div class="wave-7"></div>
            <div class="wave-6"></div>
            <a class="wave-island">
                <NavLink to="/">
                    <img
                        src="http://res.cloudinary.com/andrewhani/image/upload/v1524501929/404/island.svg"
                        alt="Island"
                    />
                </NavLink>
            </a>
            <div class="wave-5"></div>
            <div class="wave-lost wrp">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <div class="wave-4"></div>
            <div class="wave-boat">
                <img
                    class="boat"
                    style={{
                        animationDelay: '-1s',
                    }}
                    src={logoTutorinsa}
                    alt="Boat"
                />
            </div>

            <div class="wave-boat">
                <img
                    class="boat"
                    style={{
                        animationDelay:'-4s',
                    }}
                    src={logoTutorinsa}
                    alt="Boat"
                />
            </div>

            <div class="wave-boat">
                <img
                    class="boat"
                    style={{
                        animationDelay: '-8s',
                    }}
                    src={logoTutorinsa}
                    alt="Boat"
                />
            </div>
            <div class="wave-3"></div>
            <div class="wave-2"></div>
            <div class="wave-1"></div>
            <div class="wave-message">
                <p>
                    Cliquez sur l'île pour revenir <br />
                    en terre connue !
                </p>
                <p>
                    Perdu dans cet océan de liens ? <br />
                    Cliquez{' '}
                    <NavLink className={classes.navlink} to="/help">
                        <span style={{
                            fontWeight: 'bold',
                            fontStyle: 'oblique'
                        }}>ici</span>
                    </NavLink>{' '}
                    pour de l'aide !
                </p>
            </div>
        </div>
    )
}

export default Error404
