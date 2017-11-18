import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import logo from './FS.svg';
import './App.css';
import ToggleDisplay from 'react-toggle-display';
import {Button, Row, Col, xs, md, iframe} from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {compose, withProps, lifecycle} from 'recompose';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox';

class App extends Component {
  constructor() {
    super();
    this.state = { show: false };

  }
  onChange = (value) => {
    this.setState({ value });
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
      const _ = require('lodash');
      const google = window.google;
      const MapWithASearchBox = compose(
          withProps({
              googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
              loadingElement: <div style={{ height: `100%` }} />,
              containerElement: <div style={{ height: `100vh` }} />,
              mapElement: <div style={{ height: `100%` }} />,
          }),
          lifecycle({
              componentWillMount() {
                  const refs = {}

                  this.setState({
                      bounds: null,
                      center: {
                          lat: 53.3299, lng: -6.2271
                      },
                      markers: [],
                      onMapMounted: ref => {
                          refs.map = ref;
                      },
                      onBoundsChanged: () => {
                          this.setState({
                              bounds: refs.map.getBounds(),
                              center: refs.map.getCenter(),
                          })
                      },
                      onSearchBoxMounted: ref => {
                          refs.searchBox = ref;
                      },
                      onPlacesChanged: () => {
                          const places = refs.searchBox.getPlaces();
                          const bounds = new google.maps.LatLngBounds();

                          places.forEach(place => {
                              if (place.geometry.viewport) {
                                  bounds.union(place.geometry.viewport)
                              } else {
                                  bounds.extend(place.geometry.location)
                              }
                          });
                          const nextMarkers = places.map(place => ({
                              position: place.geometry.location,
                          }));
                          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                          this.setState({
                              center: nextCenter,
                              markers: nextMarkers,
                          });
                          // refs.map.fitBounds(bounds);
                      },
                  })
              },
          }),
          withScriptjs,
          withGoogleMap
      )(props =>
          <GoogleMap
              ref={props.onMapMounted}
              defaultZoom={15}
              center={props.center}
              onBoundsChanged={props.onBoundsChanged}
          >
              <SearchBox
                  ref={props.onSearchBoxMounted}
                  bounds={props.bounds}
                  controlPosition={google.maps.ControlPosition.TOP_RIGHT}
                  onPlacesChanged={props.onPlacesChanged}
              >
                  <input
                      type="text"
                      placeholder="Customized your placeholder"
                      style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          width: `240px`,
                          height: `32px`,
                          marginTop: `27px`,
                          padding: `0 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                      }}
                  />
              </SearchBox>
              {props.markers.map((marker, index) =>
                  <Marker key={index} position={marker.position} />
              )}
          </GoogleMap>
      );

      <MapWithASearchBox />

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
            <ul>
              <li>Museums</li>
              <li>Cafes</li>
              <li>Petrol Stations</li>
              <li>Cinemas</li>
            </ul>
          </Col></ToggleDisplay>
          <div class="arrow-left" onClick={ () => this.handleClick() }></div>
        <Col md={12}>
        <div class="jumbotron">
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <MapWithASearchBox className="mapwithbox"/>
        </Col>
        </Row>
      </div>
    );
  }
}

export default App;
