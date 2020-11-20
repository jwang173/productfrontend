import * as actionTypes from './actionTypes';
// import instance from '../../axios-orders';
import Axios from 'axios';

// export let getData = () => {
//     let prodList = [];
//     let myHeaders = new Headers({
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'text/plain'
//     });
//     fetch('http://127.0.0.1:8081/ProductBackend_war_exploded/helloproducts',{
//         method:'GET',
//         headers: myHeaders,
//         mode: 'cors',
//         //转或称字符串格式
//     }).then(res => res.json()).then(
//         data => {
//             console.log(data);
//             data.map(item=> {
//                return prodList.push(item)
//             })
//             })
//             console.log(prodList.length);
//     return prodList;
// }

let Createchoice = (Arr) => {
    let len = Arr.length;
    // console.log(len);
    // let keyLen = Object.keys(Arr[0]).length;
    let keys = Object.keys(Arr[0]);
    // console.log(keys);
    let res = {};
    for(let i of keys) {
        res[i] = [];
    }
    for(let i = 0; i < len; i ++) {
        for(let j of keys) {
            // console.log(typeof(Arr[i][j]));//for in default output key not output value
            if(typeof(Arr[i][j])=='string') {
                res[j].push(Arr[i][j]);
                // console.log(Arr[i][j]);
            }
        }
    }
    // console.log(res);
    // let keyLen2 = Object.keys(res).length;
    let resKeys = Object.keys(res);
    for(let i of resKeys) {
        res[i] = Array.from(new Set(res[i]));
    }
    // console.log(res);
    resKeys = Object.keys(res);
    for(let i of resKeys) {
        if(res[i].length === 0) {
            delete res[i];
        }
    }
    // console.log(res);
    return res
}

let CreateList = (Arr,titlename) => {
    // let title;
    // title = titlename.toUpperCase();
    let res = Createchoice(Arr);
    // console.log(res);
    const Ans = res[titlename];
    return Ans;
}

export const fetchListSuccess = ( productList , tagList) => {
    return {
        type: actionTypes.FETCH_LIST_SUCCESS,
        productList: productList,
        tagList: tagList
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
    let tagList = [];
    return dispatch => {
        dispatch(fetchListStart());
        console.log("2");
        let url = '/product';
        Axios.get(url,{withCredentials:true})
        .then(response => {
            // console.log(response);
            // console.log(response["data"]);
            for(let item of response["data"]) {
                prodList.push(item);
            }
            // console.log(prodList);
            const useType = CreateList(prodList,"useType");
            tagList = useType;
            console.log(tagList);
            dispatch(fetchListSuccess(prodList, tagList));
            
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchListFail(error));
        });
    };

}


