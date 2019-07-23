import React from 'react';
import './Components/style.css';
import HomePage from './Components/HomePage';
import Scanner from './Components/Scanner';
import Statistics from './Components/Statistics';
import Menu from './Components/Menu';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css'

function App() {
    return ( <BrowserRouter >
        < Route exact path = "/" component = { HomePage }/> 
        <Route path = "/scanner" component = { Scanner }/> 
        <Route path = "/statistics"component = { Statistics }/> 
        <Route path = "/menu" component = { Menu }/> 
        </BrowserRouter >

    );
}

export default App;