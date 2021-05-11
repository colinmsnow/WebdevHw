
import React, { Component, useState, useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom'
import './chat_page.css';
import socketIOClient from "socket.io-client";
import Input_Field from '../input_field/input_field'
import { Purple_Button_Right, Edit_Profile} from '../buttons/buttons';
import { Purple_Message, Pink_Message } from '../messages/messages';
import Chat_in_list from '../chat_in_list/chat_in_list';
// import {CurrentUser} from "../../Currentuser";
const ENDPOINT = "http://127.0.0.1:5000";

class chat_page extends Component {

    /* The main page for sending and receiving chat messages.
        Consists of left bar which displays chats and allows new ones to be created
        and right bar which displays the current chat and all messages associated with it.
    */

    constructor(props) {
        super(props);
        this.state = {
            success: null,
            chats: [],
            messages: [],
            other_user: null,
            initials: null
        };
        this.socket = socketIOClient(ENDPOINT);
    }

    update_other_user(newname) {
        // Asks to change the user that displays in the right pane
        let socket = this.socket;
        console.log("Asking for a new user")
        socket.emit("get_messages", { username: this.props.user, other_user: newname })
        console.log("asked for messages")
    }

    update_messages(newmessages, newuser) {
        // Reads new messages from backend
        let a = this.state;
        a.messages = newmessages;
        a.other_user = newuser;
        this.setState(a);
    }

    update_initials(username) {
        // Updates initials for edit profile page

        // var str = "Java Script Object Notation";
        var matches = username.match(/\b(\w)/g);
        var acronym = matches.join('');

        let a = this.state;
        a.initials = acronym;
        this.setState(a);
    }

    


    new_chat() {
        // Creates a new empty chat.
        console.log("trying new chat")
        let a = this.state;
        a.other_user = null;
        this.setState(a);
    }

    update_chats(data) {
        // Updates chats in left bar
        let a = this.state;
        a.success = data.success
        a.chats = data.chats
        if (data.other_user != "null") {
            a.other_user = data.other_user
        }
        this.setState(a)
    }

    componentDidMount() {

        let socket = this.socket;

        socket.on("new_message", data => {
            // Called each time there is a new message. Updates panes if 
            // the message is for the current user.

            console.log("There was a new message somewhere")

            if (data.other_user == this.props.user) {
                socket.emit("get_chats", { username: this.props.user, other_user: this.state.other_user })
                socket.emit("get_messages", { username: this.props.user, other_user: this.state.other_user })
            }
        });

        socket.on("messages", data => {
            // Updates messages from backend data
            console.log("Received some data for messages")
            console.log(data)
            this.update_messages(data.messages, data.other_user)
        });

        socket.on("Error", data => {
            // Error handler. Prints error message to console
            console.log("Error in chat_page: " + data);
            // TODO: Create popup with error from data
        });

        socket.on("chats", data => {
            // Updates chats from backend data
            console.log("Received some data for chats")
            console.log(data)
            this.update_chats(data)
        });

        socket.on("user", data => {
            // Get user info and update state
            console.log("Received some data for user")
            console.log(data)
            this.update_initials(data.name)

            // console.log(this.state.success);
        });
    }

    render() {

        console.log("Logging stuff")
        console.log(this.props)
        console.log(this.state)
        let socket = this.socket;

        socket.emit("get_messages", { username: this.props.user, other_user: this.props.other_user })


        if (this.state.success == null) {
            // Get the chats if this is the first load of the page
            socket.emit("get_chats", { username: this.props.user, other_user: this.state.other_user })
            socket.emit("get_user", { username: this.props.user })

        }

        return (

            <div>
                <div className="left_pane">
                    <div>
                        <div className="cont">
                            <div className="titl" style={{float:"left"}}>
                                <h2>Conversations</h2>

                            </div>

                            <img className='icon_message' style={{float:"right", width:"2em", height:"2em", margin:"1em 1em 1em 1em"}} src={require('../../assets/new_message.png')} onClick={() => this.new_chat()} />
                        </div>
                    </div>
                    {this.state.chats.map((chat, index) => (
                        <button onClick={() => {
                            socket.emit("get_messages", { username: this.props.user, other_user: chat.username })
                        }} className="chat_list" style={{ width: "100%" }}>

                            <Chat_in_list name={chat.name} last_time={chat.last_time} first_name={chat.first_name} message={chat.message} />
                        </button>
                    ))}
                </div>
                <div className="right_pane">
                    <div>
                        <div className="newchatbar">
                            {this.state.other_user != null && <h2>{this.state.other_user}</h2>}
                            {this.state.other_user == null && <p style={{width:"20%", height:"100%!important", marginTop:"2%", marginBottom:"0em"}}>New Chat:</p>}
                            {this.state.other_user == null && <Input_Field id="new_user" className="nam"/>}
                            {this.state.other_user == null && <button className="sig go" style={{ marginLeft: "1em" }} onClick={() => {
                                socket.emit("get_chats", { username: this.props.user, other_user: document.getElementById("new_user").value })
                                socket.emit("get_messages", { username: this.props.user, other_user: document.getElementById("new_user").value })

                            }}>GO</button>}


                        </div>
                        <div className="sig" style={{ display: "flex" }}>
                            <Link to="/edit"  style={{ textDecoration: "none", marginRight: "1em" }}>
                                <Edit_Profile name= {this.state.initials}/>
                            </Link>
                            <Link to="/" style={{ textDecoration: "none", marginRight: "1em"}}>
                                <Purple_Button_Right name="Sign Out"/>
                            </Link>
                        </div>
                    </div>
                    <div className="messagesClass">
                    {this.state.messages.map((message, index) => (
                        (message.from == this.props.user) ?
                            (<Purple_Message message={message.message} time={message.time} />)
                            : (<Pink_Message message={message.message} time={message.time} />)
                    ))}
                    </div>
                    {/* TODO: Round search bar corners, show and format send button, fit 70% of right pane */}
                    <div className="mess_bar">
                        <div className="bottombar">
                            <Input_Field id="Message" borderRadius="40px" name={null} className="bottom_input" height="100%" />
                            {/* TODO: Why did we do this all inline?? */}
                            <button style={{ backgroundColor: "#D0BBE6", borderRadius: "40px", border: "none", paddingLeft: "1em", paddingRight: "1em", marginLeft: "5%", cursor: "pointer", height: "75%", marginRight: "2.5%" }} onClick={() => (socket.emit("send_message", { username: this.props.user, other_user: this.state.other_user, content: document.getElementById("Message").value }))}><img src={require('../../assets/send_message.png')} /></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// chat_page.contextType = CurrentUser;
export default chat_page;