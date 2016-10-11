import React from 'react';
import {Card, CardTitle, CardActions, CardText, Button, Textfield}  from 'react-mdl';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReactS3Uploader from 'react-s3-uploader';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import axios from 'axios';
import timekit from 'timekit-sdk';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import ProvinceState from '../../statesprovince/stateprovince';
import Avatar from 'material-ui/Avatar';
import AccountsCircle from '../../../../node_modules/material-ui/svg-icons/action/account-circle.js';
import {Step,Stepper,StepButton,StepLabel} from 'material-ui/Stepper';
import {cyan800,grey800} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Infinite from 'react-infinite'
import autoComplete from '../../autocomplete/autocomplete'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Chip from 'material-ui/Chip';

export default class pForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      oneline: '',
      website: '',
      photo: 'https://s3-us-west-2.amazonaws.com/therappimages/1476084136_human.png',
      certtype: '',
      certbody: '',
      certnumber: '',
      calendar: '',
      timekey: '',
      bio: '',
      value : 1,
      provincestate: ProvinceState.us,
      provinceStateSelection: '',
      loading: false,
      finished: false,
      stepIndex: 0,
      areaSelection: '',
      areas: [],
      serve: [],
      serveSelection:'',
      modalities: [],
      modalitiesSelection: '',
      issues: [],
      issuesSelection: '',
    }

    this.styles = {
      chip: {
        margin: 4,
      },

      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    }

    this.submitform = this.submitform.bind(this)
    this.onChangeIntro = this.onChangeIntro.bind(this)
    this.onChangeWebsite = this.onChangeWebsite.bind(this)
    this.onChangeCertType = this.onChangeCertType.bind(this)
    this.onChangeCertBody = this.onChangeCertBody.bind(this)
    this.onChangeCertNumber = this.onChangeCertNumber.bind(this)
    this.onChangeBio = this.onChangeBio.bind(this)
    this.countryChange = this.countryChange.bind(this)
    this.submitform = this.submitform.bind(this)
    this.onChangeProvinceState = this.onChangeProvinceState.bind(this)
    this.uploadComplete = this.uploadComplete.bind(this)
    this.dummyAsync = this.dummyAsync.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.addArea = this.addArea.bind(this)
    this.onChangeArea = this.onChangeArea.bind(this)
    this.handleRequestDeleteServe = this.handleRequestDeleteServe.bind(this)
    this.addService = this.addService.bind(this)
    this.onChangeService = this.onChangeService.bind(this)
    this.onChangeModalities = this.onChangeModalities.bind(this)
    this.addModality = this.addModality.bind(this)
    this.handleRequestDeleteModalities = this.handleRequestDeleteModalities.bind(this)
    this.renderChipModalities = this.renderChipModalities.bind(this)
    this.handleRequestDeleteIssues = this.handleRequestDeleteIssues.bind(this)
    this.renderChipIssues = this.renderChipIssues.bind(this)
    this.onChangeIssues = this.onChangeIssues.bind(this)
    this.addIssues = this.addIssues.bind(this)
    this.renderChipAreas = this.renderChipAreas.bind(this)
    this.handleRequestDeleteAreas = this.handleRequestDeleteAreas.bind(this)
  }

  onChangeModalities(value){
    this.setState({
      modalitiesSelection: value
    })
  }

  onChangeIssues(value){
    this.setState({
      issuesSelection: value
    })
  }

  addIssues(){
    const issuesList = autoComplete.credentials.issues
    const mdIdx = issuesList.indexOf(this.state.issuesSelection)
    this.state.issues.push({key:mdIdx, label: this.state.issuesSelection})
    this.setState({issuesSelection:''})
    this.forceUpdate()
    console.log(this.state.issues)
  }

  addModality(){
    const modalitiesList = autoComplete.credentials.modalities
    const mdIdx = modalitiesList.indexOf(this.state.modalitiesSelection)
    this.state.modalities.push({key:mdIdx, label: this.state.modalitiesSelection})
    this.setState({modalitiesSelection:''})
    this.forceUpdate()
    console.log(this.state.modalities)
  }
  onChangeService(value){
    this.setState({
      serveSelection : value
    })
  }

  addService(){
    const serviceList = autoComplete.credentials.service
    const serviceIdx = serviceList.indexOf(this.state.serveSelection)
    this.state.serve.push({key:serviceIdx, label: this.state.serveSelection})
    this.setState({serveSelection:''})
    this.forceUpdate()
  }

  handleRequestDeleteServe (key) {
    this.serve = this.state.serve;
    const chipToDelete = this.serve.map((chip) => chip.key).indexOf(key);
    this.serve.splice(chipToDelete, 1);
    this.setState({serve: this.serve});
  }
   
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDeleteServe(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    )
  }

  handleRequestDeleteModalities (key) {
    this.modalities = this.state.modalities;
    const chipToDelete = this.modalities.map((chip) => chip.key).indexOf(key);
    this.modalities.splice(chipToDelete, 1);
    this.setState({modalities: this.modalities});
  }
   
  renderChipModalities(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDeleteModalities(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    )
  }

  handleRequestDeleteIssues (key) {
    this.issues = this.state.issues;
    const chipToDelete = this.issues.map((chip) => chip.key).indexOf(key);
    this.issues.splice(chipToDelete, 1);
    this.setState({issues: this.issues});
  }
   
  renderChipIssues(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDeleteIssues(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    )
  }

  addArea () {
    const areasList = this.state.provincestate
    const areasIdx = areasList.indexOf(this.state.areaSelection)
    this.state.areas.push({key:areasIdx, label: this.state.areaSelection})
    this.setState({areaSelection:''})
    this.forceUpdate()
  }

  onChangeArea (value) {
    this.setState({
      areaSelection: value
    })
  }

  handleRequestDeleteAreas (key) {
    this.areas = this.state.areas;
    const chipToDelete = this.areas.map((chip) => chip.key).indexOf(key);
    this.areas.splice(chipToDelete, 1);
    this.setState({areas: this.areas});
  }
   
  renderChipAreas(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDeleteAreas(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    )
  }

  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

  handleNext () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  }

  handlePrev () {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  getStepContent(stepIndex) {
    
    const style = {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: 'auto',
      width: '100%',
      marginTop: 25,
      position:'relative'
    }
  
    const avatarStyle = {
      position: 'relative',
      marginTop:10
    }

    const textStyle ={
      width: '80%'
    }

    const chipStyles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    }

    switch (stepIndex) {
    case 0:
      return (
    <div>
     <Paper style={style} zDepth={4}>
   <br/>
  
  <Avatar
   style={avatarStyle}
   size={100}
   src={this.state.photo}
   backgroundColor={cyan800}
   >
   </Avatar>
   <h6>Upload a photo for your profile</h6>
 
  <ReactS3Uploader
    signingUrl="/s3/sign"
    accept="image/*"
    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    contentDisposition="auto"
    onFinish={this.uploadComplete}
    />
  
   <br/>
    <h6>Tell us where in the  US or Canada you are</h6>
      <SelectField value={this.state.value} onChange={this.countryChange} style={{fontSize:12}}>
      <MenuItem value={1} primaryText="United States" label="United States"/>
      <MenuItem value={2} primaryText="Canada" label="Canada" />
    </SelectField>
     
    <AutoComplete
      hintText="Province or State"
      dataSource={this.state.provincestate}
      onNewRequest={this.onChangeProvinceState}
    />
    <h6>Do you have a website?</h6>
    <TextField 
     hintText="Website"
     underlineShow={true} 
     value={this.state.website }
     onChange={this.onChangeWebsite}
     />
     <br/>
   </Paper>
  </div>
        );
    case 1:
      return (
          <div>
          <Paper style={style} zDepth={4}>
          <h6 style={{margin:5}}>Tell us about your credentials, if desired upload documention to gain verified status </h6>
           <AutoComplete 
            hintText="Certification Type"
            underlineShow={true} 
            value={this.state.certtype }
            onNewRequest={this.onChangeCertType}
            dataSource={autoComplete.credentials.certType}
            onUpdateInput={this.onChangeCertType}
            />
 
           <AutoComplete
             hintText="Certifcation Body"
             underlineShow={true}
             value={this.state.certbody}
             onNewRequest={this.onChangeCertBody}
             dataSource={autoComplete.credentials.certBody}
             onUpdateInput={this.onChangeCertBody}
            />
      
           <TextField 
            hintText="Certifcation Number"  
            value={this.state.certnumber }
            onChange={this.onChangeCertNumber}
            underlineShow={true} 
            />
           <h6>Upload your credentials</h6>
           <ReactS3Uploader
             signingUrl="/s3/sign"
             accept="pdf/*"
             uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
             contentDisposition="auto"
             onFinish={this.uploadComplete}
             />
            <h6>Are you able to see clients outside your current state/province? 
            <br/>
            Read this document to find out</h6>
           
           <AutoComplete
             hintText="Areas Licensed to Practice"
             underlineShow={true}
             dataSource={this.state.provincestate}
             onNewRequest={this.onChangeArea}
              searchText={this.state.areaSelection}
            />
 
          <FlatButton
           label="Add" 
           primary={true} 
           onTouchTap={this.addArea}
           />
          <br/>
            <div style={chipStyles.wrapper}>
            {this.state.areas.map(this.renderChipAreas, this)}
            </div>
           </Paper>    
         </div>
        );
    case 2:
      return (
            <Paper style={style} zDepth={4}>

            <div style={style}>
            <h7>Who do you serve?</h7>
            <AutoComplete
             dataSource={autoComplete.credentials.service}
             onNewRequest={this.onChangeService}
             searchText={this.state.serveSelection}
            />

            <FlatButton
             label="Add" 
             primary={true}
             onTouchTap={this.addService} 
            />

           <div style={chipStyles.wrapper}>
            {this.state.serve.map(this.renderChip, this)}
           </div>
           <br/>
           
            <h7>What modulaties do you use?</h7>
             <AutoComplete
             dataSource={autoComplete.credentials.modalities}
             onNewRequest={this.onChangeModalities}
             searchText={this.state.modalitiesSelection}
            />
            <FlatButton
             label="Add" 
             primary={true}
             onTouchTap={this.addModality}
              />

            <div style={chipStyles.wrapper}>
            {this.state.modalities.map(this.renderChipModalities, this)}
            </div>

            <h7>What issues do you address?</h7>
             <AutoComplete
             dataSource={autoComplete.credentials.issues}
             onNewRequest={this.onChangeIssues}
             searchText={this.state.issuesSelection}
            />
            <FlatButton
             label="Add" 
             primary={true} 
             onTouchTap={this.addIssues}
              />
            <div style={chipStyles.wrapper}>
            {this.state.issues.map(this.renderChipIssues, this)}
            </div>
             </div>
            </Paper>
            )
    default:
      return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent () {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <RaisedButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }
  
  uploadComplete(url){
    const imgURL = 'https://s3-us-west-2.amazonaws.com/therappimages/' + url.filename
    this.setState({
      photo: imgURL
    })
  }

  countryChange (event, index, value) {
    this.setState({value})
    setTimeout(()=>{
      if(this.state.value === 1){
        this.setState({provincestate : ProvinceState.us })
      }
      else {
        this.setState({provincestate: ProvinceState.canada })
      }
      console.log(this.state)
    }, 100)
  } 

  onChangeProvinceState(value){
    this.setState({
      provinceStateSelection : value
    })
  }

  onChangeIntro(event){
    this.setState({
      oneline: event.target.value
    })
  }

  onChangeWebsite(event){
    this.setState({
      website: event.target.value
    })
  }

  onChangeCertType(event){
    this.setState({
      certtype: event.target.value
    })
  }

  onChangeCertBody(value){
    console.log(event)
    this.setState({
      certbody: value
    })
    console.log(this.state)
  }

  onChangeCertNumber(event){
    this.setState({
      certnumber: event.target.value
    })
  }

  onChangeBio (event){
    this.setState({
      bio: event.target.value
    })
  }

  submitform () {
    const url = `/updateprofile/${localStorage.user_id}`
    const payload = {
      oneline: this.state.oneline,
      website: this.state.website,
      certtype: this.state.certtype,
      certbody: this.state.certbody,
      certnumber: this.state.certnumber,
      bio: this.state.bio,
      stateprovince : this.state.provinceStateSelection,
      photo: this.state.photo
    }
    console.log(payload, url)
    axios.post(url, payload).then(()=>{
      console.log('success')
    }).catch((err)=>{console.log(err)})
     
    this.setState({
      oneline: '',
      website: '',
      certtype: '',
      certbody: '',
      certnumber: '',
      calendar: '',
      timekey: '',
      photo: '',
      stateprovince: '',
      bio: ''
    })

    browserHistory.push('/pdash')
  }

  render () {
    const {loading, stepIndex} = this.state;
    return (
   <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>General Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Practice Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Details Continued</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
   )
  }
}