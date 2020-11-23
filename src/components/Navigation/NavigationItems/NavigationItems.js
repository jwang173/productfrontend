import React from 'react'

function NavigationItems(props) {
    return (
        
        <div tags={props.tagList}>
            {props.tagList}
        </div>
    )
}

export default NavigationItems;