import React, { Component } from 'react';
import './App.css';
import {Col, Button, Table, Grid, Row} from 'react-bootstrap';
import VoteForm from './VoteForm';
import Results from './Results';
import * as apiCalls from './api';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


class FullResult extends Component{
    constructor(props){
        super(props);
        this.state = {
          survey: [],
          visible: false
        }
        this.addSurvey = this.addSurvey.bind(this);
        this.showResults = this.showResults.bind(this);
    }
    componentWillMount(){
        this.loadSurveys();
    }
    async loadSurveys(){
      let surveys = await apiCalls.getSurveys();
      this.setState({survey: surveys});        
    } 
    async addSurvey(val){
        let newSurvey = await apiCalls.createSurvey(val);
        this.setState({survey: [...this.state.survey, newSurvey]});
    } 
    async deleteSurvey(id){
        await apiCalls.removeSurvey(id);
        const surveys = this.state.surveys.filter(survey => survey._id !== id);
        this.setState({surveys: surveys});
    }

    async toggleSurvey(survey){
        let updateSurvey = await apiCalls.updateSurvey(survey);
            const surveys = this.state.surveys.map(survey => (survey._id === updateSurvey._id)
            ? {...survey, completed: !survey.completed}
            : survey 
            );
            this.setState({surveys: surveys});
    }
    showResults(){
      this.setState({visible:!this.state.visible});
    }
  
    render(){
        const surveyData = this.state.survey.map((data, i) => (
          <tr>
            <td>{i+1}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.gender}</td>
            <td>{data.age}</td>
            <td>{data.courses}</td>
            <td>{data.text}</td>
          </tr>          
        ));
        return(
          <Grid>
            <Row className="show-grid">
              <Results /> 
              <VoteForm addSurvey = {this.addSurvey} />
            </Row>
            <Row className="show-grid">
              <Col md={12}>
                <Button 
                  bsSize="lg"
                  onClick={this.showResults}/*global showResults*/
                >
                {this.state.visible? "Hide Results":"Show Full Results"}
                </Button>
              </Col>
              <br/>
              <br/>
              <br/>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                <Col animation={true} md={12} style={{display: this.state.visible? 'block':'none'}}>
                  <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Courses</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveyData}
                    </tbody>
                  </Table>
               </Col>       
              </ReactCSSTransitionGroup>
            </Row>
          </Grid>
  
        );
    }
}

export default FullResult;