import React, { createContext, useReducer } from 'react'
import { authReducer } from '../../reducers/authReducer'

export const AuthContext = createContext()

const AuthProvider = (props) => {
    const [authState, dispatchAuth] = useReducer(authReducer, {
        isAuthenticated: false,
        loading : true,
        showErrorLogin: false
    })

    return (
        <AuthContext.Provider value={{ authState, dispatchAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
