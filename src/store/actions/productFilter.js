import * as actionTypes from './actionTypes';
import Axios from 'axios';

const chooseObj = (obj, arr) => {
    console.log(obj)
    let FilterKeys = Object.keys(obj);
    let BaseKeys = Object.keys(arr[0]);
    let stringKeys = [];
    let numberKeys = [];
    let stringFilterKeys = [];
    let numberFilterKeys = [];
    let strSig = true;
    let numSig = true;
    let strRes = [];
    let numRes = [];
    let res = []
    for(let key of BaseKeys) {
        if((typeof arr[0][key])=="string") {
            stringKeys.push(key);
        } else if((typeof arr[0][key])=="number") {
            numberKeys.push(key);
        }
    }
    console.log(stringKeys);
    console.log(numberKeys);
    for(let key of FilterKeys) {
        if((key.includes("Max"))||(key.includes("Min"))) {
            numberFilterKeys.push(key);
        } else {
            stringFilterKeys.push(key);
        }
    }
    console.log(stringFilterKeys);
    console.log(numberFilterKeys);
    for(let item of arr) {
        for(let key of stringFilterKeys) {
            if(item[key] === obj[key]) {
                console.log("key: "+key+" value1: "+item[key] + " value2: "+obj[key])
                strSig = true;
                console.log(strSig);
            } else {
                strSig = false;
            }
        }
        if(strSig === true) {
            strRes.push(item);
        }
        strSig = true;
    }
    console.log(strRes);
    for(let item of arr) {
        for(let key of numberKeys) {
            if((numberFilterKeys.includes(key+"Min"))||(numberFilterKeys.includes(key+"Max"))) {
                if((numberFilterKeys.includes(key+"Min"))&&(!numberFilterKeys.includes(key+"Max"))) {
                    if(item[key]>=obj[key+"Min"]) {
                        numSig = true;
                    } else {
                        numSig = false;
                    }
                } else if((numberFilterKeys.includes(key+"Max"))&&(!numberFilterKeys.includes(key+"Min"))){
                    if(item[key]<=obj[key+"Max"]) {
                        numSig = true;
                    } else {
                        numSig = false;
                    }
                } else if((numberFilterKeys.includes(key+"Max"))&&(numberFilterKeys.includes(key+"Min"))) {
                    if(obj[key+"Max"]>=obj[key+"Min"]) {
                        if((item[key] <= obj[key+"Max"])&&(item[key] >= obj[key+"Min"])) {
                            numSig = true;
                        } else {
                            numSig = false;
                        }
                    } else {
                        if((item[key] >= obj[key+"Max"])&&(item[key] <= obj[key+"Min"])) {
                            numSig = true;
                        } else {
                            numSig = false;
                        }
                    }
                }
            }
        }
        if(numSig === true) {
            numRes.push(item);
        }
        numSig = true;
    }
    console.log(numRes);
    for(let i of strRes) {
        for(let j of numRes) {
            if(i["id"] === j["id"]) {
                res.push(j);
            }
        }
    }
    return res;
}

export const filterListSuccess = (productList) => {
    return {
        type: actionTypes.FILTER_LIST_SUCCESS,
        prodFilterList: productList
    };
};

export const filterListFail = (error) => {
    return {
        type: actionTypes.FILTER_LIST_FAIL,
        error: error
    };
};

export const filterListStart = () => {
    return {
        type: actionTypes.FILTER_LIST_START
    };
};

export const filterList = (obj) => {
    let baseList = [];
    
    return dispatch => {
        dispatch(filterListStart());
        let sampleUrl = '/product';
        let useType = [];
        Axios.get(sampleUrl,{withCredentials:true})
            .then(response => {
                for(let i of response["data"]) {
                    useType.push(i["useType"]);
                    baseList.push(i);
                }
                let resList = chooseObj(obj,baseList);
                console.log(resList);
                console.log(useType)
                dispatch(filterListSuccess(resList));
                if(resList.length===0) {
                    dispatch(filterListFail(new Error("No such product, Please try again")));
                }
            }).catch(error => {
            console.log(error);
            })
        console.log(baseList);
    // let FilterKeys = Object.keys(obj);
        
    }
}