import React, { createContext, useReducer } from 'react'
import { userReducer } from '../../reducers/userReducer'

export const UserContext = createContext()

const UserProvider = (props) => {
    const [userData, dispatchUserData] = useReducer(userReducer, {
        _id: '',
        permissions: [],
        subscriptions: [],
        email: '',
        firstName: '',
        lastName: '',
        createdAt: '',
        updatedAt: '',
        createdPostsIds: [],
        year: {},
        department: {},
        favoriteSubjects: [],
        difficultSubjects: [],
        __v: null,
        appTheme: '',
        showAdminPanel: false
    })

    return (
        <UserContext.Provider value={{ userData, dispatchUserData }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
