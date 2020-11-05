import React from 'react';
import classes from '../FilterPart/FilterPart.css'


const FilterPart = ( props ) => {
    return (
    <div className={classes.FilterPart}>
        <span>{props.label}</span>
        {props.content}
    </div>
    )

    
}

export default FilterPart;