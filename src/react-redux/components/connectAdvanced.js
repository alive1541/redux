import React, { Component } from 'react'
import { ReactReduxContext } from './Context'

export default function ConnectAdvanced() {
    return function wrapWithConnect(WrapedComponent) {

        class Connect extends Component {

            renderWrappedComponent(value) {
                const { storeState, store } = value
                const { props } = this
                const p = {...storeState, ...props}
                return <WrapedComponent {...p}/>
            }

            render() {
                const Context = this.props.context || ReactReduxContext
                return (
                    <Context.Consumer>
                        {
                           this.renderWrappedComponent
                        }
                    </Context.Consumer>
                )
            }
        }

        return Connect
    }
}
