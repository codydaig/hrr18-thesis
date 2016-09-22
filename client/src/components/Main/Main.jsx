import React from 'react'
import {Card, CardTitle, CardActions, Button} from 'react-mdl'

export default class Main extends React.Component {
  render () {
    return (
      <Card shadow={0} style={{ width: '512px', margin: 'auto', top: '50px' }}>
        <CardTitle style={{color: '#fff', height: '300px', background: 'url(https://s3-us-west-2.amazonaws.com/threepigsphotos/website/TherappLogotemp.png) center no-repeat #f4fab1'}} />
        <CardActions border>
          <Button colored>Get Started</Button>
        </CardActions>
      </Card>
   )
  }
}
