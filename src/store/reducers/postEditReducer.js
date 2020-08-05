export const PostEditReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            return {
                ...state,
                startAt: action.payload.startAt,
                duration: action.payload.duration,
                roomId: action.payload.roomId,
                comment: action.payload.comment,
                subjectId: action.payload.subjectId,
                studentsCapacity: action.payload.studentsCapacity,
                tutorsCapacity: action.payload.tutorsCapacity,
                campus: action.payload.campus
            }
        case 'DATE':
            return { ...state, startAt: action.payload.startAt }
        case 'ROOM':
            return { ...state, roomId: action.payload.roomId }
        case 'DURATION':
            return { ...state, duration: action.payload.duration }
        case 'CONTENT':
            return { ...state, [action.payload.name]: action.payload.value }
        case 'RESET':
            return {
                ...state,
                startAt: '',
                roomId: {},
                duration: null,
                comment: '',
                subjectId: {},
                studentsCapacity: null,
                tutorsCapacity: null,
                campus:''
            }
        default:
            return state
    }
}
