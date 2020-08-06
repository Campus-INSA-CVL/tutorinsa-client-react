import React, { useState, useEffect, useContext } from 'react'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import Home from './containers/misc/home'
import Login from './containers/login/login'
import SignUp from './containers/login/signUp'
import passwordReset from './containers/login/passwordForgot'
import About from './components/misc/aboutUs'
import Help from './components/misc/help'
import UserAccount from './containers/profiles/userAccount'
import Error404 from './components/misc/error404'
import Posts from './containers/posts/posts'
import Post from './containers/posts/postDetail'
import ConfirmedSignUp from './containers/login/confirmedSignUp'
import NavBar from './components/layout/navbar'
import Footer from './components/layout/footer'
import AdminPanel from './containers/profiles/adminPanel'
import { AuthContext } from './store/contexts/auth/authContext'
import { UserCrContext } from './store/contexts/user/createUserContext'
import { UserContext } from './store/contexts/user/userContext'
import { ApiContext } from './store/contexts/api/apiContext'
import fetchData from './lib/fetchData'
import { AnimatePresence } from 'framer-motion'
import { ThemeContext } from './store/contexts/themes/themeContext'
import { useQuery } from 'react-query'
import reLogin from './lib/loginFunctions'
import { WelcomeBackAuth } from './components/misc/notificationBar'
import PostCalendar from './containers/posts/calendar'
import PasswordReset from './containers/login/passwordReset'
import client from './vendors/feather'
import { ThemeProvider } from '@material-ui/core/styles'
import {
    responsiveFontSizes,
    createMuiTheme,
    Paper,
    Dialog,
    DialogContent,
} from '@material-ui/core'
export const AppTheme = (checkTheme) =>
    createMuiTheme({
        palette: {
            type: checkTheme ? checkTheme : 'light',
        },
    })

