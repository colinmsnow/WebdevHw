
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, useHistory, Redirect } from 'react-router-dom'
import { Purple_Button, White_Button, White_Button_Right } from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './login.css';
import logo from '../logo.png'
import chat_page from '../chat_page/chat_page'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class login extends Component {
    // Login page

    constructor(props) {
        super(props);
        this.state = {
            success: null,
        };
        this.socket = socketIOClient(ENDPOINT);
    }

    componentDidMount() {
        let socket = this.socket

        socket.on("login_response", data => {
            // Write login results to state
            this.setState({ success: data })
            console.log(this.state.success);
        });

        socket.on("Error", data => {
            // Error handler. Prints error message to console
            console.log("Error in chat_page: " + data.message);
            if (data.show == "true"){
                alert(data.message)
            }
            
        });
    }

    render() {

        let socket = this.socket
        let enter;

        if (this.state.success != 'failure' && this.state.success != null) {
            // Checks if the login produced a username and not failure
            // Redirects to chats if successful
            this.props.handler(this.state.success)
            return (<Redirect to="/chats" />)
        }

        else {
            // Button to login. Sends login socket request
            enter =
                <Purple_Button name="Login" click={() => {
                    console.log("Clicked login button")
                    socket.emit("login", { "username": document.getElementById("Username").value, "password": document.getElementById("Password").value })

                }} />
        }


        return (
            <div>
                <div class="nav">
                    <Link to="/create" style={{ textDecoration: 'none' }}>
                        <White_Button_Right name="Create Account" />
                    </Link>
                </div>
                <div class="content">
                    <img src={logo} className="logo_style"></img>
                    <Input_Field name="Username" id="Username" />
                    <Input_Field name="Password" id="Password" />
                    {enter}
                    <Link to="/forgot" style={{ textDecoration: 'none' }}>
                        <White_Button name="Forgot Password?" />
                    </Link>
                </div>
            </div>
        )
    }
}
export default login;