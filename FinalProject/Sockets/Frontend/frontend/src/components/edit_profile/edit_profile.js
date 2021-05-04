
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
            success: null

        };
    }

   

    
    render () {

        // const [response, setResponse] = useState("");
        const socket = socketIOClient(ENDPOINT);

        // socket.on("login", data => {
        //       this.setState({success:data})
        //       console.log(this.state.success);
        //     //   const history = useHistory();
        //     //   history.push("/chats");
        //     });
        // let enter;

        // socket.on("Error", data => {
        //     console.log("Error in login: " + data);
        //     // TODO: Create popup with error from data
        // });


        // if (this.state.success == 'success') {
        //     return(<Redirect to="/chats" />)

        // }
        // else {
        //     enter = 
        //     <Purple_Button name = "Login" click = {()=>socket.emit("login", {"username": document.getElementById("Username").value, "password": document.getElementById("Password").value})} />
        // }    
        

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
                                <Input_Field id = "First Name" placeholder = "test" disabled = "true"/>
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
                                <Input_Field id = "Last Name" placeholder = "test" disabled = "true"/>
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
                                <Input_Field id = "Username" placeholder = "test" disabled = "true"/>
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
                                <Input_Field id = "Password" placeholder = "test" disabled = "true"/>
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