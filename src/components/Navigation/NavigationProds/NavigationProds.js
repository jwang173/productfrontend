import { NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Aux2/Aux2';
import Logo from '../../Logo/Logo';
import productData from '../../../datasource/ProductData';
import userData from '../../../datasource/UserData';
// import classes from '../NavigationProds/NavigationProds.css'
import './NavigationProds.Module.css'
import React, { Component } from 'react'


class NavigationProds extends Component {
    state = {
        Type: []
    }
    Createchoice = (Arr) => {
        let len = Arr.length;
        // console.log(len);
        // let keyLen = Object.keys(Arr[0]).length;
        let keys = Object.keys(Arr[0]);
        console.log(keys);
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
        console.log(res);
        resKeys = Object.keys(res);
        for(let i of resKeys) {
            if(res[i].length === 0) {
                delete res[i];
            }
        }
        console.log(res);
        return res
    }

    CreateList = (titlename) => {
        // let title;
        // title = titlename.toUpperCase();
        let res = this.Createchoice(productData);
        console.log(res);
        const Ans = res[titlename].map(prodKey => {
            return <span key = {prodKey}>
                <input type="radio"  id = {prodKey} name={titlename} value={prodKey} />
                <label for={prodKey} style={{ textTransform: 'capitalize' }}>{prodKey}</label>
            </span>
        })
        return Ans;
    }
    
    render() {
        const useType = this.CreateList("useType");
        console.log(useType);
        let SelectItems = (
            <span>
                <select name="useType">
                    
                    {useType.map(item => (
                        <option value={item["key"]}>{item["key"]}</option>
                    ))}
                </select>
            </span>
            )
        return (
            <div className="NavigationProds" >
                
                <span>
                    <Logo />
                </span>
                <span>
                    <NavLink to = "/" exact ="/">
                        <Aux>
                        {SelectItems}
                        </Aux>
                        <Aux>
                            <input id="Search" type="text" placeholder="Search..."></input>
                        </Aux>
                    </NavLink>
                </span>
            </div>
        )
    }
}

export default NavigationProds;