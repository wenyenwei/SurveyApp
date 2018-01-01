import React, { Component } from 'react';
import {Row, Col, Panel, Table} from 'react-bootstrap';

const Results = ({courseName, courseCount, maxNum}) => (
          <Panel className="coursePanel">
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
          </Panel>
);


export default Results;
