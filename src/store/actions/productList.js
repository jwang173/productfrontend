import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchListSuccess = ( productList ) => {
    return {
        type: actionTypes.FETCH_LIST_SUCCESS,
        productList: productList
    };
};

export const fetchListFail = ( error ) => {
    return {
        type: actionTypes.FETCH_LIST_FAIL,
        error: error
    };
};

export const fetchListStart = () => {
    return {
        type: actionTypes.FETCH_LIST_START
    };
};

export const fetchList = (token) => {
    return dispatch => {
        dispatch(fetchListStart());
        const queryparams = '?auth=' + token;
        axios.get('/productList.json' + queryparams)
        .then( res => {
            const fetchProductList = [];
            for (let key in res.data) {
                fetchProductList.push( {
                    ...res.data[key],
                    id: key
                } );
            }
            dispatch(fetchListSuccess(fetchProductList));
        })
        .catch( err => {
            dispatch(fetchListFail(err));
        });
    };
};