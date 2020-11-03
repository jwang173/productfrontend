import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const searchProduct = (productName, token) => {
    return dispatch => {
        dispatch( searchProductStart() );
        const queryParams = '?auth='+ token +'&productBy="productName"&equalTo="' + productName+ '"'
        axios.get('/product.json?'+ queryParams)
            .then( response => {
                // const searchProductList = [];
                // for(let key in response.data) {
                //     searchProductList.push( {
                //         ...response.data[key],
                //         id:key
                //     });
                // };
            dispatch( searchProductSuccess( response.data))
        })
        .catch( error => {
            dispatch(searchProductFail(error));
        });
    };
};