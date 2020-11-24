import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux2/Aux2';
import classes from './Layout.css';
import ProductFilter from '../../containers/ProductFilter/ProductFilter';
import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import HomeItem from '../../components/HomeItems/HomeItem';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    cssJoin = (str1, str2) => {
        return str1+" "+str2;
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
        if(!this.props.isAuthenticated) {
            return (
                <Aux className="Layout">
                    {/* <NavigationProds isAuth={this.props.isAuthenticated} /> */}
                    {/* <HomeItem /> */}
                    <main className={this.cssJoin("Layout","HomeItem")}>
                        {this.props.children}
                    </main>
                </Aux>
            )
        }
        else { 
            if(!this.props.isSignal) {
                return (
                    <Aux className="Total">
                        
                        <main className={this.cssJoin("Layout","Content")}>
                            {this.props.children}
                        </main>
                </Aux>
                )
            } else {
                return (
                    <Aux className="Total">
                            <NavigationProds isAuth={this.props.isAuthenticated} />
                            {/* <SideBar className={this.cssJoin("Layout","SideBar")}/> */}
                            <span>
                            <main className={this.cssJoin("Layout","Content")}>
                                {this.props.children}
                            </main>
                            </span>
                    </Aux>
                )
            }
            
        }
        
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isSignal: state.productSearch.signal
    };
};

export default connect( mapStateToProps )( Layout );
