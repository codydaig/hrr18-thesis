import React from 'react'
import {Card, CardTitle, CardActions, Button} from 'react-mdl'

export default class clientMain extends React.Component {
  render () {
    return (
      <Card shadow={0} style={{ width: '512px', margin: 'auto', top: '50px' }}
       >
        <CardTitle style={{color: 'black', height: '300px'}}> {localStorage.name} </CardTitle>
        <CardActions border>
          <Button colored>“Client Page"</Button>
        </CardActions>
      </Card>
   )
  }
}