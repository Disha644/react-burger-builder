import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Layout >
          <Switch>
            {this.props.ings ? <Route path='/checkout' component={Checkout} /> : null}
            <Route path='/orders' component={Orders} />
            <Route exact path='/' component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        </Layout>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
  }
}

export default connect(mapStateToProps)(App);
