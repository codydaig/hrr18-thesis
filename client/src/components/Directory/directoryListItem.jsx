import React from 'react'
export default class directoryListItem extends React.Component {
    constructor (props){
        super(props)
    }
  render () {
     return (
      <div>
      <h1> Main Directory </h1>
      {console.log(this.props)}
      </div>
         
   )
  }
}
