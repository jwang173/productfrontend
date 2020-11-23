import React, { Component } from 'react';
import { connect } from 'react-redux';
import productData from '../../datasource/ProductData';
// import productData from '../Data/ProductData';
import Aux from '../../hoc/Aux2/Aux2';
// import FilterPage from '../../components/Product/FilterPage';
import FilterPart from '../../components/Product/FilterPart/FilterPart';
import FilterDetail from '../../components/Product/FilterDetail/FilterDetail';
import * as actions from '../../store/actions/index';
import { Redirect,withRouter } from 'react-router-dom';
import Axios from 'axios';
// import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds';
class ProductFilter extends Component {
    componentDidMount() {
        this.props.onProductListShown();
        this.props.onSetRouteSignal(true);
        // this.props.onSetAuthRedirectPath('/filter');
        if ( this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath(this.props.authRedirectPath);
        } else {
            this.props.onSetAuthRedirectPath("/list")
        }
    }
    Createchoice = (Arr) => {
        let len = Arr.length;
        // console.log(len);
        // let keyLen = Object.keys(Arr[0]).length;
        let keys = Object.keys(Arr[0]);
        console.log(keys);
        let res = {};
        for(let i of keys) {
            res[i] = [];
        }
        for(let i = 0; i < len; i ++) {
            for(let j of keys) {
                // console.log(typeof(Arr[i][j]));//for in default output key not output value
                if(typeof(Arr[i][j])=='string') {
                    res[j].push(Arr[i][j]);
                    // console.log(Arr[i][j]);
                }
            }
        }
        // console.log(res);
        // let keyLen2 = Object.keys(res).length;
        let resKeys = Object.keys(res);
        for(let i of resKeys) {
            res[i] = Array.from(new Set(res[i]));
        }
        console.log(res);
        resKeys = Object.keys(res);
        for(let i of resKeys) {
            if(res[i].length === 0) {
                delete res[i];
            }
        }
        console.log(res);
        return res
    }

    CreateList = (titlename) => {
        // let title;
        // title = titlename.toUpperCase();
        let res = this.Createchoice(productData);
        console.log(res);
        const Ans = res[titlename].map(prodKey => {
            return <span key = {prodKey}>
                <input type="radio"  id = {prodKey} name={titlename} value={prodKey} />
                <label for={prodKey} style={{ textTransform: 'capitalize' }}>{prodKey}</label>
            </span>
        })
        return Ans;
    }
    clickHandler = () => {
        this.props.onSetAuthRedirectPath('/list');
    }
    render() {
        console.log(this.props.prodList)
        console.log(this.props.signal);
        // console.log(Product.state);
        const application = this.CreateList("application")
        const useType = this.CreateList("useType");
        const location = this.CreateList("location");
        const brand = this.CreateList("brand");
        // console.log(brand);
        console.log(useType);
        const radioItems = [
            {label:"Use Type", content: useType},
            {label:"Application", content: application},
            {label:"Mounting Location", content: location}
        ]

        const detailRange = [
            {label:"Airflow(CFM)", minValue:"5000", maxValue:""},
            {label:"Max power(W)", minValue:"", maxValue:"65"},
            {label:"Sound at max speed(dBA)", minValue:"", maxValue:"35"}
        ]
        let Filter =  (
                        <div>
                            {radioItems.map(item => (
                                <FilterPart
                                    key = {item.label}
                                    label = {item.label}
                                    content = {item.content} />
                            ))}
                        </div>
        )
        let Detail = (
                        <div>
                            {detailRange.map(item => (
                                <FilterDetail
                                    key = {item.label}
                                    label = {item.label}
                                    minValue = {item.minValue}
                                    maxValue = {item.maxValue} />
                            ))

                            }
                        </div>
        )
        let SelectItems = (
                            <span>
                                <select name="brand">
                                    
                                    {brand.map(item => (
                                        <option value={item["key"]}>{item["key"]}</option>
                                    ))}
                                </select>
                            </span>
                            )
        // return <FilterPage />
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        
        return (
            <Aux>
                    {authRedirect}
                    <div>
                    {/* <NavigationProds isAuth={this.props.isAuthenticated} /> */}
                        <h3>Find fans</h3>
                        <form>
                            <fieldset>
                            {/* <h3>Type</h3> */}
                            <div>Type</div>
                        {Filter}
                        <span>
                            Model Year: 
                                <span>
                                    <input id="number" type="number" defaultValue="2010"/>
                                    ----
                                    <input id="number2" type="number2" defaultValue="" />
                                </span>
                        </span>
                            </fieldset>
                        </form>
                    </div>

                    <div>
                        <form>
                            <fieldset>
                                <div>
                                    Technique Details
                                </div>
                                <span>
                                    {Detail}
                                </span>
                            </fieldset>
                        </form>
                        
                    </div>
                    <div>
                        <form>
                            <fieldset>
                                <div>
                                    Brand
                                </div>
                                <span>
                                    Select Brand(s){SelectItems}
                                </span>
                                
                            </fieldset>
                        </form>
                        
                    </div>
                    <div>
                        <button value="Search" onClick={() => this.clickHandler()}>Search</button>
                    </div>
                </Aux>
        );
        
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

export default connect(mapStateToProps, mapDispatchToProps)( ProductFilter,Axios);