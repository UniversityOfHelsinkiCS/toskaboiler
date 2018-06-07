import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import MagicReduxComponent from './MagicReduxComponent'

const INITIAL_STATE = {
  greetings: ['Hello'],
}

export default class OnlyView extends Component {
    state = INITIAL_STATE

    addNewGreeting = newGreeting => () => {
      const { greetings } = this.state
      this.setState({
        greetings: [...greetings, newGreeting],
      })
    }

    render = () => {
      const { greetings } = this.state
      const nextGreeting = `${greetings[greetings.length - 1]}!`
      return (
        <div>
          {this.state.greetings.join(' ')}
          <br />
          <Button color="purple" onClick={this.addNewGreeting(nextGreeting)}>
            {nextGreeting}
          </Button>
          <MagicReduxComponent />
        </div >
      )
    }
}
