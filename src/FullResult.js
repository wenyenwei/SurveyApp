import React, { Component } from 'react';
import classes from './App.css';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Col, Button, Table, Grid, Row, Panel, Image} from 'react-bootstrap';
import VoteForm from './VoteForm';
import Results from './Results';
import * as apiCalls from './api';
import {BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Auth from './Auth/Auth';


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
        const surveyData = this.state.survey.map((data, i) => {
          return(
          <tr key={data._id}>
            <td>{i+1}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.gender}</td>
            <td>{data.age}</td>
            <td>{data.courses.join('/ ')}</td>
            <td>{data.text}</td>
          </tr>          
        )});
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
        <Navbar inverse collapseOnSelect className={classes.navbar}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">SurveyApp</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to="/join_course_survey" className={classes.Link}>Join Course Survey</Link></NavItem>
              <NavItem eventKey={2}><Link to="/show_result" className={classes.Link}>Show Results</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login" className={classes.Link}>Login</Link></NavItem>
              <NavItem eventKey={2} href="#">Sign up</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <header className={classes.AppHeader}>
          <Grid>
          <Row className="show-grid">
          <Col lg={5} md={5} sm={5}></Col>
          <Col lg={2} md={2} sm={2}>
          <img src="http://www.industrialui.com/wp-content/uploads/2016/12/256x256.png" className={classes.AppLogo} alt="logo" />
          </Col>
          <Col lg={5} md={5} sm={5}></Col>
          </Row>
          <Row className="show-grid">
          <Col lg={4} md={4} sm={4}></Col>
          <Col lg={4} md={4} sm={4}>
          <h1 className={classes.AppTitle}>Course Prior Survey</h1>
          </Col>
          <Col lg={4} md={4} sm={4}></Col>
          </Row>
        </Grid>

        </header>
        <br />

        <Route exact path="/show_result" render={() => {         
          return(
          <Grid>
            <Row className="show-grid">
              <Col lg={12} md={12} sm={12}>
              <Panel>
                <Col lg={5} md={5} sm={5}></Col>
                <Col lg={2} md={2} sm={2}>
                <Image 
                  style={{display: this.state.loading? 'block':'none'}} 
                  src="https://loading.io/spinners/wave/lg.wave-ball-preloader.gif" 
                  responsive
                />
                </Col>
                <Col lg={5} md={5} sm={5}></Col>
                <Col lg={12} md={12} sm={12}>{countResults}</Col>
              </Panel>
              </Col>
            </Row>        
            <Row className="show-grid">
              <Col lg={4} md={4} sm={4}></Col>
              <Col lg={4} md={4} sm={4}>
                <Button
                  className={classes.button}
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
              <Col lg={4} md={4} sm={4}></Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className={this.state.visible? classes.showModal:classes.hideModal}>
                  <Table striped bordered condensed hover className={classes.formTable}>
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
              <Col lg={2} md={2} sm={2} xs={2} xxs={2} />
              <Col lg={8} md={8} sm={8} xs={8} xxs={8}>
                <VoteForm 
                  addSurvey={this.addSurvey}
                />
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} xxs={2} />
            </Row>
          </Grid>
        );
        }}/>
        
        <Route exact path="/" render={()=>
          (<Redirect to="/join_course_survey"/>
          )
        }/>
        
        <Route exact path="/login" render={()=>
          {
          return(
          <Grid>
            <Row className="show-grid">
                <Auth />
            </Row>
          </Grid>
        );
        }}/>
      </div>
      </Router>

  
        );
    }
}

export default FullResult;