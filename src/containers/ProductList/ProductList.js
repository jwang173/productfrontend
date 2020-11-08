import React, { Component } from 'react'
import ListPage from '../../components/Product/ListPage/ListPage';
import ProductData from '../../datasource/ProductData';

class ProductList extends Component {
    List = (
                <span>
                    {ProductData.map(item => (
                        <ListPage
                            key = {item["id"]}
                            label = {item["id"]}
                            name = {item["name"]} />
                    ))}
                </span>
            )
    render() {
        return (
            <span>
                {this.List}
            </span>
        )
    }
}

export default ProductList
