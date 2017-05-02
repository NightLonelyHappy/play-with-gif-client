import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import ButtonBar from './components/btn-bar';
import Gallery from './components/gallery';
import UploadButton from './components/btn-upload';
import { Grid, Row, Col, Clearfix, Jumbotron, Button } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const imgData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return action.image;
    default:
      return state;
  }
}

const store = createStore(imgData);

class App extends Component {
  state = {
    imgData: null,
    imgChange: false
  }

  onRandom(data) {
    // console.log(data.byteLength);
    this.setState({
      imgData: data
    });
  }

  render() {
    let input;

    return (
      <Provider store={store}>
        <Grid className='text-center'>
          <Row>
            <Col md={4}></Col>
            <Col md={4}><UploadButton /></Col>
            <Col md={4}></Col>
          </Row>
          <Row>
            <Col md={4}></Col>
            <Col md={4}><Gallery /></Col>
            <Col md={4}></Col>
          </Row>
          <Row>
            <Col md={4}></Col>
            <Col md={4}><ButtonBar onRandom={this.onRandom.bind(this)} /></Col>
            <Col md={4}></Col>
          </Row>
        </Grid>
      </Provider>
    );
  }
}

export default App;
