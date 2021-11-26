import React, { useState } from 'react'

import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material'

import SendIcon from '@mui/icons-material/Send'

import useMessages from '../hooks/useMessages'
import useCreateMessage from '../hooks/useCreateMessage'
import PageProgress from './PageProgress'

const Messages = () => {
  const [newMessage, setNewMessage] = useState('')
  const { messages, isLoading, refetch } = useMessages()
  const { mutateAsync, isLoading: isSending } = useCreateMessage()

  if (isLoading) {
    return <PageProgress />
  }

  const handleSend = async (event) => {
    event.preventDefault()

    try {
      await mutateAsync({ message: newMessage })
      setNewMessage('')
      refetch()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <>
      <Typography component="h1" variant="h4" mb={2}>
        Messages
      </Typography>

      <Paper>
        <Box p={2}>
          <form onSubmit={handleSend} disabled={isSending}>
            <TextField
              label="Message"
              value={newMessage}
              disabled={isSending}
              onChange={(event) => setNewMessage(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      color="primary"
                      disabled={isSending}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              required
            />
          </form>
        </Box>
        {messages.length === 0 && (
          <Typography color="textSecondary" align="center">
            No messages yet. Send a message!
          </Typography>
        )}
        <List>
          {messages.map((message, index) => (
            <ListItem key={message.id} divider={index < messages.length - 1}>
              <ListItemText primary={message.body} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  )
}

export default Messages
