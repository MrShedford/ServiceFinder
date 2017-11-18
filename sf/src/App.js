import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //needed for bootstrap to work (& terminal :npm install --save bootstrap)
import $ from 'jquery'; 
import React, { Component } from 'react';
import logo from './FS.svg';                                   //import the logo
import './App.css';
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {xs} from 'react-bootstrap';
import {md} from 'react-bootstrap';
import {iframe} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col id="sideNav">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title"></h1>
            <div class="arrow-left"></div>
          </Col>
        <Col md={12}>
        <div class="jumbotron"></div>
        <iframe src="//www.google.com/maps/embed/v1/place?q=Harrods,Brompton%20Rd,%20UK&zoom=17&key=AIzaSyCdv5ReoRkSbxe1pw2yRBELP7mupCW-UgY"></iframe>
        </Col>
        </Row>
      </div>
    );
  }
}

export default App;
