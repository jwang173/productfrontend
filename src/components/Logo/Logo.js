import React from 'react';

import Logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <span className={classes.Logo} style={{height: props.height}}>
        <img src={Logo} alt="MyProds" style={{height:"100%"}}/>
    </span>
);

export default logo;