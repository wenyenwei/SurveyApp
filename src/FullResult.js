import React, { Component } from 'react';
import './App.css';
import {Col, Button, Table, Grid, Row, Panel} from 'react-bootstrap';
import VoteForm from './VoteForm';
import Results from './Results';
import NavbarInstance from './Nav';
import * as apiCalls from './api';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class FullResult extends Component{
    constructor(props){
        super(props);
        this.state = {
          survey: [],
          visible: false,
          courses: [],
          maxNume: 1
        }
        this.addSurvey = this.addSurvey.bind(this);
        this.showResults = this.showResults.bind(this);
        this.loadSurveys = this.loadSurveys.bind(this);
        this.countVotes = this.countVotes.bind(this);
    }
    componentWillMount(){
        this.loadSurveys();
    }
    async loadSurveys(){
      let surveys = await apiCalls.getSurveys();
      this.setState({survey: surveys}); 
      this.countVotes();
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
    countVotes(){
      let counts = {};
      console.log(this.state.survey);
      this.state.survey.map((data) => {
        for (let course of data.courses){
          counts[course] = counts[course]+1 || 1;
        }
      });
      var count = 0;
      var maxNum = '';
      for (let i in counts){
        if (parseInt(counts[i]) > count){
              count = counts[i];
              maxNum = i;
            }
        }
      this.setState({courses: counts, maxNum: count});
    }
  
    render(){
        const surveyData = this.state.survey.map((data, i) => (
          <tr key={data._id}>
            <td>{i+1}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.gender}</td>
            <td>{data.age}</td>
            <td>{data.courses.join('/ ')}</td>
            <td>{data.text}</td>
          </tr>          
        ));
       let countResults = [];
       let courseId = 0;
       for (let course in this.state.courses){
         console.log(course,this.state.courses[course]);
         courseId++;
          countResults.push(
            <Results 
              key = {courseId}
              maxNum = {this.state.maxNum}
              courseName = {course}
              courseCount = {this.state.courses[course]}
            />          
          );
        }

        return(
          <div className="App">
          <NavbarInstance />
          <header className="App-header">
            <img src="http://www.industrialui.com/wp-content/uploads/2016/12/256x256.png" className="App-logo" alt="logo" />
            <h1 className="App-title">WELCOME TO SURVEYAPP</h1>
          </header>
          <br/>
          <Grid>
            <Row className="show-grid">
              <Col md={6}>
               <Panel>
                {countResults} 
               </Panel>
              </Col>
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
                <Col md={12} style={{display: this.state.visible? 'block':'none'}}>
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
            </Row>
          </Grid>
        </div>
  
        );
    }
}

export default FullResult;