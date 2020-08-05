import client from '../vendors/feather'

export default async function fetchData(key, method, isAuthenticated = false) {
    //console.log('called : ', method, isAuthenticated)
    if (method == 'STATIC_NOT_AUTH') {
        // fetch the static data (that can"t be changed by a user)
        const res_subjects = await client.service('subjects').find({})

        const res_years = await client.service('years').find({})

        const res_departments = await client.service('departments').find({})

        return [res_subjects, res_years, res_departments]
    } else if (method == 'STATIC_AUTH') {
        //we can only fetch it if we're authanticated !
        if (isAuthenticated) {
            const { data, total, limit } = await client.service('rooms').find({
                query: {
                    $limit: 200,
                },
            })
            console.log('ROOMZ : ', data)
            return data
        }
    } else console.log('ERROR - UNKNOW METHOD')
}

// home function to get the last X posts
export async function fetchLastPosts(key, X) {
    const { data } = await client.service('posts').find({
        query: {
            $limit: X,
            $sort: {
                startedAt: -1,
            },
        },
    })

    return data
}

export async function fetchUserPosts(key, user_id) {
    //fetch only the posts of the user !
    const { data } = await client.service('posts').find({
        query: {
            creatorId: user_id,
        },
    })
    return data
}

export async function fetchCalendarPosts(key) {
    const { data } = await client.service('posts').find({
        query: {
            type: 'tuteur',
        },
    })

    return data
}
export async function fetchUserSubscribedPosts(key, user_id) {
    //fetch only the posts of the user !
    console.log('called ', user_id)
    const { data } = await client.service('posts').find({
        query: {
            $limit: 200,
        },
    })
    let filteredData = data.filter(
        (post) =>
            post.creatorId != user_id &&
            (post.studentsIds?.includes(user_id) ||
                post.tutorsIds?.includes(user_id))
    )
    return filteredData
}

export async function fetchDetailedPost(key, post_id, fetchPost) {
    if (fetchPost) {
        const res = await client
            .service('posts')
            .get({
                _id: post_id,
            })
            .catch((err) => err)
        return res
    }
    return undefined
}
