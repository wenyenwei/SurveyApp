import React, { Component } from 'react';
import './App.css';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Col, Button, Table, Grid, Row, Panel, Image} from 'react-bootstrap';
import VoteForm from './VoteForm';
import Results from './Results';
import * as apiCalls from './api';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

class FullResult extends Component{
    constructor(props){
        super(props);
        this.state = {
          survey: [],
          visible: false,
          courses: [],
          maxNume: 1,
          loading: false
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
       this.state.loading = true;
       for (let course in this.state.courses){
         courseId++;
          countResults.push(
            <Results
              style={{display: this.state.loading? 'none':'block'}}
              key = {courseId}
              maxNum = {this.state.maxNum}
              courseName = {course}
              courseCount = {this.state.courses[course]}
            />          
          );
          this.state.loading = false;  
        }

    return(
      <Router>
       <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">SurveyApp</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to="/join_course_survey" className="Link">Join Course Survey</Link></NavItem>
              <NavItem eventKey={2}><Link to="/show_result" className="Link">Show Results</Link></NavItem>
            </Nav>
            {/*<Nav pullRight>
              <NavItem eventKey={1} href="#">Login</NavItem>
              <NavItem eventKey={2} href="#">Sign up</NavItem>
            </Nav>*/}
          </Navbar.Collapse>
        </Navbar>  
        <header className="App-header">
          <img src="http://www.industrialui.com/wp-content/uploads/2016/12/256x256.png" className="App-logo" alt="logo" />
          <h1 className="App-title">WELCOME TO SURVEYAPP</h1>
        </header>
        <br/>
        
        <Route exact path="/show_result" render={() => {         
          return(
          <Grid>
            <Row className="show-grid">
              <Col md={12}>
              <Panel>
                <Col md={5}></Col>
                <Col md={2}>
                <Image 
                  style={{display: this.state.loading? 'block':'none'}} 
                  src="https://loading.io/spinners/wave/lg.wave-ball-preloader.gif" 
                  responsive
                />
                </Col>
                <Col md={5}></Col>
                <Col md={12}>{countResults}</Col>
              </Panel>
              </Col>
            </Row>        
            <Row className="show-grid">
              <Col md={12}>
                <Button
                  className="button"
                  bsSize="large"
                  onClick={this.showResults}/*global showResults*/
                >
                {this.state.visible? 
                  <p>Hide Results<i className="fa fa-chevron-up"></i></p>
                  :
                  <p>Show Full Results<i className="fa fa-chevron-down"></i></p>
                }
                </Button>
              </Col>
                <Col md={12} sm={12} className={this.state.visible? "showModal":"hideModal"}>
                  <Table striped bordered condensed hover className="formTable">
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
         );
        }}/>

        <Route exact path="/join_course_survey" render={()=>{
          return(
          <Grid>
            <Row className="show-grid">
              <VoteForm 
                addSurvey={this.addSurvey}
              />
            </Row>
          </Grid>
        );
        }}/>
        
        <Route exact path="/" render={()=>
          (<Redirect to="/join_course_survey"/>
          )
        }/>
      </div>
      </Router>

  
        );
    }
}

export default FullResult;