import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Input, Button, List, ListItem } from '@material-ui/core'

import { postMessageAction, getMessagesAction } from 'Utilities/redux/messageReducer'

const MessageComponent = ({ messages, postMessage, getMessages }) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessages()
  }, [messages.length])

  return (
    <div style={{ paddingTop: '1em' }}>
      <Input id="message" value={message} onChange={e => setMessage(e.target.value)} />
      <Button color="primary" onClick={() => postMessage(message)}>
        Send!
      </Button>
      <List>
        {messages.map(m => <ListItem key={m.id}>{m.body}</ListItem>)}
      </List>
    </div>
  )
}

const mapStateToProps = ({ messages }) => ({
  messages: messages.data.sort((a, b) => a.body.localeCompare(b.body)),
})

const mapDispatchToProps = dispatch => ({
  postMessage: message => dispatch(postMessageAction({ message })),
  getMessages: () => dispatch(getMessagesAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent)
