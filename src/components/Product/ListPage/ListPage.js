import aux from '../../../hoc/Aux2/Aux2';
import "./ListPage.css"
import React, { Component } from 'react'
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

function ListPage(props) {
    
    return (
                // <span> 
                //     <span>
                //     {props.label}
                //     <br />
                //     {props.name}
                //     <br />
                //     </span>
                // </span>
                <div className="ListPage card">
                    <div className="ListPage container">
                        <p>{props.id}</p>
                        <p>{props.name}</p>
                        <p>{props.year}</p>
                        <p>{props.brand}</p>
                        <p>{props.type}</p>
                        {/* <div className="ListPage compare">
                        <label for={props.id} style={{display:"inline-block"}}>Compare</label>
                        <input type="checkbox" id={props.id} onClick={() => clickHandler()} />
                        </div> */}
                        
                    </div>
                </div>
                
    )
}

export default ListPage;

