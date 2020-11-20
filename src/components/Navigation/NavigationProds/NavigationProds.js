import { NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Aux2/Aux2';
import Logo from '../../Logo/Logo';
import productData from '../../../datasource/ProductData';
import userData from '../../../datasource/UserData';
// import classes from '../NavigationProds/NavigationProds.css'
import './NavigationProds.css'
import React, { Component } from 'react'
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';


class NavigationProds extends Component {
    state = {
        Type: [],
        SearchValue: ""
    }

    componentDidMount() {
        if ( this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
        }
    }

    inputHandler = (event) => {
        let value = event.target.value;
        console.log(value);
        this.setState({
            Type: [],
            SearchValue: value
        });
    };

    clickHandler = ( value) => {
        console.log("Turn");
        if(value === "") {
            console.log("sit 1");
            this.props.onSetAuthRedirectPath('/filter');
            
        } else {
            console.log("sit 2");
            console.log(value)
            this.props.onSetAuthRedirectPath('/filter');
            console.log('step2');
            this.props.onSearchList(value);
        }
    }

    // Createchoice = (Arr) => {
    //     let len = Arr.length;
    //     // console.log(len);
    //     // let keyLen = Object.keys(Arr[0]).length;
    //     let keys = Object.keys(Arr[0]);
    //     // console.log(keys);
    //     let res = {};
    //     for(let i of keys) {
    //         res[i] = [];
    //     }
    //     for(let i = 0; i < len; i ++) {
    //         for(let j of keys) {
    //             // console.log(typeof(Arr[i][j]));//for in default output key not output value
    //             if(typeof(Arr[i][j])=='string') {
    //                 res[j].push(Arr[i][j]);
    //                 // console.log(Arr[i][j]);
    //             }
    //         }
    //     }
    //     // console.log(res);
    //     // let keyLen2 = Object.keys(res).length;
    //     let resKeys = Object.keys(res);
    //     for(let i of resKeys) {
    //         res[i] = Array.from(new Set(res[i]));
    //     }
    //     // console.log(res);
    //     resKeys = Object.keys(res);
    //     for(let i of resKeys) {
    //         if(res[i].length === 0) {
    //             delete res[i];
    //         }
    //     }
    //     // console.log(res);
    //     return res
    // }

    // CreateList = (titlename) => {
    //     // let title;
    //     // title = titlename.toUpperCase();
    //     let res = this.Createchoice(productData);
    //     // console.log(res);
    //     const Ans = res[titlename].map(prodKey => {
    //         return <span key = {prodKey}>
    //             <input type="radio"  id = {prodKey} name={titlename} value={prodKey} />
    //             <label for={prodKey} style={{ textTransform: 'capitalize' }}>{prodKey}</label>
    //         </span>
    //     })
    //     return Ans;
    // }
    
    render() {
        // const useType = this.CreateList("useType");
        // console.log(useType);
        // console.log(this.props.tagList);
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
        return (
            <div className="NavigationProds" >
                
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
                <button onClick={()  => this.clickHandler(this.state.SearchValue)}>Search</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tagList: state.productList.tagList,
        prodList: state.productList.productList,
        isAuthenticated: state.auth.token !== null,
        searchList: state.productSearch.searchList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchList: (target) => dispatch(actions.searchList(target)),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)( NavigationProds);