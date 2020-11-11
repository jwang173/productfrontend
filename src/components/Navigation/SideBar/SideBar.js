import React, { Component } from 'react'

export class SideBar extends Component {
    render() {
        return (
            <div>
                <div>
                    Search:
                    <button>Save</button>
                    <button>Clear</button>
                </div>
                <div>Product Type
                    <button></button>
                    <span>
                            Model Year: 
                                <span>
                                    <input id="number" type="number" defaultValue="2010"/>
                                    -
                                    <input id="number2" type="number2" defaultValue="" />
                                </span>
                    </span>
                </div>
                <div>
                Technical Specifications
                <div>
                    <div>Max power(W)</div>
                    
                    <label >9.84</label>
                    <input type="range" name="maxPower" min="9.84" max="96.52" />
                    <label>96.52</label> 
                </div>
                <div>
                    <div>Sound at max speed(dBA)</div>
                    <label>20</label>
                    <input type="range" name="soundAtMaxSpeed" min="20" max="80" />
                    <label>80</label>
                </div>
                </div>
                <div>Brand
                    <div>
                        <input type="radio" name="Midea" checked></input>
                        <label>Midea</label>
                        <input type="radio" name="Haier"></input>
                        <label>Haier</label>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default SideBar
