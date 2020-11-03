import React, { Component } from 'react';
import userData from '../../../datasource/UserData';
import productData from '../../../datasource/ProductData';

import Aux from '../../../hoc/Aux2/Aux2';

class FilterPage extends Component {
    
    componentWillUpdate() {
        console.log('[FilterPage] WillUpdate');
    }

    // componentDidMount() {
    //     let useType = [];
    //     for(let i in products) {
    //         useType.push(i[useType]);
    //     }
    // }
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
        const Ans = res[titlename].map(prodKey => {
            return <span key = {prodKey}>
                <input type="radio"  id = {prodKey} name={titlename} value={prodKey} style={{ textTransform: 'capitalize' }} />
                <label for={prodKey} style={{ textTransform: 'capitalize' }}>{prodKey}</label>
            </span>
        })
        return Ans;
    }


    render() {
        // let useType = [];

        // console.log(productData);
        // for(let i = 0; i < productData.length; i ++) {
        //     // console.log(productData[i]["useType"])
        //     useType.push(productData[i]["useType"])
        // }
        // useType = Array.from(new Set(useType));

        // let res = this.Createchoice(productData);
        // console.log(res);

        // let itemTitle = "";
        // for(let i in res ) {
        //     itemTitle = i;
        //     // let {itemTitle} = res[i];
        //     console.log(res[itemTitle]);
        //     console.log(itemTitle);
            
        // }

        // useType = res["useType"];
        // const use_type = useType.map(prodKey => {
        //     return <span key = {prodKey}>
        //         <input type="radio"  id = {prodKey} name="useType" value={prodKey} style={{ textTransform: 'capitalize' }} />
        //         <label for={prodKey} style={{ textTransform: 'capitalize' }}>{prodKey}</label>
        //     </span>
        // })
        const application = this.CreateList("application")
        const useType = this.CreateList("useType");
        const location = this.CreateList("location");
        return (
                <Aux>
                    <div>
                        <h3>Type</h3>
                        <div>
                            <div>
                                <span>Use Type  </span>{useType}
                            </div>
                            <div>
                                <span>Application</span>{application}
                            </div>
                            <div>
                                <span>Mounting Location</span>{location}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Technique Details</h3>
                    </div>
                    <div>
                        <h3>brand</h3>
                    </div>
                </Aux>
            )
    }
}

export default FilterPage;