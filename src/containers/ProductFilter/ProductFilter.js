import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux2/Aux2';
// import FilterPage from '../../components/Product/FilterPage';
import FilterPart from '../../components/Product/FilterPart/FilterPart';
import FilterDetail from '../../components/Product/FilterDetail/FilterDetail';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import "./ProductFilter.css"
// import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds';
class ProductFilter extends Component {
    state = {
        targetObj: {}
    }
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
        // console.log(keys);
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
        // console.log(res);
        resKeys = Object.keys(res);
        for(let i of resKeys) {
            if(res[i].length === 0) {
                delete res[i];
            }
        }
        // console.log(res);
        return res
    }

    CreateList = (titlename) => {
        // let title;
        // title = titlename.toUpperCase();
        let res = this.Createchoice(this.props.prodList);
        const Ans = res[titlename].map(prodKey => {
            return <span key = {prodKey}>
                <input type="radio"  id = {prodKey} name={titlename} value={prodKey} />
                <label for={prodKey} style={{ textTransform: 'capitalize' }}>{prodKey}</label>
            </span>
        })
        return Ans;
    }

    clickRadioHandler = (event, label, stateObj) => {
        let obj = stateObj;
        let value = event.target.value;
        let newLabel;
        if(label === "Mounting Location") {
            newLabel = "location";
        } else {
            newLabel = this.dropSpace(label)
        }
        if(value!==null) {
            obj[newLabel] = value;
        }
        console.log(obj);
        this.setState({
            targetObj: obj
        })
        console.log(this.state.targetObj);
    }
    inputDetailMinHandler = (event, label, stateObj) => {
        let obj = stateObj;
        let value =event.target.value;
        let newLabel = label + " Min";
        if(value!==null) {
                console.log("MinValue: "+newLabel+" "+value);
                obj[newLabel] = value;
        }
        console.log(obj);
        this.setState({
            targetObj: obj
        })
        console.log(this.state.targetObj);
    }
    inputDetailMaxHandler = (event, label, stateObj) => {
        let obj = stateObj;
        let value =event.target.value;
        let newLabel = label + " Max";
        if(value!==null) {
                console.log("MaxValue: "+newLabel+" "+value)
                obj[newLabel] = value;
        }
        console.log(obj);
        this.setState({
            targetObj: obj
        })
        console.log(this.state.targetObj);
    }
    clickSelectHandler = (event, label, stateObj) => {
        let obj = stateObj;
        let value = event.target.value;
        if(value!==null) {
            obj[label] = value;
        }
        console.log(obj);
        this.setState({
            targetObj: obj
        })
        console.log(this.state.targetObj);
    }
    clickHandler = () => {
        console.log(this.submitForm(this.state.targetObj));
        this.props.onFilterList(this.submitForm(this.state.targetObj));
        this.props.onSetAuthRedirectPath('/list');
    }
    submitForm = (obj) => {
        let baseKeys = Object.keys(obj);
        let defaultValue = {};
        defaultValue["modelYearMin"] = "2010";
        defaultValue["airflowMin"] = "5000";
        defaultValue["maxPowerMax"] = "65";
        defaultValue["soundAtMaxSpeedMax"] = "35";
        defaultValue["brand"] = "Haier"
        let defKeys = Object.keys(defaultValue);
        for(let key of defKeys) {
            if(!baseKeys.includes(key)) {
                obj[key] = defaultValue[key];
            }
        }
        console.log(obj); 
        return this.convertObj(obj); 
    }
    convertObj = (obj) => {
        let keys = Object.keys(obj);
        let newObj = {};
        for(let key of keys) {
            if(key.includes("(")) {
                let index1 = key.indexOf("(");
                let index2 = key.indexOf(")");
                let str1 = key.slice(0,index1);
                let str2 = key.slice(index2+1,key.length);
                let str = str1+str2;
                // console.log(str);
                str = this.dropSpace(str);
                // console.log(str);
                newObj[str] = obj[key];
            } else {
                let newKey = this.dropSpace(key);
                // console.log(key);
                // console.log(newKey)
                newObj[newKey] = obj[key];
                // console.log(obj[key]);
                // console.log(newObj)
            }
        }
        console.log(newObj);
        return newObj
    }
    dropSpace = (str) => {
        let strArr = str.split("");
        strArr[0] = strArr[0].toLowerCase();
        for(let i = 0; i < str.length; i ++) {
            if(strArr[i] === " ") {
                strArr[i+1] = strArr[i+1].toUpperCase()
            }
        }
        let newStr = ""
        for(let i of strArr) {
            if(i !== " ") {
                newStr = newStr + i;
            }
        }
        // console.log(newStr);
        return newStr;
    }
    returnList = (event) => {
        this.props.onSetAuthRedirectPath('/list');
    }
    render() {
        console.log(this.props.prodList)
        // console.log(this.props.signal);
        // console.log(Product.state);
        const application = this.CreateList("application")
        const useType = this.CreateList("useType");
        const location = this.CreateList("location");
        const brand = this.CreateList("brand");
        // console.log(brand);
        // console.log(useType);
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
                        <div >
                            {radioItems.map(item => (
                                <FilterPart
                                    key = {item.label}
                                    label = {item.label}
                                    content = {item.content} 
                                    click = {(event) => this.clickRadioHandler(event, item.label, this.state.targetObj)}/>
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
                                    maxValue = {item.maxValue}
                                    minChange = {(event) => this.inputDetailMinHandler(event, item.label, this.state.targetObj)}
                                    maxChange = {(event) => this.inputDetailMaxHandler(event, item.label, this.state.targetObj)} />
                            ))

                            }
                        </div>
        )
        let SelectItems = (
                            <span>
                                <select name="brand" onClick={(event) => this.clickSelectHandler(event, "brand", this.state.targetObj)}>
                                    
                                    {brand.map(item => (
                                        <option value={item["key"]} >{item["key"]}</option>
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
            <div className="ProductFilter">
                    {authRedirect}
                    <div style={{flexWrap:"nowrap"}}>
                        Find fans 
                        <button onClick={(event) => this.returnList(event)} style={{float:"right"}}>X</button>
                    
                        
                    </div>
                    <div>
                        
                        
                        <form>
                            <fieldset>
                            {/* <h3>Type</h3> */}
                            <div>Type</div>
                        {Filter}
                        <span>
                            Model Year: 
                                <span>
                                    <input id="Model Year" type="number" defaultValue="2010" onChange = {(event) => this.inputDetailMinHandler(event, "Model Year", this.state.targetObj)}/>
                                    ----
                                    <input id="Model Year" type="number2" defaultValue="" onChange = {(event) => this.inputDetailMaxHandler(event, "Model Year", this.state.targetObj)}/>
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
                    <div style={{textAlign:"right"}}>
                        <button value="Search" onClick={() => this.clickHandler()} >Search</button>
                    </div>
                </div>
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
        onSetRouteSignal: (signal) => dispatch(actions.setRouteSignal(signal)),
        onFilterList:(targetObj) => dispatch(actions.filterList(targetObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( ProductFilter);
