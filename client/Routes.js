import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
// import Header from "./components/Header";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Home';
import AllProducts from './components/AllProducts/AllProducts';
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/videos' component={AllProducts} />
            <Redirect to='/home' />
          </Switch>
        ) : (
          <Switch>

            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/videos' component={AllProducts} />
            <Route path='/signup' component={Registration} />
            <Route path="/cart" component={ShoppingCart} />

          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
