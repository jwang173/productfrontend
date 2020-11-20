import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds'
import HomeItem from '../../components/HomeItems/HomeItem';
import './ProductSearch.css'

class ProductSearch extends Component {
    componentDidMount() {
        if(this.isAuth) {
            this.props.onSetAuthRedirectPath('/search');
        }
        
    }
    cssJoin = (str1, str2) => {
        return str1+" "+str2;
    }
    render() {
        console.log("Search");
        console.log(localStorage.getItem('token'));
        let isAuth = localStorage.getItem('token');
        console.log(this.props.isAuthenticated);
        // console.log(this.state.auth.token);
        // if(this.props.isAuthenticated) {
        //     console.log("Search");
        // }
        return (
            <div className="ProductSearch">
                <div className={this.cssJoin("ProductSearch","HomeItem")}>
                    <HomeItem />
                    
                </div>
                
                {/* <NavigationProds /> */}
            </div>
        )
    }
}
//isAuthenticate没写好

const mapStateToProps = state => {
    return {
        isAuthenticated: localStorage.getItem('token') !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductSearch)
// export default ProductSearch;
