import React, { Component } from 'react';
import './App.css';
import {Col, Table, Grid, Row} from 'react-bootstrap';
import VoteForm from './VoteForm';
import Results from './Results';
const APIURL = '/api/survey';

class FullResult extends Component{
    constructor(props){
        super(props);
        this.state = {
          survey: []
        }
        this.addSurvey = this.addSurvey.bind(this);
    }  
  
    addSurvey(val){
      fetch(APIURL, {
          method: 'post',
          headers: new Headers({/*global Headers*/
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify(val)
      })/* global fetch*///add proxy at package.json so this refers to :8081/api/todos
      .then(resp => {
          if (!resp.ok){
              if (resp.status >= 400 && resp.status < 500){
                  return resp.json().then(data => {
                      let err = {errorMessage: data.message};
                      throw err;
                  })
              }else {
                  let err = {errorMessage: 'Please try again later. Server is not responding.'};
                  throw err;
              }
          }
      })
      .then(newSurvey => {
        this.setState({survey: [...this.state.survey, newSurvey]});
      })
    }
    render(){
        return(
          <Grid>
            <Row className="show-grid">
              <Results />
              <VoteForm addSurvey = {this.addSurvey} />
            </Row>
            <Row className="show-grid">
              <Col md={12}>
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
                  </tbody>
                </Table>
             </Col> 
            </Row>
          </Grid>
  
        );
    }
}

export default FullResult;