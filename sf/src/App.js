import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //needed for bootstrap to work (& terminal :npm install --save bootstrap)
import $ from 'jquery'; 
import React, { Component } from 'react';
import logo from './FS.svg';                                   //import the logo
import ToggleDisplay from 'react-toggle-display';
import './App.css';
import {Button} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {xs} from 'react-bootstrap';
import {md} from 'react-bootstrap';
import {iframe} from 'react-bootstrap';

class App extends Component {

  constructor() {
    super();
    this.state = { show: false };
    
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });

    if($('#sideNav').css("visibility") == "visible"){
      $(".arrow-left").toggleClass("moveCircle");
    }
  }

  render() {
    return (
      <div className="App">
        <Row>
        <ToggleDisplay show={this.state.show}>
          <Col id="sideNav" className={this.props.shouldHide ? 'hidden' : ''}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title"></h1>
          </Col></ToggleDisplay>
          <div class="arrow-left" onClick={ () => this.handleClick() }></div>
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
