
export default function combineReducers(reducers) {
    const reducersKeys = Object.keys(reducers)
    const finalReducers = {}

    for(let i = 0; i < reducersKeys.length; i++) {
        const key = reducersKeys[i]
        if(typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    }

    const finalReducersKey = Object.keys(finalReducers)

    return function combination(state = {}, action) {
        let hasChanged = false
        const nextState = {}
        for(let i = 0; i < finalReducersKey.length; i++) {
            const key = finalReducersKey[i]
            const reducer = finalReducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        return hasChanged ? nextState : state
    }
}
