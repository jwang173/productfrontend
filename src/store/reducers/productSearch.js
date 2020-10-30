import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    product: {},
    loading: false
};

const searchProductStart = ( state, action ) => {
    return updateObject ( state, { loading: true });
};

const searchProductSuccess = ( state, action ) => {
    return updateObject ( state, {
        product: action.productData,
        loading: false
    });
};

const searchProductFail = ( state, action ) => {
    return updateObject( state, { loading: false});
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SEARCH_START: return searchProductStart( state, action);
        case actionTypes.SEARCH_SUCCESS: return searchProductSuccess( state, action);
        case actionTypes.SEARCH_FAIL: return searchProductFail( state, action);
        default: return state;
    }
};

export default reducer;
