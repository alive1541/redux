

export default function createStore(reducer, preloadedState, enhancer) {

    if(enhancer) {
        return enhancer(createStore)(reducer, preloadedState)
    }

    let currentState = preloadedState
    let currentListeners = []
    let nextListeners = currentListeners

    //getState
    function getState() {
        return currentState
    }

    //dispatch
    function dispatch(action) {

        currentState = reducer(currentState, action)

        currentListeners = nextListeners

        for(let i = 0; i < currentListeners.length; i++) {
            const listener = currentListeners[i]
            listener()
        }

        return action
    } 

    //subscribe
    function subscribe(listener) {
        let isSubscribed = true

        ensureCanMutateNextListeners()
        nextListeners.push(listener)

        return function unsubscribe() {
            if(!isSubscribed) {
                return
            }

            isSubscribed = false

            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
        }
    }

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
          nextListeners = currentListeners.slice()
        }
      }


    dispatch({ type: 'redux$$-init$$' })

    return {
        dispatch,
        subscribe,
        getState
    }
}