import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { logout } from '../../../store/actions/index';

const Logout = props => {

    useEffect(() => {
        //console.log(props);
        props.onLogout();
        //props.history.replace('/');
    }, []);

    return <Redirect to="/" />

}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);