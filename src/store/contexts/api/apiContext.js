import React, { createContext, useReducer } from 'react'
import { apiReducer } from '../../reducers/apiReducer'

export const ApiContext = createContext()

const ApiDataProvider = (props) => {
    const [apiState, dispatchApiData] = useReducer(apiReducer, {
        departmentsList: [],
        yearsList: [],
        subjectsList: [],
        roomsList: [],
        filterRequest: {},
        //flags:
        requestMade: false,
        subscribed: false,
    })

    return (
        <ApiContext.Provider value={{ apiState, dispatchApiData }}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiDataProvider
