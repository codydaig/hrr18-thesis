import React from 'react'
import {cyan200} from 'material-ui/styles/colors'
import { Footer, FooterSection, FooterLinkList } from 'react-mdl'
const footerStyle = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  backgroundColor: cyan200
}
export default class Foot extends React.Component {
  render () {
    return (
      <Footer style={footerStyle} size='mini'>
        <FooterSection type='middle'>
          <FooterLinkList>
          Copyright 2016 Aletheia Technolgies
          </FooterLinkList>
        </FooterSection>
      </Footer>
   )
  }
}
