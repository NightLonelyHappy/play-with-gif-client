
/*const Gallery = (props) => {
    // if(props.data ) console.log(props.data.byteLength)
    console.log('aaaaaa')
    
    return (
        <div>
            <img src={"data:image/png;base64," + props.data} alt='' />
        </div>
    );
};*/

import React, { Component, PropTypes } from 'react';
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
    render() {
        this.props.data && console.log(this.props.data.byteLength)
        if (!this.props.data) return (<div></div>)
        let bytes = new Uint8Array(this.props.data);
        console.log(encode(bytes))
        return (
        <div>
            <img src={"data:image/jpeg;base64," + encode(bytes)} alt='' />
        </div>
        )
    }
}

Gallery.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.imgData
});

export default connect(mapStateToProps)(Gallery);