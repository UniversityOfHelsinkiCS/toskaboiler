import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, List, ListItem } from '@material-ui/core'

import {
  postMessageAction,
  getMessagesAction,
} from '../utils/redux/messageReducer'

const MessageComponent = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const messages = useSelector(({ messages }) =>
    messages.data.sort((a, b) => a.body.localeCompare(b.body)),
  )

  const postMessage = () => {
    dispatch(postMessageAction({ message }))
    setMessage('')
  }

  useEffect(() => {
    dispatch(getMessagesAction())
  }, [messages.length, dispatch])

  return (
    <div style={{ paddingTop: '1em' }}>
      <Input
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={() => postMessage()}>
        Send!
      </Button>
      <List>
        {messages.map((m) => (
          <ListItem key={m.id}>{m.body}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default MessageComponent
