import React, { Component } from 'react';
import {connect} from 'react-redux';

import ListPage from '../../components/Product/ListPage/ListPage';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import "./ProductList.css"
import Aux from '../../hoc/Aux2/Aux2';

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
    cssJoin = (str1, str2) => {
        return str1+" "+str2;
    }
    render() {
        // return (<div>testing</div>)
        // const ProdData = [...this.props.prodList]
        const ProdData = this.props.prodList;
        // console.log(this.props.prodList);
        // console.log(this.props.tagList);
        // console.log(Object.keys(ProdData));
        // console.log(this.ConvertType(ProdData));
        let List = (
            <span>
                {this.ConvertType(ProdData).map(item => (
                    <ListPage
                        key = {item["id"]}
                        label = {item["id"]}
                        name = {item["name"]} />
                ))}
            </span>
        )
        return (
            <Aux className="ProductList">
                    <SideBar />
                {/* <Aux className={this.cssJoin("ProductList","Main")}>
                    
                    </Aux>    */}
                    
                    {/* <span>
                    {List}
                    </span> */}
                
                {/* {ProdData["0"]["id"]} */}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        tagList: state.productList.tagList,
        prodList: state.productList.productList,
        isAuthenticated: state.auth.token !== null,
        searchList: state.productSearch.searchList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProductListShown: () => dispatch(actions.fetchList()),
        onSearchList: (target) => dispatch(actions.searchList(target)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)( ProductList, axios )
