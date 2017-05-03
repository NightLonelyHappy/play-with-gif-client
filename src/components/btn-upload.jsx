import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { connect } from 'react-redux';
import blake from 'blakejs';

class UploadButton extends Component {
    changeHandler(e) {
        let file = e.target.files[0],
            reader = new FileReader();
        reader.onloadend = async (e) => {
            let image = { data: new Uint8Array(e.target.result) },
                imageCount = 0,
                peerId;
            image.id = blake.blake2bHex(image.imageData);

            await fetch(`/relate?id=${image.id}`)
                .then((res) => res.json())
                .then((obj) => {
                    if (obj.message) {
                        //insert new image to database
                        image.peers = [];
                    }
                    else {
                        image.peers = obj.peers.sort((a, b) => b.percent - a.percent);
                    }
                });

            // create new image & relation record
            if (!(image.peers.length > 0)) {
                let formData = new FormData();
                formData.append('image-data', image.data);
                let imageItem = await fetch('gifs', { method: 'POST', body: formData })
                    .then((res) => res.json());
                console.log(`create item success, id=${imageItem.id}`);
            }

            await fetch('/gifs?count=true')
                .then((res) => res.headers.has('Total-Count') ? imageCount = res.headers.get('Total-Count') : imageCount = 0);

            if (image.peers.length > 0) {
                peerId = image.peers[0].id;
            }
            else {
                peerId = (await fetch(`/gifs/${Math.floor(Math.random() * imageCount)}`)
                    .then((res) => res.json())).id;
            }

            this.props.setMainImage(image);
            this.props.setImageCount(imageCount);
            fetch(`/gifs?id=${peerId}`)
            .then((res) => res.arrayBuffer())
            .then((buffer) => this.props.setPeerImage({id: peerId, data: new Uint8Array(buffer)}));
        };
        reader.readAsArrayBuffer(file);
    }

    render() {
        return (
            <div>
                <input type='file' style={{ margin: 'auto' }} onChange={this.changeHandler.bind(this)} />
            </div>
        );
    }
}

UploadButton.propTypes = {
    setMainImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(UploadButton);