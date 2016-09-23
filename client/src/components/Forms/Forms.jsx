


export default class Main extends React.Component {
   constructor(){
     super()
     this.state = {
        value: ''
 
        }
     }

  render () {
    return (
      <Dialog
          title="So Tell me about yourself"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div>
        <TextField
          id="text-field-controlled"
          title ="name"
          value={this.state.value}
          onChange={this.handleChange}
          hintText="Name"
          floatingLabelText="Name"
          floatingLabelFixed={true}
        />
          </div>
        </Dialog>    
   )
  }
}

    
    
    
    
    
    
    