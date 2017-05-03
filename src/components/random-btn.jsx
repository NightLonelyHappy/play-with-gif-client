import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getImageData } from '../api';

class RandomButton extends Component {
    requestImageData(id) {
        getImageData(id)
            .then((data) => this.props.setPeerImage({ id, data }));
    }

    async clickHandler() {
        let nextPeerId;
        if (this.props.mainImage.peers.length > 0) {
            let peerIdx = this.props.mainImage.peers.findIndex((elem) => elem.id === this.props.peerImage.id);
            nextPeerId = this.props.mainImage.peers[(peerIdx + 1) % this.props.mainImage.peers.length].id;
        }
        else {
            let findImage = (id) => (elem) => elem.id === id;
            while (true) {
                nextPeerId = (await fetch(`/gifs/${Math.floor(Math.random() * this.props.count)}`)
                    .then((res) => res.json())).id;
                if (!this.props.imageList.find(findImage(nextPeerId))) break;
            }
        }

        this.requestImageData(nextPeerId);
    }

    render() {
        return (
            <Button bsStyle='primary' onClick={this.clickHandler.bind(this)}>Random</Button>
        );
    }
}

RandomButton.propTypes = {
    mainImage: PropTypes.object.isRequired,
    peerImage: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    imageList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(RandomButton);