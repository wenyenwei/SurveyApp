import React, { Component } from 'react';
import './App.css';
import {Row, Col, Panel, FormGroup, ControlLabel, FormControl, Radio, Button} from 'react-bootstrap';


class VoteForm extends Component{
    constructor(props){
      super(props);
      this.state = {
          name: '',
          email: '',
          gender: '',
          age: '',
          courses: [],
          note: '',
          complete: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkComplete = this.checkComplete.bind(this);
    }

    
    handleChange(event){
      this.setState({validationState: null});
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      if (name === 'courses'){
        value = this.state.courses;
        value.indexOf(target.value) === -1? value.push(target.value):value.splice(value.indexOf(target.value), 1);
      }
  
      this.setState({[name]: value});
    }
    validationState(){
     if(this.state.name.length>0 && 
        this.state.email.length>0 && 
        this.state.gender.length>0 && 
        this.state.age.length>0 && 
        this.state.courses.length>0){
        return false;
      }
      return true;
    }
    checkComplete(event){        

      const emptyRemind = [];
        for (let item in this.state){
          if (this.state[item].length == 0 && item!== 'note'){
            emptyRemind.push(item)
          }
        }
      if (emptyRemind.length > 0){
        {/*alert(emptyRemind.join(', ')+' cannot be empty. Please complete before preceed.');
        event.preventDefault();*/}
        this.setState({complete: false});
      }else {
        this.setState({complete: true});
      }
    }
    
    handleSubmit(){
        alert('Successfully submitted');
        this.props.addSurvey(this.state);
    }

    render(){
        return(
          <Row className="show-grid">
           <Col md={3}/>
           <Col md={6}>
            <Panel>
            {/*<form className="Form" onSubmit={this.handleSubmit}>*/}
            <form className="Form" onSubmit={(e) => {
              //eslint-disable-next-line
              if(confirm('Are you sure to submit?')){this.handleSubmit()};}}
            >
              <h4>Course Prior Survey</h4>
              <FormGroup>
                 <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Name
                </Col>
                <Col sm={5}>
                  <FormControl
                    type="text" 
                    placeholder="Jane Doe"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Email
                </Col>
                <Col sm={5}>
                  <FormControl 
                    type="email" 
                    placeholder="janedoe@mail.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}                  
                  />
                </Col>
              </FormGroup>
              <br/>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Gender
                </Col>
                <Radio 
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={this.handleChange}
                  inline
                >
                  Female
                </Radio>
                <Radio 
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={this.handleChange}
                  inline
                >
                  Male
                </Radio>
                 <Radio 
                  type="radio"
                  name="gender"
                  value="prefer not to state"
                  onChange={this.handleChange}
                  inline
                >
                  Prefer Not to state
                </Radio>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Age
                </Col>
                <Col sm={11}>
                  <FormControl name="age" value={this.state.age} onChange={this.handleChange} componentClass="select" placeholder="select">
                    <option value="">Select</option>
                    <option value="under 20">Under 20</option>
                    <option value="20-30">20-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40-50">40-50</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>
                  <span className="mustFill">*</span>
                  Courses you're interested in
                </ControlLabel>
                <FormControl 
                  name="courses" 
                  value={this.state.courses} 
                  onChange={this.handleChange} 
                  multiple={true} 
                  componentClass="select" 
                >
                  <option value="Python Django">Python Django</option>
                  <option value="Ruby on Rails">Ruby on Rails</option>
                  <option value="NodeJS">NodeJS</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="SQL">SQL</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Is there any other topics you'd like to learn?</ControlLabel>
                <FormControl 
                  componentClass="textarea" 
                  placeholder="Enter text..."
                  name="note"
                  value={this.state.note}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button bsStyle="success" bsSize="large" type="submit" disabled={this.validationState()}>
                Submit
              </Button>
            </form>
            </Panel>
           </Col>
           <Col md={3}/>
          </Row>
        );
    }
}

export default VoteForm;
