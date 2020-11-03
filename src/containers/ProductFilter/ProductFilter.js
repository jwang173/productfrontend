import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux2/Aux2';
import FilterPage from '../../components/Product/FilterPage';

class ProductFilter extends Component {
    render() {
        return <FilterPage />
    }
}

export default ProductFilter;