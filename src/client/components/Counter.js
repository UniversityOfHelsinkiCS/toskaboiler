import React from 'react'

import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import IncrementIcon from '@mui/icons-material/Add'
import DecrementIcon from '@mui/icons-material/Remove'

import { increment, decrement } from '../state/counter'

const Home = () => {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const handleIncrement = () => dispatch(increment())
  const handleDecrement = () => dispatch(decrement())

  return (
    <>
      <Typography component="h1" variant="h4" mb={2}>
        Counter
      </Typography>

      <Card>
        <CardContent>
          <Box mb={2}>
            This is a counter. Feel free to increment or decrement it!
          </Box>

          <TextField
            label="Counter"
            value={counter.value}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleIncrement}>
                    <IncrementIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleDecrement}>
                    <DecrementIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default Home
