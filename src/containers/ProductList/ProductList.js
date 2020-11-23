import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import ListPage from '../../components/Product/ListPage/ListPage';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import "./ProductList.css"
import Aux from '../../hoc/Aux2/Aux2';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'
// import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds'
class ProductList extends Component {
    state = {
        CompareIdList: []
    }
    componentDidMount () {
        // console.log(this.props);
        this.props.onSetAuthRedirectPath("/list");
        console.log(this.props.authRedirectPath)
        this.props.onProductListShown();
        this.props.onSetRouteSignal(true);
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
    changeHandler = (id, Arr) => {
        console.log(id);
        console.log(Arr);
        let arr = Arr;
        let sig = false;
        // if(arr.length <= this.props.prodList.length) {
        //     if(!arr.includes(id)) {
        //         arr.push(id);
        //     } else {
        //         times ++;
        //     }
        // } 
        if(!arr.includes(id)) {
            arr.push(id);
            console.log(arr);
        } else {
            sig = true;
        }
        if(sig) {
            this.setState({
                CompareIdList: arr
            })
            // this.props.onCompareList(arr);
        }
        
        
        // this.props.onSetAuthRedirectPath('')
    }

    clickHandler = (id,Arr) => {
        // if(id === Arr[Arr.length -1]) {
        //     this.props.onSetAuthRedirectPath('/compare')
        // }
        console.log(id);
        this.props.onCompareList(Arr);
        let path = this.props.onSetAuthRedirectPath('/compare')
        console.log(path["path"])
        return <Redirect to='/compare'></Redirect>
    }
    render() {
        // return (<div>testing</div>)
        // const ProdData = [...this.props.prodList]
        let ProdData;
        if(this.props.searchList.length === 0) {
            ProdData = this.props.prodList;
        } else {
            ProdData = this.props.searchList;
        }
        
        console.log(this.props.prodList);
        console.log(this.props.searchList);
        console.log(this.props.comparedList);
        console.log(this.props.signal);
        console.log(this.props.authRedirectPath);
        let path = '/list'
        console.log(this.props.onSetAuthRedirectPath(path));
        // this.props.authRedirectPath
        console.log(this.props.authRedirectPath);
        // console.log(this.props.tagList);
        // console.log(Object.keys(ProdData));
        // console.log(this.ConvertType(ProdData));
        let List = (
            <span>
                {this.ConvertType(ProdData).map(item => (
                    <div className="ProductList card">
                    <div className="ProductList container">
                        <p style={{textAlign:"center"}}>{item["id"]}</p>
                        <p>{item["name"]}</p>
                        <p>{item["modelYear"]}</p>
                        <p>{item["brand"]} </p>
                        <p>{item["useType"]}</p>
                    <div className="ProductList compare">
                        <label for={item["id"]} style={{display:"inline-block",justifyContent:"space-around"}}>Compare</label>
                        <input type="checkbox" id={item["id"]} onClick={(e) => this.changeHandler(item["id"],this.state.CompareIdList)} />
                        <button id={item["id"]} style={{width:80,justifySelf:"flex-end"}} onClick={(e) => this.clickHandler(item["id"],this.state.CompareIdList)}> Add to</button>
                    </div>   
                    </div>
                </div>
                    // <ListPage
                    //     id = {item["id"]}
                    //     label = {item["id"]}
                    //     name = {item["name"]}
                    //     year = {item["modelYear"]}
                    //     brand = {item["brand"]} 
                    //     type = {item["useType"]}>
                        
                    //     </ListPage>
                ))}
            </span>
        )
        console.log(this.props.comparedList);
        console.log(this.props.tagList)
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log("run")
            console.log(this.props.authRedirectPath);
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
            console.log("go")
        }
        let comparedList = this.props.prodList;
        // let item1 = comparedList[0];
        // let keys = Object.keys(item1);
        console.log(comparedList[0]);
        // console.log(item1);
        // console.log(this.props.signal);
        // console.log(keys);
        return (
            <Aux className="ProductList">
                {authRedirect}
                {/* <NavigationItems 
                tagList = {this.props.tagList} /> */}
                {/* <NavigationProds isAuth={this.props.isAuthenticated} /> */}
                    {/* {authRedirect} */}
                    <SideBar>
                    
                    </SideBar>
                    <div className="Main">
                        {/* {authRedirect} */}
                        {List}
                    {/* <table>
                    {Object.keys(comparedList[0]).map( key=> (
                        <tr>
                            <td>{key}</td>
                        {comparedList.map(item => (
                            <td>{item[key]}</td>
                        ))}
                        </tr>
                    )
                        
                    )}
                    </table> */}
                    </div>
                    
                    
                
                    
                
                {/* <Aux className={this.cssJoin("ProductList","Main")}>
                    
                    </Aux>    */}
                
                    
                
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
        searchList: state.productSearch.searchList,
        comparedList: state.productCompare.prodCompareList,
        signal: state.productSearch.signal,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCompareList: (idArr) => dispatch(actions.compareList(idArr)),
        onProductListShown: () => dispatch(actions.fetchList()),
        onSearchList: (target) => dispatch(actions.searchList(target)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onSetRouteSignal: (signal) => dispatch(actions.setRouteSignal(signal))
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( ProductList,axios);
