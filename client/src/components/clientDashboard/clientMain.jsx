import React from 'react'
import axios from 'axios'
import cred from '../../../../creds'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {cyan100,grey800} from 'material-ui/styles/colors'
import {browserHistory} from 'react-router'
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

       


export default class clientMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      appointments: [],
      session: {},
      sessionOpen: false,
      value: 'a'
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.beginSession = this.beginSession.bind(this)
    this.endSession = this.endSession.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange (value){ 
    this.setState({
      value: value,
    })
  }


  componentDidMount () {
    const that = this
    const url = `/getclientdata/${localStorage.user_id}`
    this.serverRequest = axios.get(url,{
      headers : {
        authorization: 'Bearer ' + localStorage.id_token
      }
    }).then((practitioners) => {
      that.setState({
        appointments: practitioners.data.appointments
      })
    })
  }

  beginSession (id) {
    browserHistory.push(`/office/${id}`)
  }

  endSession () {
    this.setState({
      sessionOpen : false
    })
  }

  render () {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    }

    const dialogStyle = {
      width: '80%',
      maxWidth: 'none',
      maxHeight: 'none',
      height: '80%',
      backgroundColor: cyan100

    }
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Upcoming Appointments" value="a" >
          <div>
            <h2 style={styles.headline}> Hello {localStorage.name}  </h2>
            <p>
              Upcoming Appoinments Go Here
            </p>
          </div>
        </Tab>
        <Tab label="Past Appointments" value="b">
          <div>
          <h2 style={styles.headline}> Hello {localStorage.name}  </h2> <p>
             Past Appoinments go here
            </p>
          </div>
        </Tab>
      </Tabs>
    )
  }
}