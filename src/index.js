import React from 'react'
import ReactDOM from 'react-dom'
import './styles/css/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import AuthProvider from './store/contexts/auth/authContext'
import UserCrProvider from './store/contexts/user/createUserContext'
import UserProvider from './store/contexts/user/userContext'
import PostCrProvider from './store/contexts/posts/postCrContext'
import ApiProvider from './store/contexts/api/apiContext'
import ThemeProvider from './store/contexts/themes/themeContext'
import PostEditProvider from './store/contexts/posts/postEditContext'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@material-ui/pickers'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'
import { queryConfig } from './config/react-query-config'
import { ReactQueryConfigProvider } from 'react-query'
import { Provider } from 'figbird'
import client from './vendors/feather'

ReactDOM.render(
    <Provider feathers={client}>
        <ReactQueryConfigProvider config={queryConfig}>
            <PostCrProvider>
                <PostEditProvider>
                    <AuthProvider>
                        <UserProvider>
                            <UserCrProvider>
                                <ApiProvider>
                                    <ThemeProvider>
                                        <BrowserRouter>
                                            <LocalizationProvider
                                                dateAdapter={DateFnsUtils}
                                            >
                                                <App />
                                            </LocalizationProvider>
                                        </BrowserRouter>
                                    </ThemeProvider>
                                </ApiProvider>
                            </UserCrProvider>
                        </UserProvider>
                    </AuthProvider>
                </PostEditProvider>
            </PostCrProvider>
        </ReactQueryConfigProvider>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
