import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { authLogout } from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount() {
        //console.log(this.props);
        this.props.onLogout();
        //this.props.history.replace('/');
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);