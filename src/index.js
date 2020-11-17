import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import productSearchReducer from './store/reducers/productSearch';
import productListReducer from './store/reducers/productList'

// import burgerBuilderReducer from './store/reducers/burgerBuilder';
// import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import Axios from 'axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

Axios.defaults.baseURL = 'http://localhost:8086';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    console.log("the token is " + token)
    if(token) {
        request.headers['Authorization'] = 'Bearer ' + token;
        // request.headers = {
        //     'Authorization': 'Bearer ' + token
        // };
    }
    console.log("Request interceptor")
    console.log(request.headers);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

Axios.interceptors.response.use(response => {
    return response;
}, error => {
    alert(error);
    return Promise.reject(error.response);
})

const rootReducer = combineReducers({
    productSearch: productSearchReducer,
    productList: productListReducer,
    // burgerBuilder: burgerBuilderReducer,
    // order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);



ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();

