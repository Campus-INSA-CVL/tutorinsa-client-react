import moment from 'moment'

export const postCrReducer = (state, action) => {
    switch (action.type) {
        case 'CAMPUS':
            return { ...state, [action.payload.name]: action.payload.value }
        case 'DATE':
            return { ...state, startAt: action.payload.startAt }
        case 'ROOM':
            return { ...state, roomId: action.payload.roomId }
        case 'DURATION':
            return { ...state, duration: action.payload.duration }
        case 'CONTENT':
            return { ...state, [action.payload.name]: action.payload.value }
        case 'DIALOG':
            return { ...state, togglePopUp: action.payload }
        case 'RESET':
            return {
                ...state,
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
                resetTrigger: true,
            }
        case 'RESET_FLAG_CREATED_POST':
            return { ...state, resetTrigger: false }
        default:
            return state
    }
}
