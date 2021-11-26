import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'

import queryClient from './utils/queryClient'
import { BASE_PATH } from './config'
import theme from './theme'
import store from './state/store'
import App from './components/App'
import ErrorBoundary from './components/ErrorBoundary'

render(
  <Provider store={store}>
    <BrowserRouter basename={BASE_PATH}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <ThemeProvider theme={theme}>
            <ReactQueryDevtools />
            <CssBaseline />
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </ThemeProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
