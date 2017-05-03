import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavButton from './nav-btn';
import RandomButton from './random-btn';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ButtonBar extends Component {
    nextImage(forward) {
        let peerIdx = this.props.imageList.findIndex((elem) => elem.id === this.props.peerImage.id);
        if (forward && peerIdx >= 0 && peerIdx < (this.props.imageList.length - 1)) {
            this.props.setPeerImage(this.props.imageList[peerIdx + 1]);
        }
        else if (!forward && peerIdx > 0 && peerIdx < this.props.imageList.length) {
            this.props.setPeerImage(this.props.imageList[peerIdx - 1]);
        }
    }

    render() {
        return (
            <div>
                <NavButton style={{ marginRight: '2%' }} onClick={this.nextImage.bind(this, false)} > &lt;&lt; </NavButton>
                <RandomButton />
                <NavButton style={{ marginLeft: '2%' }} onClick={this.nextImage.bind(this, true)}> &gt;&gt; </NavButton>
            </div>
        );
    }
}

ButtonBar.propTypes = {
    setPeerImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(ButtonBar);