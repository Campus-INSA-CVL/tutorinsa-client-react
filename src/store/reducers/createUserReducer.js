export const userCreateReducer = (state, action) => {
    switch (action.type) {
        case 'PERSONAL_INFO':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        case 'SUBJECT_INPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        default:
            return state
    }
}
