import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import './scanner.css'
import ele_Black from '../img/ele_black.png'
import x from '../img/x.png'
import flecha_l from '../img/flecha_l.png'
import flecha_r from '../img/flecha_r.png'
import { Link } from "react-router-dom"
import firebase from '../firebase'
import Students from './Students.js'
import moment from "moment";
// let getHours = today.getHours();
let today = new Date();
let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
let hour = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
let getHours = today.getHours();
let listAll = [];

export default class Scanner extends Component {
    state = {
        result: '',
        attendanceList: [],
        studentsList: [],
    }

    //Get data listStudents from Firebase
    componentDidMount() {
        let ref = firebase.database().ref('studentsList');
        ref.on("value", snapshot => {
           // listAll = this.snapshotToArray(snapshot);
            this.setState({
                studentsList: snapshot.val()
            }, () => {
               console.log(this.state.studentsList)
            })
        });

        this.attendanceListFromFirebase();
    }

    attendanceListFromFirebase = () => {
            let ref = firebase.database().ref('attendance');
            ref.on("value", snapshot => {
                //let attendanceListFromFirebase = this.snapshotToArray(snapshot);
                this.setState({
                    attendanceList: snapshot.val()
                }, () => {
               
                })
            })
        }
        //Convert Data from firebase (object) To an array
    snapshotToArray = (snapshot) => {
        let returnArr = [];
        snapshot.forEach(function(childSnapshot) {
            let item = childSnapshot.val();
            returnArr.push(item);
        });
        return returnArr;
    }
arriveTime=(data,attendance)=>{
    
    if(getHours<8){
                   
        firebase.database().ref('attendance').child(date).child(data).set({
            name:attendance[0].name,
            id:attendance[0].id,
            status: "on Time"
        });
        
    }else{
        
        firebase.database().ref('attendance').child(date).child(data).set({
            name:attendance[0].name,
            id:attendance[0].id,
            status: "delay"
        });
       
    }
    this.setState({
        result: "Bienvenida " + attendance[0].name,
    })
}

    handleScan = data => {
        let attendance;
        let alreadyCheck ; 
        if (data) {
            console.log(data)
            const student = this.state.studentsList.students.filter(item => item.name === data);
            attendance = student;
            
            if (attendance.length < 1) {
                this.setState({
                    result: "codigo incorrecto",
                });
            } else {  
                let test;
                test = this.state.attendanceList[`${date}`]
                for (const prop in test){
                    if (prop===data){
                        console.log("repetida")
                        this.setState({
                            result: "Bienvenida de nuevo",
                        });
                    } else{
                        this.arriveTime(data, attendance);
                    }
                } 
            }
        }
    }

    handleError = err => {
        console.error(err)
    }
    render() {

        return ( 
        <div>
            <Students/>
            <nav className = "navbar navLx" >
            <div className = "navbar-brand">
            <img src = {ele_Black} className = "d-inline-block align-top imgLBlack" alt = "" ></img> 
            <Link to = "/menu" > <img src = { x } className = "x" alt = "" ></img></Link >
            </div> 
            </nav> 
            <h2 className = "hour" > { moment().format('MMMM Do YYYY, h:mm:ss a') } </h2>

            <div className = "row" >

            <div className = "col" >
            <h1 className = "text-center titleAttend" > Asistencia </h1> 
            <p className = "text-center qr" > Ingresa tu código QR </p> 
            </div> 
            </div>

            <div className = "container" >
            <div className = "row" >
            <img className = "flecha2"src = { flecha_l }alt = "" ></img>        
            <QrReader className = "cameraStyle"
            delay = { 2000 }
            onError = { this.handleError }
            showViewFinder = { false }
            onScan = { this.handleScan }
            //   style={{width: 300}}
            /> 
            <img className = "flecha2"src = { flecha_r }alt = "" ></img> 
            </div> 
            </div>

            <div className = "message text-center"id = "welcome-message" > { this.state.result } </div>

            </div>
        )
    }
}