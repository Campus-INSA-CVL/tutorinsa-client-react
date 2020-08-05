export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SWITCH_ADMIN_PANEL':
            return({...state, showAdminPanel: !state.showAdminPanel})
        case 'GET_USER_INFO':
            return {
                ...state,
                _id: action.payload._id,
                permissions: action.payload.permissions,
                subscriptions: action.payload.subscriptions,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt,
                createdPostsIds: action.payload.createdPosts,
                year: action.payload.year,
                department: action.payload.department,
                favoriteSubjects: action.payload.favoriteSubjects,
                difficultSubjects: action.payload.difficultSubjects,
                __v: action.payload.__v,
                appTheme: action.payload.appTheme
            }
        case 'RESET_USER_INFO':
            return {
                ...state,
                _id: '',
                permissions: [],
                subscriptions: [],
                email: '',
                firstName: '',
                lastName: '',
                createdAt: '',
                updatedAt: '',
                createdPostsIds: [],
                year: [],
                department: [],
                favoriteSubjects: [],
                difficultSubjects: [],
                __v: null,
                appTheme: ''
            }
        default:
            return state
    }
}