export default function App(props) {
    const { authState, dispatchAuth } = useContext(AuthContext)
    const { userData, dispatchUserData } = useContext(UserContext)
    const { apiState, dispatchApiData } = useContext(ApiContext)
    const { themePreference, dispatchThemeInfo } = useContext(ThemeContext)

    let location = useLocation()
    const NO_RENDERING_BARS = ['/login', '/signup', '/passwordReset']
    const PROTECTED_ROUTES = ['/help', '/profil', '/posts', '/calendar']

    const [openNotifAuth, setNotifAuth] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const {
        isSuccess: staticDataFetched,
        isError: staticDataError,
        data: apiStaticData,
    } = useQuery(['fetchApiStaticData', 'STATIC_NOT_AUTH'], fetchData)

    const {
        isSuccess: roomsFetched,
        isError: roomsDataError,
        data: roomsData,
    } = useQuery(
        ['fetchApiStaticData', 'STATIC_AUTH', authState.isAuthenticated],
        fetchData
    )

    const {
        isSuccess: logedInSuccessfully,
        isLoading,
        isError: errorReLog,
        data: AuthentifiedData,
        status,
    } = useQuery('reLogin', reLogin, {
        retry: false,
    })

    useEffect(() => {
        // we dispatch the data to the store if the async requests are successful
        if (staticDataFetched) {
            dispatchApiData({
                type: 'UPDATE_SUBJECT',
                payload: apiStaticData[0],
            })
            dispatchApiData({
                type: 'UPDATE_YEARS',
                payload: apiStaticData[1],
            })
            dispatchApiData({
                type: 'UPDATE_DEPARTMENTS',
                payload: apiStaticData[2],
            })
        }

        roomsFetched &&
            dispatchApiData({ type: 'UPDATE_ROOMS', payload: roomsData })

        //error handling
        if (errorReLog) {
            dispatchAuth({ type: 'AUTH_FAILED' })
            if (PROTECTED_ROUTES.includes(location.pathname)) {
                alert(
                    "Vous n'êtes pas authentifié ! Vous allez être redirigé vers la page d'acceuil"
                )
                window.location.href = '/' //the <Redirect /> isn't working !
                //return <Redirect to={'/'} />
            }
        }

        staticDataError &&
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-STATIC-API-DATA]"
            )
        roomsDataError &&
            window.alert(
                "Problème de réseau - l'API ne répond pas [code : FETCH-STATIC-API-DATA-ROOM]"
            )
    }, [
        staticDataFetched,
        roomsFetched,
        staticDataError,
        roomsDataError,
        errorReLog,
    ])
    // as the reLogin trigger authState.isAuthenticated which is used by the fetch of the room,
    // we can't place it on the same useEffect as the rooms
    useEffect(() => {
        if (logedInSuccessfully) {
            dispatchUserData({
                type: 'GET_USER_INFO',
                payload: AuthentifiedData,
            })
            dispatchAuth({ type: 'LOG_IN' })
            AuthentifiedData?.appTheme
                ? AuthentifiedData?.appTheme == 'light'
                    ? dispatchThemeInfo({
                          type: 'LIGHT_THEME',
                      })
                    : dispatchThemeInfo({
                          type: 'DARK_THEME',
                      })
                : dispatchThemeInfo({
                      type: 'LIGHT_THEME',
                  })
            //console.log('le user : ', userAuthentifiedData)
            setNotifAuth(true)
        }
    }, [logedInSuccessfully])

    useEffect(() => {
        console.log(apiState)
        console.log(userData)

        //the current API trigger this event for no reason, TO FIX 
        /*client.io.on('disconnect', () => {
            window.alert(
                "La connexion avec l'API a été coupée, veuillez prendre contact avec la maintenance de Tutor'INSA !"
            )
        })*/

        //we set it right for the next admin trigger in need redirect
        location.pathname != '/' && setRedirect(false)
    }, [apiState, userData])

    //for admin panel
    if (redirect) return <Redirect to="/" />
    else
        return (
            <ThemeProvider
                theme={responsiveFontSizes(AppTheme(userData?.appTheme))}
            >
                <Paper
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: userData?.appTheme
                            ? userData?.appTheme == 'light'
                                ? 'linear-gradient(180deg,#4e73df 10%,#224abe 100%)'
                                : ''
                            : 'linear-gradient(180deg,#4e73df 10%,#224abe 100%)',
                    }}
                >
                    {
                        !NO_RENDERING_BARS.includes(location.pathname) &&
                            !authState.loading && <NavBar /> //not rendering anything while trying to reAuth the user
                    }
                    {openNotifAuth && <WelcomeBackAuth />}

                    <AnimatePresence>
                        <Switch location={location}>
                            <Route exact path="/">
                                <Home />
                            </Route>

                            <Route
                                exact
                                path="/login"
                                component={() => (
                                    <Login setNotifAuth={setNotifAuth} />
                                )}
                            />
                            <Route exact path="/signup" component={SignUp} />
                            <Route
                                exact
                                path="/passwordReset"
                                component={passwordReset}
                            />
                            <Route
                                exact
                                path="/verify"
                                component={ConfirmedSignUp}
                            />
                            <Route
                                exact
                                path="/reset"
                                component={PasswordReset}
                            />

                            <Route exact path="/about" component={About} />
                            <Route exact path="/help" component={Help} />

                            <Route
                                exact
                                path="/profil"
                                component={UserAccount}
                            />

                            <Route exact path="/posts" component={Posts} />
                            <Route
                                exact
                                path="/post/:post_id"
                                component={Post}
                            />
                            <Route
                                exact
                                path="/calendar"
                                component={PostCalendar}
                            />

                            <Route component={Error404} />
                        </Switch>
                    </AnimatePresence>
                    {
                        !NO_RENDERING_BARS.includes(location.pathname) &&
                            !authState.loading && <Footer /> //not rendering anything while trying to reAuth the user
                    }

                    <Dialog
                        open={userData.showAdminPanel}
                        style={{
                            backdropFilter: 'blur(10px)',
                        }}
                        onClose={() => {
                            dispatchUserData({
                                type: 'SWITCH_ADMIN_PANEL',
                            })
                            setRedirect(true)
                        }}
                        maxWidth="xl"
                        PaperProps={{
                            classes: {
                                root: {
                                    margin: '1%',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'solid 1px black',
                                    borderRadius: '2%',
                                },
                            },
                        }}
                    >
                        <DialogContent style={{ background: 'inherit' }}>
                            <AdminPanel />
                        </DialogContent>
                    </Dialog>
                </Paper>
            </ThemeProvider>
        )
}
