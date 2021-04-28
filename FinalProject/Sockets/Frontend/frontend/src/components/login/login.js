
import React, {Component,  useState, useEffect } from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './login.css'; 
import chat_page from '../chat_page/chat_page'
// TODO: Make this App.css instead!
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
              this.setState({success:data})
              console.log(this.state.success);
            });
        let enter;

        socket.on("Error", data => {
            console.log("Error in login: " + data);
            // TODO: Create popup with error from data
        });


        if (this.state.success == 'success') {
            enter = 
            // <BrowserRouter>
            // {/* <chat_page/> */}
            // {/* </BrowserRouter>  */}
            // TODO: Get routing behavior
            // 
            <Link to="/chats" style={{textDecoration:'none'}}>
                <Purple_Button name = "Login" click = {()=>socket.emit("login", {"username": document.getElementById("Username").value, "password": document.getElementById("Password").value})} />
            </Link>
        }
        else {
            enter = 
            <Purple_Button name = "Login" click = {()=>socket.emit("login", {"username": document.getElementById("Username").value, "password": document.getElementById("Password").value})} />
        }    
        

        return (
            <div>
            <div class="nav">
            <Link to="/create" style={{textDecoration:'none'}}>
                <White_Button_Right name = "Create Account" />
            </Link>
            </div>
            <div class="content">
                <Input_Field name = "Username" id = "Username" />
                <Input_Field name = "Password" id = "Password" />
                {enter}
                <Link to="/forgot" style={{textDecoration:'none'}}>
                    <White_Button name = "Forgot Password?" />
                </Link>
            </div>
            </div>
        )
    }
}
export default login;