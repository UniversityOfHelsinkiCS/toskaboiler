import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, List } from 'semantic-ui-react'

import { postMessage } from '../util/redux/messageReducer'

const INITIAL_STATE = {
  message: ''
}

class MessageComponent extends Component {
  state = INITIAL_STATE

  handlePost = () => this.props.postMessage(this.state.message)
  handleChange = event => this.setState({ [event.target.id]: event.target.value })

  render() {
    const { messages } = this.props
    return (
      <div style={{ paddingTop: '1em' }}>
        <Input id='message' value={this.state.message} onChange={this.handleChange} />
        <Button color="purple" onClick={this.handlePost}>
          Send!
        </Button>
        <List>
          {messages.map(message => <List.Item key={message.id}>{message.body}</List.Item>)}
        </List>
      </div>
    )
  }
}

const mapStateToProps = ({ messages }) => ({
  messages: messages.data.sort((a, b) => a.body.localeCompare(b.body)),
})

const mapDispatchToProps = dispatch => ({
  postMessage: message => dispatch(postMessage({ message })),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent)
