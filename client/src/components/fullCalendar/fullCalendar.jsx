import React from 'react'
import timekit from 'timekit-booking';

export default class FullCalendar extends React.Component {

  componentDidMount () {
    var widget = new timekit()
   
    widget.init({
      email: localStorage.email,
      apiToken: 'y2BucXiB4BHRZY3DVWdWWvrmSZsEzS6g',
      calendar: '5b550089-ab29-4c58-9683-dee67d556025',
      name: "testinonetwo",
      timekitConfig: {
        app:'therapp'
      }
    }) 
  }

  render () {
    const style = {
      maxWidth:'500px',
      margin:'auto',
      width: 600
    }
    return (
   <div style={style} id='bookingjs'/>
   )
  }
}



                    