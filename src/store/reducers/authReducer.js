export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, isAuthenticated: true, loading : false }
        case 'LOG_OUT':
            return { ...state, isAuthenticated: false, loading : false }
        case 'AUTH_FAILED':
            return { ...state, loading : false }
        default:
            return state
    }
}
