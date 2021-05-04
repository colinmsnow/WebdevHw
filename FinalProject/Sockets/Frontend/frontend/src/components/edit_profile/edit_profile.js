
import React, {Component,  useState, useEffect } from 'react';
import {BrowserRouter, Link, Route, useHistory, Redirect} from 'react-router-dom'
import {Purple_Button, White_Button, Purple_Button_Right, Red_Button} from '../buttons/buttons';
import Input_Field from '../input_field/input_field';
import './edit_profile.css'; 
// TODO: Make this App.css instead!
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

class edit_profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: null,
            first_name: "nothing",
            last_name: "nothing",
            username: "nothing",
            password: "nothing"

        };
    }

   

    
    render () {

        // const [response, setResponse] = useState("");
        const socket = socketIOClient(ENDPOINT);

        socket.on("user", data => {
            console.log("Received some data")
            console.log(data)
              this.setState({success:data.success, username:data.username, password:data.password, first_name:data.first_name, last_name:data.last_name})
              console.log(this.state.success);

            });


        if (this.state.success == null){
            socket.emit("get_user", {username:this.props.user})
        }

        return (
            <div>
            <div class="nav">
            {/* TODO: Make this actually go back using router history */}
            <Link to="/chats" style={{textDecoration:'none'}}>
                <Purple_Button_Right name = "Back" />
            </Link>
            </div>
            <div class="content">
                <table width = "100%">
                    <tbody>
                        <tr> 
                            {/* TODO: Onclick, change buttons to be submit and enable fields */}
                            <td>
                                <h3>First Name:</h3>
                            </td>
                            <td>
                                <Input_Field id = "First Name" placeholder = {this.state.first_name} disabled = "true"/>
                            </td>
                            <td>
                                {/* <div className="in_table"> */}
                                <Purple_Button name= "Edit" style = {{marginTop: '0em', marginLeft: '1em'}} />
                                {/* </div> */}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Last Name:</h3>
                            </td>
                            <td>
                                <Input_Field id = "Last Name" placeholder = {this.state.last_name} disabled = "true"/>
                            </td>
                            <td>
                                {/* <div className="in_table"> */}
                                <Purple_Button name= "Edit" style = {{marginTop: '0em', marginLeft: '1em'}} />
                                {/* </div> */}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Username:</h3>
                            </td>
                            <td>
                                <Input_Field id = "Username" placeholder = {this.state.username} disabled = "true"/>
                            </td>
                            <td>
                                {/* <div className="in_table"> */}
                                <Purple_Button name= "Edit" style = {{marginTop: '0em', marginLeft: '1em'}} />
                                {/* </div> */}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Password:</h3>
                            </td>
                            <td>
                                <Input_Field id = "Password" placeholder = {this.state.password} disabled = "true"/>
                            </td>
                            <td>
                                {/* <div className="in_table"> */}
                                <Purple_Button name= "Change" style = {{marginTop: '0em', marginLeft: '1em'}} />
                                {/* </div> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <Input_Field name = "Username" id = "Username" />
                <Input_Field name = "Password" id = "Password" />
                {enter}
                <Link to="/forgot" style={{textDecoration:'none'}}>
                    <White_Button name = "Forgot Password?" />
                </Link>
            </div> */}
            <Red_Button name = "Delete Account" />   
            </div>
            </div>
        )
    }
}
export default edit_profile;