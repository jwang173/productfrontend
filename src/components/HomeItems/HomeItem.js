import React from 'react'
import Homelogo from '../HomeLogo/HomeLogo';
import Logo from '../Logo/Logo'
import './HomeItem.css';

function HomeItem() {
    return (
        <div className="HomeItem">
            <Homelogo />
            <h4 style={{color:"grey"}}>Building Product Selection Platform</h4>
        </div>
    )
}

export default HomeItem;
