import React, { createContext, useReducer } from 'react'
import { postCrReducer } from '../../reducers/postCrReducer'
import moment from 'moment'

export const PostCrContext = createContext()

const PostCrProvider = (props) => {
    const [postInfo, dispatchPostInfo] = useReducer(postCrReducer, {
        campus: '',
        startAt: moment(new Date()).add('2', 'h').toDate().toISOString(),
        roomId: {},
        duration: 0,
        comment: '',
        type: '',
        subjectId: {},
        studentsCapacity: null,
        tutorsCapacity: null,
        togglePopUp: false,
        resetTrigger: false
    })

    return (
        <PostCrContext.Provider value={{ postInfo, dispatchPostInfo }}>
            {props.children}
        </PostCrContext.Provider>
    )
}

export default PostCrProvider
