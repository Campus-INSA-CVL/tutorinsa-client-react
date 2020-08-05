import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import rest from '@feathersjs/rest-client'

export const socket_api = io('https://tutorinsa-server.azurewebsites.net/')

console.log(socket_api)
const client = feathers()
    .configure(feathers.socketio(socket_api))
    //.configure(rest(socket_api).fetch(window.fetch))
    .configure(
        feathers.authentication({
            storage: window.localStorage,
        })
    )

export default client

export const AdminClient = feathers()
    //.configure(feathers.hooks())
    .configure(rest(socket_api).fetch(window.fetch))
    .configure(
        feathers.authentication({
            storage: window.localStorage,
        })
    )
