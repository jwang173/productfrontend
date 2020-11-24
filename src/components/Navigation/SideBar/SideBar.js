import React, { Component } from 'react'
import { connect } from 'react-redux';
import "./SideBar.css"
import * as actions from '../../../store/actions/index'
export class SideBar extends Component {
    state = {
        targetObj: {}
    }
    componentDidMount() {
        this.props.onProductListShown();
    }
    cssJoin = (str1, str2) => {
        return str1+" "+str2;
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
        defaultValue["maxPowerMin"] = "9.84";
        defaultValue["soundAtMaxSpeedMin"] = "20";
        defaultValue["brand"] = "Haier"
        let defKeys = Object.keys(defaultValue);
        for(let key of defKeys) {
            if(!baseKeys.includes(key)) {
                obj[key] = defaultValue[key];
            }
        }
        console.log(obj); 
        console.log(this.convertObj(obj))
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
                console.log(key);
                console.log(newKey);
                newObj[newKey] = obj[key];
                console.log(obj[key]);
                console.log(newObj)
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
        console.log(newStr);
        return newStr;
    }
    render() {
        let Brand = ["Haier","Midea"]
        return (
            <span className="SideBar" style={{textAlign:"justify"}}>
                <div>
                    Search:
                    <button onClick={() => this.clickHandler()}>Save</button>
                    <button>Clear</button>
                </div>
                <div>
                    <div>
                        Product Type
                    </div>
                    <div>
                        Model Year: 
                        &nbsp;&nbsp;
                                <span>
                                    <input id="Model Year" type="number" defaultValue="2010" style={{width:"15%"}} onChange = {(event) => this.inputDetailMinHandler(event, "Model Year", this.state.targetObj)}/>
                                    -
                                    <input id="Model Year" type="number" defaultValue="" style={{width:"15%"}} onChange = {(event) => this.inputDetailMaxHandler(event, "Model Year", this.state.targetObj)}/>
                                </span>
                    </div>
                </div>
                <div>
                    <div>
                        Technical Specifications
                    </div>
                
                <div>
                    <div>Max power(W)</div>
                    
                    <label >9.84</label>
                    <input type="range" name="maxPower" min="9.84" max="96.52" onChange = {(event) => this.inputDetailMaxHandler(event, "Max power(W)", this.state.targetObj)}/>
                    <label>96.52</label> 
                </div>
                <div>
                    <div>Sound at max speed(dBA)</div>
                    <label>20</label>
                    <input type="range" name="soundAtMaxSpeed" min="20" max="80" onChange = {(event) => this.inputDetailMaxHandler(event, "Sound at max speed(dBA)", this.state.targetObj)}/>
                    <label>80</label>
                </div>
                </div>
                <div>
                    <div>Brand</div>
                    <div>
                        {/* <input type="radio" name="Midea" checked onClick={(event) => this.clickSelectHandler(event, "brand", this.state.targetObj)}></input>
                        <label>Midea</label>
                        <input type="radio" name="Haier" onClick={(event) => this.clickSelectHandler(event, "brand", this.state.targetObj)}></input>
                        <label>Haier</label> */}
                        <select name="brand" onClick={(event) => this.clickSelectHandler(event, "brand", this.state.targetObj)}>
                                    
                                    {Brand.map(item => (
                                        <option value={item} >{item}</option>
                                    ))}
                                </select>
                    </div>
                </div>
            </span>
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
        onSetRouteSignal: (signal) => dispatch(actions.setRouteSignal(signal)),
        onFilterList:(targetObj) => dispatch(actions.filterList(targetObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( SideBar);

