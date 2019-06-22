
import React, { Component } from 'react'
import laboratoria from '../img/laboratoria_amarillo.png'
import { fadeOut } from 'react-animations'
import Radium, {StyleRoot} from 'radium';

const styles = {
    fadeOut: {
      animation: 'x 3s',
      animationName: Radium.keyframes(fadeOut, 'fadeOut')
    }
  }
export default class HomePage extends Component {
    constructor() {
		super();
		this.state = {
            style: styles,
            shown: true,
		};
    }	
    toggle() {
		this.setState({
            style: styles.fadeOut,
        });
  }
  
  style() {
    this.setState({
      shown: !this.state.shown,
        });
  }
		componentDidMount=()=>{
            setTimeout (()=>this.toggle(),1000)
        }
        
       
	render() {
		
        return (
          <StyleRoot>
            <div style={this.state.style}>
            <img  style= {this.state.shown} src={laboratoria} class="laboratoriaimg" alt=""></img>
            
</div>
</StyleRoot>
        )
    }
}
