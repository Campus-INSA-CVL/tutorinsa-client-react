export const apiReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SUBJECT':
            return { ...state, subjectsList: action.payload }
        case 'UPDATE_YEARS':
            return { ...state, yearsList: action.payload }
        case 'UPDATE_DEPARTMENTS':
            return { ...state, departmentsList: action.payload }
        case 'UPDATE_ROOMS':
            return { ...state, roomsList: action.payload }
        case 'SORTING_REQUEST_MADE':
            return { ...state, requestMade: true }
        case 'RESET_REQUEST_MADE':
            return { ...state, requestMade: false, filterRequest: {} }
        case 'FILTER_REQUEST':
            return { ...state, filterRequest: action.payload }
        case 'SUBSCRIPTION_MADE':
            return { ...state, subscribed: !state.subscribed }
        default:
            return state
    }
}
