import React from 'react'
import { Link, Container, Box, Divider } from '@mui/material'
import styled from '@emotion/styled'

import toskaLogo from './toskaLogo.svg'

const Logo = styled.img`
  width: 100px;
  height: auto;
`

const Footer = () => (
  <>
    <Divider />
    <Container sx={{ py: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>
          Contact support:{' '}
          <Link href="mailto:grp-toska@helsinki.fi">grp-toska@helsinki.fi</Link>
        </div>

        <div>
          <a href="https://toska.dev" target="_blank" rel="noreferrer">
            <Logo src={toskaLogo} />
          </a>
        </div>
      </Box>
    </Container>
  </>
)

export default Footer
