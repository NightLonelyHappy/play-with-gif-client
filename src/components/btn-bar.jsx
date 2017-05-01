import React, { Component, PropTypes } from 'react';
import NavButton from './nav-btn';
import RandomButton from './random-btn';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';

class ButtonBar extends Component {
    // getImageData() {
    //     fetch('zly.jpg')
    //     .then((res) => res.arrayBuffer()
    //     .then((data) => this.props.onRandom(data)));
    // }

    getImageData() {
        fetch('zly.jpg')
            .then((res) => res.arrayBuffer()
                .then((data) => this.props.dispatch({type: 'SET_IMAGE', image: {imgData: data}})));
    }

    render() {
        return (
            <div>
                <Button bsStyle='link' style={{ marginRight: '2%' }}> &lt;&lt; </Button>
                <Button bsStyle='primary' onClick={this.getImageData.bind(this)}>Random</Button>
                <Button bsStyle='link' style={{ marginLeft: '2%' }}> &gt;&gt; </Button>
            </div>
        );
    }
}

ButtonBar.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(ButtonBar);