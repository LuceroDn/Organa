import React, { Component } from 'react'
import './statistics.css'
import moment from "moment";
import ele_black from '../img/ele_black.png'
import x from '../img/x.png'
import firebase from '../firebase'
import { Link } from "react-router-dom"
let today = new Date();
let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
let listAll = [];
let studentsListLength = '';
let attendanceListLength='';
let studentsListOnTimeLength = '';
let studentsListDelayLength = '';


export default class Attendance extends Component {
    state = {
        result: '',
        attendanceList: [],
        studentsList: [],
    }


    studentsOnTime = () => {
        // console.log(this.state.attendanceList)
      
        // studentsListOnTimeLength = this.state.attendanceListList[0].filter(item => item.state === "on Time")
        // console.log(studentsListOnTimeLength)
    }


    studentsListFromFirebase = () => {
        let ref = firebase.database().ref('studentsList');
        ref.on("value", snapshot => {
            listAll = this.snapshotToArray(snapshot);
            this.setState({
                studentsList: listAll
            }, () => {
                studentsListLength = this.state.studentsList[0].length
            })
        });
    }
    attendanceListFromFirebase = () => {
            let ref2 = firebase.database().ref('attendance');
            ref2.on("value", snapshot => {
               // let attendanceListFromFirebase = this.snapshotToArray(snapshot);
                this.setState({
                    attendanceList: snapshot.val()
                }, () => {
                    let test;
                    test = this.state.attendanceList[`${date}`]
                    for (const prop in test){
                        attendanceListLength++;
                    } 
                    console.log(attendanceListLength-1)
                 
                    
                })
            })
        }
       // Convert Data from firebase (object) To an array
    snapshotToArray = (snapshot) => {
        let returnArr = [];
        snapshot.forEach(function(childSnapshot) {
            let item = childSnapshot.val();
            returnArr.push(item);
        });
        return returnArr;
    }

    //Get data listStudents from Firebase
    componentDidMount() {
        this.studentsListFromFirebase();
        this.attendanceListFromFirebase();
        this.studentsOnTime();
    }
    render() {
        return ( 
        <div >
            <nav class = "navbar navLx" >
            <img src = { ele_black }
            class = "d-inline-block align-top imgLBlack"
            alt = "" />
            <Link to = '/menu'><img src = { x }class = "x" alt = ""/>
            </Link></nav>

            <div class = "row" >
            <div class = "col" >
            <p class = "text-center date" > { moment().format('MMMM Do YYYY, h:mm:ss a') } </p> </div> </div>


            <div class = "card1 text-center col-ms-9" >
            <p class = "textCard" > Hoy llegaron </p> 
            <div class = "attendance" id = "attendance" > <span>{attendanceListLength} de </span><span>{studentsListLength } </span></div> 
            <p class = "textCard" > estudiantes </p> 
            </div> 
            <div class = "container" >
            <div class = "row" >
            <div class = "card2 text-center" >
            <p class = "textCard" > Ausencias </p> 
            <div class = "attendance"
            id = "" > 5 </div> 
            <p class = "more" > Ver más </p> 
            </div>

            <div class = "card2 text-center" >
            <p class = "textCard" > </p>
            <div class = "attendance"
            id = "delay" > 3 </div> 
            <p class = "more" > Ver más </p> 
            </div>

            <div class = "card2 text-center" >
            < p class = "textCard" > Deserción </p> 
            <div class = "attendance"
            id = "" > 3 </div> 
            <p class = "more" > Ver más </p> 
            </div> 
            </div> 
            </div>  
            </div>
        )
    }
}