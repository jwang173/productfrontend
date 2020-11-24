import React from 'react';
import classes from '../FilterPart/FilterPart.css'


const FilterPart = ( props ) => {
    return (
    <div className={classes.FilterPart} onClick={props.click}>
        <span>{props.label}</span>
        {props.content}
    </div>
    )

    
}

export default FilterPart;