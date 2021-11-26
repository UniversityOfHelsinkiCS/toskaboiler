import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import toskaLogo from './toskaLogoWhite.svg'

const LogoLink = styled(Typography)`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
`

const LogoImg = styled.img`
  height: auto;
  width: 40px;
  margin-right: 8px;
`

const Logo = () => (
  <LogoLink variant="h6" component={Link} to="/">
    <LogoImg src={toskaLogo} alt="Toska" />
    <span>Toskaboiler</span>
  </LogoLink>
)

export default Logo
