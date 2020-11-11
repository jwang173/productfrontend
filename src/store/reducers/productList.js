import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    productList: [],
    loading: false
};

const fetchListStart = ( state, action ) => {
    return updateObject ( state, { loading: true });
};

const fetchListSuccess = ( state, action ) => {
    console.log(action.productList);
    return updateObject ( state, {
        productList: action.productList,
        loading: false
    });
};

const fetchListFail = ( state, action ) => {
    return updateObject( state, { loading: false});
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.FETCH_LIST_START: return fetchListStart( state, action);
        case actionTypes.FETCH_LIST_SUCCESS: return fetchListSuccess( state, action);
        case actionTypes.FETCH_LIST_FAIL: return fetchListFail( state, action);
        default: return state;
    }
};

export default reducer;
