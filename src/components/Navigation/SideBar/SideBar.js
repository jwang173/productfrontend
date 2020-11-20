import React, { Component } from 'react'
import "./SideBar.css"

export class SideBar extends Component {
    cssJoin = (str1, str2) => {
        return str1+" "+str2;
    }
    render() {
        return (
            <span className="SideBar" style={{textAlign:"justify"}}>
                <div>
                    Search:
                    <button>Save</button>
                    <button>Clear</button>
                </div>
                <div>
                    <div>
                        Product Type
                        <button></button>
                    </div>
                    <div className={this.cssJoin("SideBar","ModelYear")}>
                        Model Year: 
                        &nbsp;&nbsp;
                        <span />
                                <span>
                                    <input id="number1" type="number" defaultValue="2010" style={{width:"15%"}} />
                                    -
                                    <input id="number2" type="number" defaultValue="" style={{width:"15%"}} />
                                </span>
                    </div>
                </div>
                <div>
                    <div>
                        Technical Specifications
                    </div>
                
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
                <div>
                    <div>Brand</div>
                    <div>
                        <input type="radio" name="Midea" checked></input>
                        <label>Midea</label>
                        <input type="radio" name="Haier"></input>
                        <label>Haier</label>
                    </div>
                
                </div>
                <div>1</div>
                <div>2</div>
            </span>
        )
    }
}

export default SideBar
