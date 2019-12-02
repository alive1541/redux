import React, {Component} from 'react'

import Conext from './Context'

export default class Provider extends Component {
    constructor(props) {
        super(props)
        const { store } = props

        this.state = {
            storeState: store.getState(),
            store
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.subscribe()
    }

    componentDidUpdate(prevProps) {
        if(this.props.store !== prevProps.store) {
            if(this.unsubscibe) this.unsubscibe()
            this.subscribe()
        }
    }

    componentWillUnmount() {
        if(this.unsubscibe) this.unsubscibe()

        this._isMounted = false
    }

    subscribe() {
        const { store } = this.props
        this.unsubscibe = store.subscribe(() => {
            const newStoreState = store.getState()
            if(!this._isMounted) {
                return
            }

            this.setState(providerState => {
                if(providerState.storeState === newStoreState) {
                    return null
                } 
                return {storeState: newStoreState}
            })
        })

        const postMountStoreState = store.getState()
        if(postMountStoreState !== this.state.storeState) {
            this.setState({ storeState: postMountStoreState})
        }
    }

    render() {
        const Context = this.props.context || Conext
        return (
            <Conext.Provider value={this.state}>
                { this.props.children }
            </Conext.Provider>
        )
    }
}

