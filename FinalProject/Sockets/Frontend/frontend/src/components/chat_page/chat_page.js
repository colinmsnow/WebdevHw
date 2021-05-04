
import React, {Component,  useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom'
// import {Purple_Button, White_Button, White_Button_Right} from '../buttons/buttons';
// import Input_Field from '../input_field/input_field';
import './chat_page.css';
import {top_bar} from '../top_bar/top_bar'
import socketIOClient from "socket.io-client";
import Top_bar from '../top_bar/top_bar'
import Input_Field from '../input_field/input_field'
import {Purple_Button_Right} from '../buttons/buttons';
import {Purple_Message, Pink_Message} from '../messages/messages';
import Chat_in_list from '../chat_in_list/chat_in_list';
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
            // <div className="content">
            //    <top_bar/> 
            // </div>
            <div>
             {/* <div className= "content"> */}
            <div className= "left_pane">
            <div>
            <Top_bar/>
            </div>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/>
            </div>
            <div className = "right_pane">
            <div>
            <div className = "nam"><h2>test</h2></div>
            <div className = "sig">
            <Link to="/" style={{textDecoration:"none", marginRight:"1em"}}>
            <Purple_Button_Right name = "Sign Out" />
            </Link>  
            </div>  
            </div>  
            {/* <div className = "messages">    */}
            <Purple_Message message = "hello!" time = "9:15 AM"/>
            <Pink_Message message = "hey, how's it going by you?" time="10:08 AM" />
            <Purple_Message message = "not too bad, web dev is super great!" time="10:12 AM" />
            <Pink_Message message = "really? You must take it with Riccardo." time="10:23 AM" />
            {/* </div> */}
            <div className = "mess_bar">
            <div className = "nam">
            <Input_Field id = "Message" className= "nam" style = {{borderRadius: "40px"}} />
            </div>
            <button className="sig"><img src={require('../../assets/send_message.png')} onClick = {(console.log('new message, please!'))}/></button>
            </div>
            </div>
            </div>
        )
    }
}
export default chat_page;