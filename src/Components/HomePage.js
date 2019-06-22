import React, { Component } from 'react';
import Home from './Home';
import Welcome from './Welcome';
import './style.css';

export default class HomePage extends Component {
		render(){
        return (
            <React.Fragment>
            <Welcome/>
           <Home/>
           </React.Fragment>
        )
    }
}
