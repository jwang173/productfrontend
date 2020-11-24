import { NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Aux2/Aux2';
import Logo from '../../Logo/Logo';
// import classes from '../NavigationProds/NavigationProds.css'
import './NavigationProds.css'
import React, { Component } from 'react'
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'


class NavigationProds extends Component {
    state = {
        Type: [],
        SearchValue: ""
    }

    componentDidMount() {
        this.props.onProductListShown();
        // this.props.authRedirectPath = "/"
        console.log(this.props.authRedirectPath)
        if ( this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
        }
        
    }

    inputHandler = (event) => {
        event.preventDefault();
        let value = event.target.value;
        console.log(value);
        this.setState({
            Type: [],
            SearchValue: value
        });
        
    };

    clickHandler = (event, value) => {
        event.preventDefault();
        console.log("Turn");
        if(value === "") {
            console.log("sit 1");
            this.props.onSetAuthRedirectPath('/filter');
            
        } else {
            console.log("sit 2");
            console.log(value)
            this.props.onSetAuthRedirectPath('/list');
            console.log('step2');
            this.props.onSearchList(value);
        }
    }
    
    render() {
        console.log(this.props.searchLoading)
        // const useType = this.CreateList("useType");
        // console.log(useType);
        console.log(this.props.tagList);
        const useType = this.props.tagList;
        // console.log(useType);
        let SelectItems = (
            <span>
                <select name="useType">
                    
                    {useType.map(item => (
                        <option value={item}>{item}</option>
                    ))}
                </select>
            </span>
            )
            let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className="NavigationProds" >
                {authRedirect}
                <span>
                    <Logo />
                </span>
                <span>
                    <NavLink to = "/" exact ="/">Home</NavLink>
                </span>
                <span>

                        <Aux>
                        {SelectItems}
                        </Aux>
                        <Aux>
                            <input id="Search" type="text" placeholder="Search..." onChange={(event) => this.inputHandler(event)}></input>
                        </Aux>
                </span>
                <button onClick={(event)  => this.clickHandler(event,this.state.SearchValue)}>Search</button>
                <button>{this.props.isAuthenticated ? "Project" : "Sign up"}</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tagList: state.productList.tagList,
        prodList: state.productList.productList,
        isAuthenticated: state.auth.token !== null,
        searchList: state.productSearch.searchList,
        authRedirectPath: state.auth.authRedirectPath,
        searchLoading: state.productSearch.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProductListShown: () => dispatch(actions.fetchList()),
        onSearchList: (target) => dispatch(actions.searchList(target)),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),

    }
} 

export default connect(mapStateToProps, mapDispatchToProps)( NavigationProds);