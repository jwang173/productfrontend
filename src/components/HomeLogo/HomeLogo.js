import React from 'react';

import HomeLogo from '../../assets/images/logo2.png';
import classes from './HomeLogo.css';

const homelogo = (props) => (
    <span className={classes.HomeLogo} style={{height: props.height}}>
        <img src={HomeLogo} alt="MyProdsHome" style={{height:"100%"}}/>
    </span>
);

export default homelogo;