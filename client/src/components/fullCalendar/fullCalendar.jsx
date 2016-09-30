import React from 'react'
import timekit from '../util/booking';

export default class FullCalendar extends React.Component {

  componentDidMount () {
   var widget = new timekit()
   
   widget.init({
       email: localStorage.email,
       apiToken: localStorage.timekit_token,
       calendar: '5b550089-ab29-4c58-9683-dee67d556025',
       name: "testinonetwo",

       timekitConfig: {
           app:'therapp'
       }
     
   }) 
  }

  render () {
    return (
    <div>
   <h1> Full Calendar </h1>
   <div id='bookingjs'/>
   </div>
   )
  }
}



                    