import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const searchProductSuccess = (productData) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        productData: productData
    };
};

export const searchProductFail = ( error ) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error: error
    };
};

export const searchProductStart = () => {
    return {
        type: actionTypes.SEARCH_START
    };
};

export const searchProduct = (productName) => {
    return dispatch => {
        dispatch( searchProductStart() );
        // const queryParams = '?auth='+ token +'&productBy="productName"&equalTo="' + productName+ '"'
        let url = '/product/prod?productName='+productName
        Axios.get(url,{withCredentials:true})
            .then(response => {
                console.log(response["data"])
                dispatch(searchProductSuccess(response["data"]));
            }).catch( error => {
                dispatch(searchProductFail(error));
            });
        // axios.get('/product.json?'+ queryParams)
        //     .then( response => {
        //         // const searchProductList = [];
        //         // for(let key in response.data) {
        //         //     searchProductList.push( {
        //         //         ...response.data[key],
        //         //         id:key
        //         //     });
        //         // };
        //     dispatch( searchProductSuccess( response.data))
        // })
        // .catch( error => {
        //     dispatch(searchProductFail(error));
        // });
    };
};

export const searchListSuccess = (productNCData) => {
    return {
        type: actionTypes.SEARCH_LIST_SUCCESS,
        productNCData: productNCData
    };
};

export const searchListFail = ( error ) => {
    return {
        type: actionTypes.SEARCH_LIST_FAIL,
        error: error
    };
};

export const searchListStart = () => {
    return {
        type: actionTypes.SEARCH_LIST_START
    };
};

export const searchList = (str) => {
    let prodList = [];
    let resList = [];
    return dispatch => {
        dispatch(searchListStart());
        let url = '/product';
        Axios.get(url,{withCredentials:true})
        .then(response => {
            // console.log(response);
            // console.log(response["data"]);
            for(let item of response["data"]) {
                prodList.push(item);
            }
            for(let item of prodList) {
                if(item["name"].toLowerCase().includes(str.toLowerCase())) {
                    resList.push(item);
                }
            }
            dispatch(searchListSuccess(resList));
            if(resList.length === 0) {
                dispatch(searchListFail(new Error("No such product, please enter another name")));
            }
        })
        .catch(error => {
            console.log(error);
            
        })
        
    }
}

export const setRouteSignal = (signal) => {
    return {
        type: actionTypes.SET_ROUTE_SIGNAL,
        signal: signal
    };
};