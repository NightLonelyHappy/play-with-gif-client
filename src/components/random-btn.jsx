import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RandomButton extends Component {
    requestImageCount() {
        fetch('/gifs?count=true')
            .then((res) => {
                if (res.headers.has('Total-Count')) this.props.setImageCount(1 * res.headers.get('Total-Count'));
                else throw new Error();
            });
    }

    requestImage(nth) {
        fetch(`/gifs/${nth}`)
            .then((res) => res.json())
            .then((obj) => this.props.newImageItem(obj));
    }

    requestImageData(id) {
        // fetch(`/gifs/?id=${id}`)
    }

    async clickHandler() {
        let nextPeerId;
        if (this.props.mainImage.peers.length > 0) {
            let peerIdx = this.props.mainImage.peers.findIndex((elem) => elem.id === this.props.peerImage.id);
            nextPeerId = this.props.mainImage.peers[(nextPeerId + 1) % this.props.mainImage.peers.length].id;
        }
        else {
            while(true) {
                nextPeerId = (await fetch(`/gifs/${Math.floor(Math.random() * this.props.count)}`)
                .then((res) => res.json())).id;
                if (!this.props.imageList.find((elem) => elem.id == nextPeerId)) break;
            }
        }

        requestImageData(nextPeerId);
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