import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import {cyan100,grey800} from 'material-ui/styles/colors'
import cred from '../../../../creds'


export default class clientMain extends React.Component {
   constructor(props){
     super(props)

     this.state = {
       appointments: [],
       session: {},
       sessionOpen: false
     }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.beginSession = this.beginSession.bind(this)
        this.endSession = this.endSession.bind(this)
        this.openTokInit = this.openTokInit.bind(this)
     }


  componentDidMount () {
    console.log('testing')
    const that = this
    const url = `/getclientdata/${localStorage.user_id}`
     this.serverRequest = axios.get(url).then((practitioners) => {
       console.log(practitioners)
        that.setState({
          appointments: practitioners.data.appointments
        })
    })
  
  }
  componentWillUnmount () {
    this.serverRequest.abort()
  }

  beginSession (id) {
   const that = this
   const url = `/gettoken/${id}`
   axios.get(url).then((session) => {
     that.setState({
       session: session.data
     })
   }).then( () => {
     this.setState({
       sessionOpen : true
     })
   })
}

openTokInit (){
  const session = OT.initSession(cred.tokbox.apikey, this.state.session.tokbox_session)
  session.connect(this.state.session.tokbox_token, (error) => {
      if(!error){
             var publisher = OT.initPublisher('publisher', {
              insertMode: 'append',
              width: '100%',
              height: '100%'
            });
            session.publish(publisher, (err, sucess) => {
              console.log(err, sucess)
            })

      } else {
        console.log('There was an error connecting to the session:', error.code, error.message);
      }
  })


 // console.log(this.state.session.tokbox_token)
}



endSession () {
  this.setState({
    sessionOpen : false
  })
}
  render () {
  
    const actions = [
     <FlatButton
        label="Enter Session"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.openTokInit}
      />,

      <FlatButton
        label="Leave Session"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.endSession}
      />
    ];

      const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: 500,
      margin: 'auto',
      marginTop: 30
    }

    const dialogStyle = {
     width: '80%',
     maxWidth: 'none',
     maxHeight: 'none',
     height: '80%',
     backgroundColor: cyan100

    }



    return (
      <div>
      {this.state.appointments.map((appointment)=> {
        return (
          <div>
          <Card style={style}>  
            <CardHeader
              title={appointment.practname}
              subtitle={appointment.datetime} 
             />
             <FlatButton 
              label="Begin Session" 
              primary={true}
              onTouchTap={this.beginSession.bind(this, appointment.aptId )  }
             
           />
            </Card>

          <Dialog
          title='Please wait for the other party to arrive' 
          style={{backgroundColor: cyan100}}
          contentStyle={dialogStyle}
          modal={false}
          open={this.state.sessionOpen}
          actions={actions}
          >
            <div id='publisher'/> 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem turpis, hendrerit ut tempor ut, pharetra vitae orci. Morbi ac dolor bibendum, porta urna in, efficitur lacus. Vivamus dignissim, sapien et malesuada ultricies, lectus nisl lacinia risus, id eleifend lorem leo ac tellus. Etiam sit amet ipsum nisi. Morbi sed quam maximus, rutrum libero ut, vulputate elit. Integer aliquam posuere ipsum, condimentum dapibus leo facilisis id. Sed eu cursus nisi. Nulla sagittis at nunc vitae facilisis. Praesent lobortis laoreet eleifend. Quisque eu placerat orci. Nunc vel tortor at leo facilisis aliquam quis non elit. Etiam a rhoncus ex, non auctor nunc.

Nulla facilisi. Cras a felis congue, vehicula nisi nec, ultrices dui. Suspendisse leo diam, porta in justo ac, mattis ornare lectus. Nam vel dictum libero. Duis nibh felis, dictum at magna vitae, fermentum auctor elit. Donec sit amet augue arcu. Cras a eleifend quam, eget elementum lacus. Aenean rhoncus tellus neque, vitae rhoncus metus gravida non. Integer massa diam, cursus sed dui ac, condimentum venenatis magna. Nulla sollicitudin nisi ac feugiat euismod.

Fusce congue, ligula in euismod varius, odio elit fringilla quam, quis facilisis nisl orci in ante. Morbi aliquet gravida mi eget cursus. Cras mollis augue nec tortor pharetra porttitor. Vivamus consectetur nunc lorem, nec imperdiet massa semper eget. Sed consequat placerat erat, sit amet iaculis metus eleifend non. Phasellus massa massa, aliquam vestibulum venenatis sed, commodo eget nisl. Vestibulum egestas nisi turpis, eget ornare elit convallis vehicula.

Suspendisse viverra in metus vitae tincidunt. Fusce sit amet iaculis nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tempor sed dolor sed malesuada. Morbi et odio id justo interdum efficitur eget ut nisl. Mauris sit amet eros quis nisi euismod tempus. Duis egestas viverra erat, non tempor lacus varius sit amet. Cras fringilla eros eget justo rutrum ullamcorper.

Nulla imperdiet nunc imperdiet nisl consequat tempor. Morbi ultricies sit amet elit ut accumsan. Phasellus id sapien ac sem iaculis ultricies. Integer laoreet molestie velit, in egestas mauris aliquam eget. Pellentesque non sem ac nisl sollicitudin ornare id a libero. Curabitur sapien nulla, facilisis non condimentum a, sodales vel eros. Integer in diam ac metus finibus maximus. Suspendisse egestas dignissim maximus. Vestibulum auctor consequat ex, vel viverra nisi congue facilisis. Quisque nec diam ullamcorper, laoreet sem sodales, ornare enim. Suspendisse non nibh nec erat vulputate hendrerit. Nulla a augue ac turpis bibendum efficitur.


         
           <div id ="subscriber"></div>

          </Dialog>


   </div>
            
        )
    
      })}
      </div>
   )
  }
}