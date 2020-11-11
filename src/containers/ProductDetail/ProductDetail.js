import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductData from '../../datasource/ProductData';
// import ProductData from '../Data/ProductData';
import Aux from '../../hoc/Aux2/Aux2';
import DeatilPage from '../../components/Product/DetailPage/DetailPage';

class ProductDetail extends Component {
    Assign = (obj) => {
        let keys = Object.keys(obj);
        let Description = {};
        let Type = {};
        let Technique = {};
        let res = {}
        for(let k of keys) {
            if((k === "id")||(k === "name")) {
                Description[k] = obj[k];
            } else if((k === "useType")||(k ==="application")||(k ==="location")||(k ==="modelYear")) {
                Type[k] = obj[k];
            } else {
                Technique[k] = obj[k];
            }
        }
        res["Description"] = Description;
        res["Type"] = Type;
        res["Technique"] = Technique;

        return res;
    }
    Convert = (obj) => {
        let res = [];
        // console.log(Object.keys(obj));
        let keys = Object.keys(obj);
        for(let k of keys) {
            // console.log(obj[k]);
            for(let k2 of Object.keys(obj[k])) {
                let obj1 = {};
                obj1["label"] = k2;
                obj1["content"] = obj[k][k2];
                obj1["memo"] = k;
                if(k === "Technique") {
                    obj1["memo"] = "TECHNICAL SPECIFICATIONS";
                } else {
                    obj1["memo"] = obj1["memo"].toUpperCase();
                }
                // console.log(obj[k][k2]);
                res.push(obj1);
                
            }
        }
        // for(let k in Object.keys(obj)) {
        
        // }
        return res;
    }
    Setname = (str) => {
        let Arr1 = str.split('');
        let index = [];
        let str2 = "";
        // index[0] = 0;
        Arr1[0] = Arr1[0].toUpperCase();
        for(let i = 1; i < str.length; i ++) {
            if(Arr1[i].toUpperCase() === Arr1[i]) {
                index.push(i);
            }
        }
        for(let i = 0; i < str.length; i ++) {
            str2 += Arr1[i];
            if(index.includes(i+1)) {
                str2+=" ";
            }
        }
        return str2;
    }
    render() {
        let product = ProductData[0];
        let res = this.Assign(product);
        console.log(res);
        let res2 = this.Convert(res);
        console.log(res2);
        for(let i of res2) {
            i["label"] = this.Setname(i["label"]);
        }
        // console.log(res2[7]["label"]);
        // res2[7]["label"] = this.Setname(res2[7]["label"]);
        // console.log(res2[7]["label"]);
        // console.log(res2);
        let showItems = (
            <div>
                {res2.map(item => (
                            <DeatilPage
                            key = {item["label"]}
                            label = {item["label"]}
                            type = {item["memo"]}
                            content = {item["content"]} />
                ))
                }
            </div>
        )
        return (
            <div>
                <span>
                    
                        {showItems}
                        {/* <h3>Description</h3>
                        <table>
                            <tbody>
                                
                            <tr>
                                <td>Id</td>
                                <td>{res["Description"]["id"]}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{res["Description"]["name"]}</td>
                            </tr>
                            </tbody>
                        </table> */}
                        {/* {res["Description"]["id"]} */}
                    
                </span>
                <span></span>
            </div>
        )
    }
}

export default ProductDetail
