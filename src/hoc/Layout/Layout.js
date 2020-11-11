import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux2/Aux2';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import FilterPage from '../../components/Product/FilterPage/FilterPage'
import ProductFilter from '../../containers/ProductFilter/ProductFilter';
import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds';
import productData from '../../datasource/ProductData';
import userData from '../../datasource/UserData';
import SideBar from '../../components/Navigation/SideBar/SideBar';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        
        return (
            <Aux>
                <NavigationProds />
                {/* <SideBar /> */}
                {/* <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} /> */}
                {/* <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} /> */}
                {/* <ProductFilter /> */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );