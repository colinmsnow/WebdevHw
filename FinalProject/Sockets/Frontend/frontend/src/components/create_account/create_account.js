import React, { Component, useState, useEffect } from 'react';
// import {Link} from 'react-router-dom'
import { Purple_Button, Purple_Button_Right } from '../buttons/buttons';
import { BrowserRouter, Link, Route, useHistory, Redirect } from 'react-router-dom'

import Input_Field from '../input_field/input_field';
import '../login/login.css';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class create_account extends Component {
    // Create account page

    constructor(props) {
        super(props);
        this.state = {
            success: null

        };
        this.socket = socketIOClient(ENDPOINT);

    }

    componentDidMount() {
        let socket = this.socket;

        socket.on("new_user", data => {
            // Create a new user
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

        let socket = this.socket;

        if (this.state.success != 'failure' && this.state.success != null) {
            // If login returns a username and not failure move to chat page

            this.props.handler(this.state.success)
            return (<Redirect to="/" />)
        }

        return (
            <div>
                <div class="nav">
                    <Link to="/" style={{ textDecoration: "none", marginRight: "3em" }}>
                        <Purple_Button_Right name="Back" />
                    </Link>
                </div>
                <div class="content">
                    <Input_Field name="First Name" id="new_first_name" />
                    <Input_Field name="Last Name" id="new_last_name" />
                    <Input_Field name="Username" id="new_username" />
                    <Input_Field name="Password" id="new_password" />
                    <Input_Field name="Confirm Password" id="confirm_password" />
                    <Purple_Button name="Create Account" click={() => socket.emit("create_user", { "username": document.getElementById("new_username").value, "password": document.getElementById("new_password").value, "name": (document.getElementById("new_first_name").value + " " + document.getElementById("new_last_name").value), "confirm_password": document.getElementById("confirm_password").value })} />
                </div>
            </div>
        )
    }
}
export default create_account;