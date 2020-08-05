import {floor} from 'mathjs'
const formatDuration = (duration) => `${floor(duration/60)}h${duration%60 == 0 ? "00" : duration%60}`

export default formatDuration