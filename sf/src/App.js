import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //needed for bootstrap to work (& terminal :npm install --save bootstrap)
import $ from 'jquery'; 
import React, { Component } from 'react';
import logo from './FS.svg';                                   //import the logo
import ToggleDisplay from 'react-toggle-display';
import './App.css';
import {Button, Row, Col, xs, md, iframe} from 'react-bootstrap';



class App extends Component {

  constructor() {
    super();
    this.state = { show: false };
    
  }

  onChange = (value) => {
    this.setState({ value });
  };

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
          <div class="sentext">
            <img src={logo} className="App-logo" alt="logo" id="navLogo"/>
          </div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <Button type="submit"><span class="glyphicon glyphicon-search"></span></Button>
            </form>
          </Col></ToggleDisplay>
          <div class="arrow-left" onClick={ () => this.handleClick() }></div>
        <Col md={12}>
        <div class="jumbotron">
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <iframe src="//www.google.com/maps/embed/v1/place?q=Harrods,Brompton%20Rd,%20UK&zoom=17&key=AIzaSyCdv5ReoRkSbxe1pw2yRBELP7mupCW-UgY"></iframe>
        </Col>
        </Row>
      </div>
    );
  }


}

export default App;
