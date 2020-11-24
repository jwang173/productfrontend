import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    prodFilterList: [],
    loading: false
};

const filterListStart = ( state, action ) => {
    return updateObject( state, {
        loading: true
    });
};

const filterListSuccess = ( state, action ) => {
    return updateObject( state, {
        prodFilterList: action.prodFilterList,
        loading: false
    });
};

const filterListFail = ( state, action ) => {
    return updateObject( state, { loading: false});
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.FILTER_LIST_START: return filterListStart( state, action);
        case actionTypes.FILTER_LIST_SUCCESS: return filterListSuccess( state, action);
        case actionTypes.FILTER_LIST_FAIL: return filterListFail( state, action);
        default: return state;
    }
};

export default reducer;