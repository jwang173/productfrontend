import * as actionTypes from './actionTypes';
import Axios from 'axios';

const checkType = (obj1, obj2) => {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    let sig = true;
    for(let k1 of keys1) {
        for(let k2 of keys2) {
            if((k1===k2)&&((typeof obj2[k2])=="number")) {
                if((typeof obj1[k1][0])=="number") {
                    sig = true;
                } else {
                    sig = false;
                }
            } else if((k1===k2)&&((typeof obj2[k2])=="string")) {
                if((typeof obj1[k1])=="string") {
                    sig = true;
                } else {
                    sig = false;
                }
            }
        }
    }
    return sig;
}

const chooseObj = (obj, arr) => {
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
    for(let key of FilterKeys) {
        if((typeof obj[key])=="string") {
            stringFilterKeys.push(key);
        } else if(((typeof obj[key])=="object")||((typeof obj[key])=="number")) {
            numberFilterKeys.push(key);
        }
    }
    for(let item of arr) {
        for(let key of stringFilterKeys) {
            if(item[key] === obj[key]) {
                strSig = true;
            } else {
                strSig = false;
            }
        }
        if(strSig === true) {
            strRes.push(item);
        }
        strSig = true;
    }
    for(let item of arr) {
        for(let key of numberFilterKeys) {
            if((obj[key][0]<=(item[key]))&&(obj[key][1]>=(item[key]))) {
                numSig = true;
            } else {
                numSig = false;
            }
        }
        if(numSig === true) {
            numRes.push(item);
        }
        numSig = true;
    }
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
        type: actionTypes.FETCH_LIST_SUCCESS,
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
    let sampleUrl = '/product';
    let baseList = [];
    Axios.get(sampleUrl,{withCredentials:true})
        .then(response => {
            for(let i of response["data"]) {
                baseList.push(i);
            }
        }).catch(error => {
            console.log(error);
        })
    console.log(baseList);
    // let FilterKeys = Object.keys(obj);
    let resList = chooseObj(obj,baseList);
    return dispatch => {
        dispatch(filterListStart());
        dispatch(filterListSuccess(resList));
        if(resList.length===0) {
            dispatch(filterListFail(new Error("No such product, Please try again")));
        }
    }
}