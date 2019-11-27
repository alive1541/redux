
export default function applyMiddleware(... middlewares) {
    return function (createStore) {
        return function (...args) {
            const store = createStore(...args) 
            let dispatch = () => {
                throw new Error(
                    `Dispatching while constructing your middleware is not allowed. ` +
                    `Other middleware would not be applied to this dispatch.`
                )
            }
            let chain = []
            const middleAPI = {
                getStore: store.getState,
                dispatch: (...args) => dispatch(...args)
            }
            chain = middlewares.map(middleware => middleware(middleAPI))
            dispatch = compose(...chain)(store.dispatch)
            
            return {
                ...store,
                dispatch
            }
        }
    }
}

function compose(...fns) {
    if(fns.length === 0) return arg => arg
    if(fns.length === 1) return fns[0]
    
    return fns.reduce((a,b) => (...args) => a(b(...args)))
}