import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import ProductFilter from './containers/ProductFilter/ProductFilter'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import ProductList from './containers/ProductList/ProductList';
import UserData from './containers/Data/UserData';
import ProductData from './containers/Data/ProductData';
import ProductCompare from './containers/ProductCompare/ProductCompare';

class App extends Component {
  componentDidMount () {
    console.log(this.props);
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={ProductFilter} />
        <Route path="/detail" component={ProductDetail} />
        <Route path="/list" component={ProductList} />
        <Route path="/compare" component={ProductCompare} />
        <Route path="/userdata" component={UserData} />
        <Route path="/productdata" component={ProductData} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={ProductFilter} />
          <Route path="/detail" component={ProductDetail} />
          <Route path="/list" component={ProductList} />
          <Route path="/userdata" component={UserData} />
          <Route path="/productdata" component={ProductData} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
