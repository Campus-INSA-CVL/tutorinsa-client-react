import client from '../vendors/feather'

export async function fetchStudents(key, post, trigger) {
    const res = await client.service('users').find({
        query: {
            _id: {
                $in: post.studentsIds,
            },
        },
    })
    return res
}

export async function subscribeFromPost(
    role,
    setState,
    state,
    post_id,
    userID,
    dispatchApiData
) {
    await client
        .service('subscriptions')
        .patch(post_id, {
            type: 'subscribe',
            as: role,
        })
        .then((res) => {
            setState({
                ...state,
                openDialogSelectRole: false,
                isUserRegistered: true,
                successSubscribe: true,
            })
            dispatchApiData({
                type: 'SUBSCRIPTION_MADE',
            })
        })
}

export async function unsubscribeFromPost(
    setState,
    state,
    post,
    userID,
    dispatchApiData
) {
    if (post.studentsIds.includes(userID))
        await client
            .service('subscriptions')
            .patch(post._id, {
                type: 'unsubscribe',
                as: 'eleve',
            })
            .then((res) => {
                console.log(res)
                setState({
                    ...state,
                    openDialogSelectRole: false,
                    isUserRegistered: false,
                    successUnSubscribe: true,
                })
                dispatchApiData({
                    type: 'SUBSCRIPTION_MADE',
                })
            })
            .catch((err) => console.log(err))

    if (post.tutorsIds.includes(userID))
        await client
            .service('subscriptions')
            .patch(post._id, {
                type: 'unsubscribe',
                as: 'tuteur',
            })
            .then((res) => {
                setState({
                    ...state,
                    openDialogSelectRole: false,
                    isUserRegistered: false,
                    successUnSubscribe: true,
                })
                dispatchApiData({
                    type: 'SUBSCRIPTION_MADE',
                })
            })
            .catch((err) => console.log(err))
}
