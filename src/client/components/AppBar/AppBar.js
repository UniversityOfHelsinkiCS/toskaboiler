import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar as MuiAppBar, Box, Toolbar, Button } from '@mui/material'

import Logo from './Logo'

const AppBar = () => (
  <MuiAppBar position="static">
    <Toolbar>
      <Box flexGrow={1}>
        <Logo />
      </Box>

      <Button color="inherit" component={Link} to="/messages">
        Messages
      </Button>

      <Button color="inherit" component={Link} to="/counter">
        Counter
      </Button>
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
