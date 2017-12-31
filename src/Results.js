import React, { Component } from 'react';
import {Col, Panel, Table} from 'react-bootstrap';

class Results extends Component{
    render(){
        return(
           <Col md={6}>
              <Panel>
                <Col md={2}>
                  <h4></h4>
                </Col>
                <Col md={10}>
                  <div></div>
                </Col>
              </Panel>
           </Col> 
        );
    }
}

export default Results;
