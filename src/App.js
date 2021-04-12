import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/index';

const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/authetication' render={() => (
          <Suspense fallback={<div>Loading....</div>}><Auth /></Suspense>
        )} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' render={() => (
            <Suspense fallback={<div>Loading....</div>}><Checkout /></Suspense>
          )} />
          <Route path='/orders' render={() => (
            <Suspense fallback={<div>Loading....</div>}><Orders /></Suspense>
          )} />
          <Route path='/logout' component={Logout} />
          <Route path='/authetication' render={() => (
            <Suspense fallback={<div>Loading....</div>}><Auth /></Suspense>
          )} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout >
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
