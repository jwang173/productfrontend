import * as actionTypes from './actionTypes';
import Axios from 'axios';
// import list from '../actions/productList'

export const compareListSuccess = (productList) => {
    return {
        type: actionTypes.COMPARE_LIST_SUCCESS,
        prodCompareList: productList
    };
};

export const compareListFail = (error) => {
    return {
        type: actionTypes.COMPARE_LIST_FAIL,
        error: error
    };
};

export const compareListStart = () => {
    return {
        type: actionTypes.COMPARE_LIST_START,
    };
};

export const compareList = (arr) => {
    // let times = arr.length;
    // let prodList = list.productList;
    let prodList = [];
    let resList = [];
    return dispatch => {
        dispatch(compareListStart());
        let url = '/product';
        Axios.get(url,{withCredentials:true})
        .then(response => {
            // console.log(response);
            // console.log(response["data"]);
            for(let item of response["data"]) {
                prodList.push(item);
            }
            console.log(prodList);
            // console.log(arr);
            // console.log(typeof arr[0]);
            for(let i of arr) {
                for(let item of prodList) {
                    // console.log(typeof item["id"])
                    if(i === item["id"]) {
                        // console.log(i);
                        resList.push(item);
                    }
                }
            }
            console.log(resList)
            dispatch(compareListSuccess(resList));
            if(arr.length === 0) {
                dispatch(compareListFail(new Error("No products to be compared, please add some to compare")));
            }
            // console.log(prodList);
        }).catch( error => {
            console.log(error);
        })
    }
}