import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';
// import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds'
import HomeItem from '../../components/HomeItems/HomeItem';
import './ProductSearch.css'
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux2/Aux2';

class ProductSearch extends Component {
    state = {
        Type: [],
        SearchValue: ""
    }
    componentDidMount() {
        this.props.onProductListShown();
        this.props.onSetRouteSignal(false);
        // this.props.onSetAuthRedirectPath('/filter')
        if ( this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
        }
        // this.props.onSetAuthRedirectPath('/filter')
    }
    cssJoin = (str1, str2) => {
        return str1+" "+str2;
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
        console.log("Search");
        console.log(localStorage.getItem('token'));
        console.log(this.props.authRedirectPath);
        // this.props.onSetAuthRedirectPath("/filter");
        console.log(this.props.authRedirectPath);
        // let isAuth = localStorage.getItem('token');
        console.log(this.props.isAuthenticated);
        console.log(this.props.signal);
        // console.log(this.state.auth.token);
        // if(this.props.isAuthenticated) {
        //     console.log("Search");
        // }
        const useType = this.props.tagList;
        console.log(useType);
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
            console.log(this.props.authRedirectPath);
            if (this.props.isAuthenticated) {
                authRedirect = <Redirect to={this.props.authRedirectPath}/>
            }
        return (
            <div className="ProductSearch" >
                {authRedirect}
                <div className="ProductSearch Home">
                    <HomeItem />
                </div>
                <span >
                        <Aux>
                        {SelectItems}
                        </Aux>
                        <Aux>
                            <input className="ProductSearch Enter" id="Search" type="text" placeholder="Search..." onChange={(event) => this.inputHandler(event)}></input>
                        </Aux>
                </span>
                <button onClick={(event)  => this.clickHandler(event, this.state.SearchValue)}>Search</button>
                
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
        signal: state.productSearch.signal,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProductListShown: () => dispatch(actions.fetchList()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
        onSearchList: (target) => dispatch(actions.searchList(target)),
        onSetRouteSignal: (signal) => dispatch(actions.setRouteSignal(signal))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductSearch)
// export default ProductSearch;
