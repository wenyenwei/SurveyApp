import React, { Component } from 'react';
import {Col, Panel, Table, Row} from 'react-bootstrap';

const Results = ({courseName, courseCount, maxNum}) => (
              <Row>
              <Col md={4}>
                <h5 className="courseName">{courseName}</h5>
              </Col>
              <Col md={8}>
                <div>
                  <div 
                    className="countBar" 
                    style={{width:courseCount/maxNum*300}}
                  >
                    {courseCount}
                  </div>
                </div>
              </Col>
              </Row>

);


export default Results;
