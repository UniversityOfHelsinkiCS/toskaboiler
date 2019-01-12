import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, List } from 'semantic-ui-react'

import { postMessageAction } from 'Utilities/redux/messageReducer'

const INITIAL_STATE = {
  message: '',
}

class MessageComponent extends Component {
  state = INITIAL_STATE

  handlePost = () => {
    const { postMessage } = this.props
    const { message } = this.state
    postMessage(message)
  }

  handleChange = event => this.setState({ [event.target.id]: event.target.value })

  render() {
    const { messages } = this.props
    const { message } = this.state
    return (
      <div style={{ paddingTop: '1em' }}>
        <Input id="message" value={message} onChange={this.handleChange} />
        <Button color="purple" onClick={this.handlePost}>
          Send!
        </Button>
        <List>
          {messages.map(m => <List.Item key={m.id}>{m.body}</List.Item>)}
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({ messages }) => ({
  messages: messages.data.sort((a, b) => a.body.localeCompare(b.body)),
})

const mapDispatchToProps = dispatch => ({
  postMessage: message => dispatch(postMessageAction({ message })),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent)
