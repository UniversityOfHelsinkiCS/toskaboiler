import { createTheme, responsiveFontSizes } from '@mui/material'

const theme = createTheme({
  palette: {
    background: {
      default: '#f3f5f6',
    },
  },
})

export default responsiveFontSizes(theme)
