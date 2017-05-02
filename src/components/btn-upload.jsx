import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux' ;

class UploadButton extends Component {
    changeHandler(e) {
        let file = e.target.files[0],
            reader = new FileReader();
        reader.onloadend = (e) => this.props.inputImage(new Uint8Array(e.target.result));
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

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(UploadButton);