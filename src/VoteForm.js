import React, { Component } from 'react';
import './App.css';
import {Col, Panel, FormGroup, ControlLabel, FormControl, Radio, Button} from 'react-bootstrap';


class VoteForm extends Component{
    constructor(props){
      super(props);
      this.state = {
          name: '',
          email: '',
          gender: '',
          age: '',
          courses: [],
          note: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(event){
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      if (name === 'courses'){
        value = this.state.courses;
        value.indexOf(target.value) === -1? value.push(target.value):value.splice(value.indexOf(target.value), 1);
      }
  
      this.setState({[name]: value});
    }
    handleSubmit(e){
        this.props.addSurvey(this.state);
        console.log(this.state);
        setInterval(function(){console.log('test')}, 100000);
    }
    render(){
        return(
           <Col md={6}>
            <Panel>
             <form className="Form" onSubmit={this.handleSubmit}>
              <h4>Course Prior Survey</h4>
              <FormGroup>
                 <Col componentClass={ControlLabel} sm={1}>
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
                  Age
                </Col>
                <Col sm={11}>
                  <FormControl name="age" value={this.state.age} onChange={this.handleChange} componentClass="select" placeholder="select">
                    <option value="under 20">Under 20</option>
                    <option value="20-30">20-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40-50">40-50</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Courses you're interested in</ControlLabel>
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
              <Button type="submit">
                Submit
              </Button>
            </form>
            </Panel>
           </Col>
        );
    }
}

export default VoteForm;
