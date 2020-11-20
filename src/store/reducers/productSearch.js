import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    product: {},
    searchList: [],
    loading: false
};

const searchProductStart = ( state, action ) => {
    return updateObject ( state, { loading: true });
};

const searchProductSuccess = ( state, action ) => {
    console.log(action.productList);
    console.log(action.productData);
    return updateObject ( state, {
        product: action.productData,
        searchList: action.productNCData,
        loading: false
    });
};

const searchProductFail = ( state, action ) => {
    return updateObject( state, { loading: false});
};

const searchListStart = ( state, action ) => {
    return updateObject ( state, { loading: true });
};

const searchListSuccess = ( state, action ) => {
    console.log(action.productNCData);
    return updateObject ( state, {
        product: action.productData,
        searchList: action.productNCData,
        loading: false
    });
};

const searchListFail = ( state, action ) => {
    return updateObject ( state, { loading: true });
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SEARCH_START: return searchProductStart( state, action);
        case actionTypes.SEARCH_SUCCESS: return searchProductSuccess( state, action);
        case actionTypes.SEARCH_FAIL: return searchProductFail( state, action);
        case actionTypes.SEARCH_LIST_START: return searchListStart( state, action);
        case actionTypes.SEARCH_LIST_SUCCESS: return searchListSuccess( state, action);
        case actionTypes.SEARCH_LIST_FAIL: return searchListFail( state, action);
        default: return state;
    }
};

export default reducer;
