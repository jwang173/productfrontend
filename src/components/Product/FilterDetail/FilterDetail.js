import React from 'react'

function FilterDetail(props) {
    return (
        <div>
            <span>{props.label}</span>
            <input id={props.label} type="number" defaultValue={props.minValue}></input>
            ----
            <input id={props.label} type="number" defaultValue={props.maxValue}></input>
            {/* <span>{props.minValue}</span>
            ----
            <span>{props.maxValue}</span> */}
        </div>
    )
}

export default FilterDetail
