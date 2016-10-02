import React from 'react'
import {Card, CardTitle, CardActions, Button, Icon} from 'react-mdl'
import Flexbox from 'flexbox-react';
export default class officeMain extends React.Component {
  render () {

    const style = {
      height:500,
      width:500,
      margin: 20,
      padding: 20

    }

    return (
      <div>


<Flexbox flexDirection='row' style={style}>
       <Card shadow={0} >
     <CardTitle>
      </CardTitle>
    </Card>
 
<br/>


 <Card shadow={0} >
     <CardTitle>
      </CardTitle>
    </Card>
 </Flexbox>


   
</div>
   )
  }
}

 

