import React, { Component } from 'react';
import Menu from './Menu';
import Welcome from './Welcome';
import './style.css';

export default class HomePage extends Component {
		render(){
        return (
            <React.Fragment>
            <Welcome/>
           <Menu/>
           </React.Fragment>
        )
    }
}
