import React, { createContext, useReducer } from 'react'
import { userCreateReducer } from '../../reducers/createUserReducer'

export const UserCrContext = createContext()

const UserCrProvider = (props) => {
    const [userCrProfil, dispatchUserCr] = useReducer(userCreateReducer, {
        email: '',
        password: '',
        passwordVerif: '',
        year: '',
        department: '',
        firstName: '',
        lastName: '',
        favoriteSubjects: [],
        difficultSubjects: [],
        permissions: [],
    })

    return (
        <UserCrContext.Provider value={{ userCrProfil, dispatchUserCr }}>
            {props.children}
        </UserCrContext.Provider>
    )
}

export default UserCrProvider
