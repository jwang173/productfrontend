import React from 'react'
import aux from '../../../hoc/Aux2/Aux2';

function ListPage(props) {
    return (
    
                <span>
                    <span>
                    {props.label}
                    <br />
                    {props.name}
                    <br />
                    </span>
                </span>
        
    )
}

export default ListPage;
