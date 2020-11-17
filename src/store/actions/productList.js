import * as actionTypes from './actionTypes';
import instance from '../../axios-orders';
import Axios from 'axios';

export let getData = () => {
    let prodList = [];
    let myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });
    fetch('http://127.0.0.1:8081/ProductBackend_war_exploded/helloproducts',{
        method:'GET',
        headers: myHeaders,
        mode: 'cors',
        //转或称字符串格式
    }).then(res => res.json()).then(
        data => {
            console.log(data);
            data.map(item=> {
               return prodList.push(item)
            })
            })
            console.log(prodList.length);
    return prodList;
}

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

// export const fetchList = () => {
//     return dispatch => {
//         dispatch(fetchListStart());
//         // const queryparams = '?auth=' + token;
//         axios.get('http://127.0.0.1:8081/ProductBackend_war_exploded/helloproducts')
//         .then( res => {
//             const fetchProductList = [];
//             for (let key in res.data) {
//                 fetchProductList.push( {
//                     ...res.data[key],
//                     id: key
//                 } );
//             }
//             console.log(fetchProductList);
//             dispatch(fetchListSuccess(fetchProductList));
//         })
//         .catch( err => {
//             dispatch(fetchListFail(err));
//         });
//     };
// };

// export const fetchList = () => {
//     console.log("2")
//     return dispatch => {
//         dispatch(fetchListStart);
//         let fetchProductList = []
//         fetchProductList = getData();
//         console.log(getData())
//         console.log(fetchProductList.length);
//         // if(fetchProductList.length === 0) {
//         //     dispatch(fetchListFail("Products failed to get"));
//         // } else {
//             dispatch(fetchListSuccess(fetchProductList));
//         // }
//         console.log(fetchProductList[0])
//     }
// }

// export const fetchList = () => {
//     let prodList = [];
//     let myHeaders = new Headers({
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//     });
//     return dispatch => {
//         dispatch(fetchListStart());
//         fetch('http://localhost:8081/ProductBackend_war_exploded/helloproducts',{
//         method:'GET',
//         headers: myHeaders,
//         mode: 'cors',
//         //转或称字符串格式
//     }).then(res => res.json()).then(
//         data => {
//             console.log(data);
            
//             dispatch(fetchListSuccess(data));
//             data.map(item=> {
//                return prodList.push(item)
//             })
//             })
//             .catch(error => {
//                 dispatch(fetchListFail(error));
//             })
//     }
    
//     //         console.log(prodList.length);
//     // return prodList;

// }

export const fetchList = () => {
    let prodList = [];
    return dispatch => {
        dispatch(fetchListStart());
        console.log("2");
        let url = '/product';
        Axios.get(url,{withCredentials:true})
        .then(response => {
            console.log(response);
            dispatch(fetchListSuccess(response));
            
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchListFail(error));
        });
    };

}
