import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RandomButton extends Component {
    requestImageCount() {
        fetch('/gifs?count=true')
            .then((res) => {
                if (res.headers.has('Total-Count')) setImageCount(1 * res.headers.get('Total-Count'));
                else throw new Error();
            });
    }

    requestImage(nth) {
        fetch(`/gifs/${nth}`)
            .then((res) => res.json())
            .then((obj) => newImageItem(obj));
    }

    requestImageData(id) {
        // fetch(`/gifs/?id=${id}`)
    }

    clickHandler() {

    }

    render() {
        return (
            <Button bsStyle='primary' onClick={this.clickHandler.bind(this)}>Random</Button>
        );
    }
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(RandomButton);