
import React, {Component,  useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
// import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
// import Input_Field from '../input_field/input_field';
import './chat_page.css';
import socketIOClient from "socket.io-client";
import {Purple_Message, Pink_Message} from '../messages/messages';
const ENDPOINT = "http://127.0.0.1:5000";

class chat_page extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: null

        };
    }

    

    
    render () {

        // const [response, setResponse] = useState("");
        // const socket = socketIOClient(ENDPOINT);

        // socket.on("login", data => {
        //       this.setState({success:data})
        //       console.log(this.state.success);
        //     });

        return (
            <div className= "content">
            <h2>test</h2>
            
            <Purple_Message message = "hello!" />
            <Pink_Message message = "hey, how's it going by you?" time="test" />
            <Purple_Message message = "not too bad, web dev is super great!" />
            <Pink_Message message = "really? You must take it with Riccardo." />
            
            </div>
        )
    }
}
export default chat_page;