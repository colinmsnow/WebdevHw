
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, useHistory, Redirect } from 'react-router-dom'
import { Purple_Button, White_Button, Purple_Button_Right, Red_Button } from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './edit_profile.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class edit_profile extends Component {
    // Edit profile page

    constructor(props) {
        super(props);
        this.state = {
            success: null,
            first_name: "nothing",
            name: "nothing",
            username: "nothing",
            password: "nothing"

        };
        this.username_changed = false;
        this.socket = socketIOClient(ENDPOINT);
    }

    componentDidMount() {
        let socket = this.socket

        socket.on("user", data => {
            // Get user info and update state
            console.log("Received some data")
            console.log(data)
            this.setState({ success: data.success, username: data.username, password: data.password, first_name: data.first_name, name: data.name })
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

        if (this.state.success == null) {
            // If the user has not been read, get it.
            socket.emit("get_user", { username: this.props.user })
        }

        if (this.state.success == 'deleted') {
            // Account was deleted, redirect to login
            return (<Redirect to="/" />)
        }

        if (this.username_changed){
            // If the username changes you need to re login
            return (<Redirect to="/" />)
        }

        return (
            <div>
                <div class="nav">
                    <Link to="/chats" style={{ textDecoration: 'none' }}>
                        <Purple_Button_Right name="Back" />
                    </Link>
                </div>
                <div class="content">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <h3>First Name:</h3>
                                </td>
                                <td>
                                    <Input_Field id="First Name" placeholder={this.state.first_name} />
                                </td>
                                <td>
                                    <Purple_Button name="Update" style={{ marginTop: '0em', marginLeft: '1em' }} click={() => {
                                        console.log("pressed update button")
                                        socket.emit("update_firstname", { username: this.props.user, newname: document.getElementById("First Name").value })
                                        this.setState({ success: null })
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>Name:</h3>
                                </td>
                                <td>
                                    <Input_Field id="Last Name" placeholder={this.state.name.split(' ')[1]} />
                                </td>
                                <td>
                                    <Purple_Button name="Update" style={{ marginTop: '0em', marginLeft: '1em' }} click={() => {
                                        console.log("pressed update button")
                                        socket.emit("update_name", { username: this.props.user, newname: (document.getElementById("First Name").value + " " + document.getElementById("Last Name").value) })
                                        this.setState({ success: null })
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>Username:</h3>
                                </td>
                                <td>
                                    <Input_Field id="Username" placeholder={this.state.username} />
                                </td>
                                <td>
                                    <Purple_Button name="Update" style={{ marginTop: '0em', marginLeft: '1em' }} click={() => {
                                        console.log("pressed update button")
                                        socket.emit("update_username", { username: this.props.user, newname: document.getElementById("Username").value })
                                        this.props.handler(document.getElementById("Username").value)
                                        this.username_changed = true
                                        this.setState({ success: null })
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>Password:</h3>
                                </td>
                                <td>
                                    <Input_Field id="Password" placeholder={this.state.password} />
                                </td>
                                <td>
                                    <Purple_Button name="Change" style={{ marginTop: '0em', marginLeft: '1em' }} click={() => {
                                        console.log("pressed update button")
                                        socket.emit("update_password", { username: this.props.user, newpassword: document.getElementById("Password").value })
                                        this.setState({ success: null })
                                    }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Red_Button name="Delete Account" click={() => {
                        console.log("Deleting account")
                        socket.emit("delete_account", { username: this.props.user })
                        this.setState({ success: "deleted" })
                    }} />
                </div>
            </div>
        )
    }
}
export default edit_profile;