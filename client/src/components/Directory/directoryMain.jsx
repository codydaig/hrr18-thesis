import React from 'react'
import axios from 'axios'
import directoryListItem from './directoryListItem'

export default class directoryMain extends React.Component {
  constructor (props){
    super(props)
    this.state = {
        practitioners: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
  }
  componentDidMount () {
    const that = this
    
    this.serverRequest = axios.get('/getall').then((practitioners)=> {
        that.setState({
            practitioners: practitioners.data
        })
     })
  }
  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    return (
        <div>
     <directoryListItem practitioners={this.state.practitioners}/>
     </div>
         
   )
  }
}
