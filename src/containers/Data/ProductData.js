import React, { Component } from 'react'

class ProductData extends Component {
    constructor(props){
        super(props);
        this.state={
            mytext: []
        }
    }

    getData(){
        //修改请求头
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        });
        fetch('http://127.0.0.1:8081/ProductBackend_war_exploded/helloproducts',{
            method:'GET',
            headers: myHeaders,
            mode: 'cors',
            //转或称字符串格式
        }).then(res=>res.json()).then(
            data=>{
                console.log(data);
                // eslint-disable-next-line
                data.map((key)=>{
                    this.setState({
                        mytext: [...this.state.mytext, key]
                    })
                })
            }
        )
    }
    //React周期函数，防止死循环,在组建被渲染前调用
    componentWillMount(){
        this.getData();
    }

    render() {
        console.log(this.state.mytext)
        return (
            <div>
                
                <React.Fragment>
                <ul>
                    {
                        this.state.mytext.map(item=> (
                            item["name"]
                        ))
                    }
                </ul>
                </React.Fragment>
            </div>
        )
    }
}

export default ProductData
