import connectAdvanced from '../components/connectAdvanced'

export default function createConnect({
    connectHOC = connectAdvanced
} = {}) {
    return function connect() {
        return connectHOC()
    }
}