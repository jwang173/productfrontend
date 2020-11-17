import React, { Component } from 'react';
import {connect} from 'react-redux';

import ListPage from '../../components/Product/ListPage/ListPage';
import ProductData from '../../datasource/ProductData';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

// import ProductData from '../Data/ProductData';
class ProductList extends Component {
    
    componentDidMount () {
        console.log(this.props);
        this.props.onProductListShown();
        
        // console.log(this.props.prodList.length);
    }
    ConvertType = (arr) => {
        let resArr = [];
        for(let key in arr) {
            resArr.push(arr[key]);
        }
        return resArr;
    }
    render() {
        return (<div>testing</div>)
        // const ProdData = [...this.props.prodList]
        // const ProdData = this.props.prodList;
        // console.log(Object.keys(ProdData));
        // console.log(this.ConvertType(ProdData));
        // let List = (
        //     <span>
        //         {this.ConvertType(ProdData).map(item => (
        //             <ListPage
        //                 key = {item["id"]}
        //                 label = {item["id"]}
        //                 name = {item["name"]} />
        //         ))}
        //     </span>
        // )
        // return (
        //     <span>
        //         {List}
        //         {/* {ProdData["0"]["id"]} */}
        //     </span>
        // )
    }
}

const mapStateToProps = state => {
    return {
        prodList: state.productList.productList,
        isAuthenticated: state.auth.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProductListShown: () => dispatch(actions.fetchList()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)( ProductList, axios )
