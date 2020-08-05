import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import rest from '@feathersjs/rest-client'

export const socket_api = io(
    'http://' +
        process.env.REACT_APP_API_IP +
        ':' +
        process.env.REACT_APP_API_PORT
)

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
