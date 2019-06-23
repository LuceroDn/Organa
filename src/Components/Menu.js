import React, { Component } from 'react'
import { fadeIn } from 'react-animations'
import Radium, {StyleRoot} from 'radium';
import ele from '../img/ele.png'
import eleBlanca from '../img/ele_blanca.png'
import { Link } from "react-router-dom"


import './style.css';
const styles = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}
export default class Menu extends Component {
  constructor() {
		super();
		this.state = {
            shown: true,
		};
    }	
    toggle() {
      this.setState({
        shown: !this.state.shown,
          });
    }
      componentDidMount=()=>{
              setTimeout (()=>this.toggle(),1000)
          }
          
         
    render() {
      var hidden = {
        display: this.state.shown ? "none" : "block",
      }
      
        return (
          <StyleRoot>
            <section className = "homePage" style={hidden}>
            <div style={styles.fadeIn}>

<div class=" section group">
    <div class="side1 col span_1_of_2">
        <div>
        <Link to="/scanner"> <img class="blackL " src={ele} alt=""></img></Link>
                </div>
                <div class="h1">
                    <h1 class="text-center"><span class="title">Asistencia</span><hr/><span class="subtitle">Código QR</span></h1>
                </div>
            </div>
            <div class="col span_1_of_2 side2">
                <div >
                <Link to="/attendance">   <img class="whiteL" src={eleBlanca} alt=""></img></Link> 
                </div>
                <div class="h1">
                    <h1 class="text-center blackSide"><span class="title">Reporte</span><hr /><span class="subtitle">Estadistica</span></h1>
                </div>
            </div>
            
        </div>
    </div>
      </section>
        </StyleRoot>
        )
    }
}
