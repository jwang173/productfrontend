import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    prodCompareList: [],
    loading: false
};

const compareListStart = ( state, action ) => {
    return updateObject( state, {
        loading: true
    });
};

const compareListSuccess = ( state, action ) => {
    console.log(action.prodCompareList)
    return updateObject( state, {
        prodCompareList: action.prodCompareList,
        loading: false
    });
};

const compareListFail = ( state, action ) => {
    return updateObject( state, { loading: false});
};

const reducer = ( state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.COMPARE_LIST_START: return compareListStart( state, action);
        case actionTypes.COMPARE_LIST_SUCCESS: return compareListSuccess( state, action);
        case actionTypes.COMPARE_LIST_FAIL: return compareListFail( state, action);
        default: return state;
    }
};

export default reducer;