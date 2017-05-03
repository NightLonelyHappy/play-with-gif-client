import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

class Gallery extends Component {
    reportMatching() {
        fetch(`/relate?id=${this.props.mainImage.id}`, { 
            method: 'PUT', 
            body: { peers: [{ id: this.props.peerImage.id }] } })
            .then((res) => res.status === 200 ? console.log('update relation success') : console.log('update relation failed'));
    }

    render() {
        if (!this.props.mainImage.data) return (<div></div>)
        return (
        <div>
            <img src={"data:image/jpeg;base64," + encode(this.props.mainImage.data)} alt='' style={{cursor:'pointer'}} />
        </div>
        )
    }
}

Gallery.propTypes = {
    mainImage: PropTypes.object.isRequired,
    peerImage: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    mainImage: state.mainImage,
    peerImage: state.peerImage
});

export default connect(mapStateToProps)(Gallery);