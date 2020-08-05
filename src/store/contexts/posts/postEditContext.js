import React, { createContext, useReducer } from 'react'
import { PostEditReducer } from '../../reducers/postEditReducer'

export const PostEditContext = createContext()

const PostEditProvider = (props) => {
    const [postEditInfo, dispatchEditedInfo] = useReducer(PostEditReducer, {
        //the roomId and subjectId are objects are objects at the beggining but meant to be an Id on the commit at the end !
        startAt: '',
        roomId: {},
        duration: null,
        comment: '',
        subjectId: {},
        studentsCapacity: null,
        tutorsCapacity: null,
        campus: '',
    })

    return (
        <PostEditContext.Provider value={{ postEditInfo, dispatchEditedInfo }}>
            {props.children}
        </PostEditContext.Provider>
    )
}

export default PostEditProvider
