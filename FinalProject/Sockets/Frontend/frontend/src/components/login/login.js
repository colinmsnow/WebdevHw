import React, {Component,  useState, useEffect } from 'react';
import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './login.css'
import {BrowserRouter, Switch, Route } from "react-router-dom"
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: null

        };
    }

    

    
    render () {

        // const [response, setResponse] = useState("");
        const socket = socketIOClient(ENDPOINT);

        socket.on("login", data => {
            //   socket.emit("FromFrontend", "hello")
            //   console.log(this.state.success);
              this.setState({success:data})
              console.log(this.state.success);
            //   console.log(document.getElementById("Username"))
            //   console.log(document.getElementById("Username").value)
            });


        // useEffect(() => {
        //     const socket = socketIOClient(ENDPOINT);
        //     socket.on("login", data => {
        //     //   socket.emit("FromFrontend", "hello")
        //       console.log(data);
        //     //   this.setState({success:data})
        //     });
        //   }, []);


        

        const rightStyle = {alignItems: "end", display: "flex"}
        return (
            <div>
            <White_Button_Right name = "Create Account" />
            <div class="content">
                <Input_Field name = "Username" id = "Username" />
                <Input_Field name = "Password" id = "Password" />
                <Purple_Button name = "Login"  click = {()=>socket.emit("login", {"username": document.getElementById("Username").value, "password": document.getElementById("Password").value})} />
                <White_Button name = "Forgot Password?" />
            </div>
            </div>
        )
    }
}
export default login;