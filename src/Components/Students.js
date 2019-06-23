import React, { Component } from 'react'
import firebase from '../firebase'
let today= new Date();
        let date = today.getDate() + '-'+ (today.getMonth()+1)+'-' + today.getFullYear();
export default class Students extends Component {
    
    componentDidMount (){
        
        fetch('https://laboratoria-la.firebaseapp.com/cohorts/gdl-2019-01-bc-core-gdl-002/users')
            .then(function(response) {
                return response.json();
            }).then((myJson) => {
                console.log("Done");
                let students = [];
                myJson.forEach(element => {
                    if (element.role === 'student') {
                        students.push(element);
                    }
                });

               firebase.database().ref('studentsList').set({
                    students
                 })

                 let ref = firebase.database().ref('attendance');
                 ref.on("value", snapshot => {
                  let  attendanceListFromFirebase= this.snapshotToArray(snapshot);
                  console.log(attendanceListFromFirebase)
                   if (attendanceListFromFirebase.length===0){
                     firebase.database().ref('attendance').child(date).child('0').set({
                         name: "null"
                     })
                   }
                 })
            })
        }
        snapshotToArray = (snapshot) => {
            let returnArr = [];
            snapshot.forEach(function(childSnapshot) {
              let item = childSnapshot.val();
              returnArr.push(item);
            });
            return returnArr;
          }
       
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

