import React, { Component } from 'react'
import {connect} from 'react-redux';
import ProductData from '../Data/ProductData';
import * as actions from '../../store/actions/index';
// import NavigationProds from '../../components/Navigation/NavigationProds/NavigationProds'
class ProductCompare extends Component {
    componentDidMount() {
        this.props.onSetRouteSignal(true);
    }
    render() {
        let comparedList = this.props.comparedList;
        let keys = Object.keys(this.props.comparedList[0]);
        console.log(comparedList);
        console.log(this.props.signal);
        console.log(keys);
        return (
            <div>
                <table>
                    {keys.map( key=> (
                        <tr>{key}
                        {comparedList.map(item => (
                            <td>{item[key]}</td>
                        ))}
                        </tr>
                    )
                        
                    )}
                </table>
                {/* <NavigationProds isAuth={this.props.isAuthenticated} /> */}
                {ProductData}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tagList: state.productList.tagList,
        prodList: state.productList.productList,
        isAuthenticated: state.auth.token !== null,
        searchList: state.productSearch.searchList,
        comparedList: state.productCompare.prodCompareList,
        signal: state.productSearch.signal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCompareList: (idArr) => dispatch(actions.compareList(idArr)),
        onProductListShown: () => dispatch(actions.fetchList()),
        onSearchList: (target) => dispatch(actions.searchList(target)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onSetRouteSignal: (signal) => dispatch(actions.setRouteSignal(signal))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCompare)
