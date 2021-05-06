
import React, {Component,  useState, useEffect } from 'react';
import {BrowserRouter, Link, Route, useHistory, Redirect} from 'react-router-dom'
import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './login.css';
import logo from '../logo.png' 
import chat_page from '../chat_page/chat_page'
// TODO: Make this App.css instead!
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: null,

        };
        this.socket =  socketIOClient(ENDPOINT);
    }


    componentDidMount(){
        let socket = this.socket

        socket.on("login", data => {
            this.setState({success:data})
            console.log(this.state.success);
          //   const history = useHistory();
          //   history.push("/chats");
          });

        socket.on("Error", data => {
          console.log("Error in login: " + data);
          // TODO: Create popup with error from data
      });
    }
   

    
    render () {

        // const [response, setResponse] = useState("");
        // const socket = socketIOClient(ENDPOINT);
        let socket = this.socket
        let enter;

        // socket.on("login", data => {
        //       this.setState({success:data})
        //       console.log(this.state.success);
        //     //   const history = useHistory();
        //     //   history.push("/chats");
        //     });

        // socket.on("Error", data => {
        //     console.log("Error in login: " + data);
        //     // TODO: Create popup with error from data
        // });


        if (this.state.success != 'failure' && this.state.success != null) {

            this.props.handler(this.state.success)
            return(<Redirect to="/chats" />)
        }
        else {
            enter = 
            <Purple_Button name = "Login" click = {()=>{
                socket.emit("login", {"username": document.getElementById("Username").value, "password": document.getElementById("Password").value})
                
        }} />
        }    
        

        return (
            <div>
            <div class="nav">
                {/* TODO: Change path back to create */}
            <Link to="/edit" style={{textDecoration:'none'}}>
                <White_Button_Right name = "Create Account" />
            </Link>
            </div>
            <div class="content">
                <img src = {logo} className = "logo_style"></img>
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