import React, { Component } from 'react';
import './App.css';
import {Col, Panel, FormGroup, ControlLabel, FormControl, Radio, Button} from 'react-bootstrap';

class VoteForm extends Component{

    render(){
        return(
           <Col md={6}>
            <Panel>
             <form className="Form">
              <h4>Course Prior Survey</h4>
              <FormGroup>
                 <Col componentClass={ControlLabel} sm={1}>
                  Name
                </Col>
                <Col sm={5}>
                  <FormControl type="text" placeholder="Jane Doe" />
                </Col>
                <Col componentClass={ControlLabel} sm={1}>
                  Email
                </Col>
                <Col sm={5}>
                  <FormControl type="email" placeholder="janedoe@mail.com" />
                </Col>
              </FormGroup>
              <br/>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                  Gender
                </Col>
                <Radio name="radioGroup" inline>
                  Female
                </Radio>
                <Radio name="radioGroup" inline>
                  Male
                </Radio>
                <Radio name="radioGroup" inline>
                  Prefer Not to state
                </Radio>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={1}>
                  Age
                </Col>
                <Col sm={11}>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select">Select</option>
                    <option value="other">Under 20</option>
                    <option value="other">20-30</option>
                    <option value="other">30-40</option>
                    <option value="other">40-50</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Courses you're interested in</ControlLabel>
                <FormControl componentClass="select" multiple>
                  <option value="select">Select (multiple)</option>
                  <option value="other">Python Django</option>
                  <option value="other">Ruby on Rails</option>
                  <option value="other">NodeJS</option>
                  <option value="other">Machine Learning</option>
                  <option value="other">SQL</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Is there any other topics you'd like to learn?</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Enter text..." />
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
