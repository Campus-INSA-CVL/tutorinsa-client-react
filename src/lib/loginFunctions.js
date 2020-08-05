import client from '../vendors/feather'

export default async function reLogin(key) {
    const { user } = await client.reAuthenticate()
    return user
}

export async function logIn(key, loadingIn = false, email, password) {
    console.log('called with', loadingIn)
    if (loadingIn) {
        const res = await client
            .authenticate({
                strategy: 'local',
                email: email,
                password: password,
            })
            .catch((err) => err)
        return res
    }
}
