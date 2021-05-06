
import React, {Component,  useState, useEffect, Fragment, useContext} from 'react';
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
// import {CurrentUser} from "../../Currentuser";
const ENDPOINT = "http://127.0.0.1:5000";

class chat_page extends Component {
    constructor(props){
        super(props);
        this.state = {
            success: null,
            chats:[],
            messages:[],
            other_user:"Maia Matterman"


        };
    }

    update_other_user(newname){

        const socket = socketIOClient(ENDPOINT);

        console.log("Asking for a new user")


        // let a = this.state;
        // a.other_user = newname;
        // a.success = null;
        socket.emit("get_messages", {username:this.props.user, other_user:newname})
        // this.setState(a);
    }

    update_messages(newmessages, newuser){





        let a = this.state;
        a.messages = newmessages;
        a.other_user = newuser;
        // a.success = null;
        this.setState(a);
    }



    

    

    
    render () {

        // this.update_other_user("erknjfl")

        // const value = useContext(CurrentUser);
        console.log("Logging stuff")
        // console.log(this.props.name)
        // console.log(this.context)
        // console.log()
        console.log(this.props)
        console.log(this.state)

        const socket = socketIOClient(ENDPOINT);

        socket.on("chats", data => {
            console.log("Received some data for chats")
            console.log(data)
              this.setState({success:data.success, chats:data.chats, messages:data.messages})
              console.log(this.state.success);
            //   const history = useHistory();
            //   history.push("/chats");
            });

        socket.on("messages", data => {
                console.log("Received some data for messages")
                console.log(data)

                this.update_messages(data.messages, data.other_user)
                // this.update_messages(data.messages)
                //   this.setState({success:data.success, chats:data.chats, messages:data.messages})
                //   console.log(this.state.success);
                //   const history = useHistory();
                //   history.push("/chats");
                });
        let enter;

        socket.on("Error", data => {
            console.log("Error in chat_page: " + data);
            // TODO: Create popup with error from data
        });


        if (this.state.success == null){
            socket.emit("get_chats", {username:this.props.user, other_user:this.state.other_user})
        }

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
                {this.state.chats.map((chat, index) => (
                    <button onClick = {()=>this.update_other_user(chat.username)} className = "chat_list">
                    <Chat_in_list name={chat.name} last_time={chat.last_time} first_name={chat.first_name} message={chat.message}/>
                    </button>

                ))}
            {/* <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/> */}
            </div>
            <div className = "right_pane">
            <div>
            <div className = "nam">
                <h2>{this.props.other_user}</h2> 
                {/* TODO: Make this display user you are talking to */}
            <Input_Field id = "new_user" className = "nam"/>
            <button className= "sig">GO</button>
            </div>
            <div className = "sig">
            <Link to="/" style={{textDecoration:"none", marginRight:"1em"}}>
            <Purple_Button_Right name = "Sign Out" />
            </Link>  
            </div>  
            </div>  
            {/* <div className = "messages">    */}
            {/* <CurrentUser.Consumer>
//          {value => <div>It's Main component. Context value is ${value.name}</div>}
//          </CurrentUser.Consumer> */}
            {/* <h2>{this.props.user}</h2> */}
            {this.state.messages.map((message, index) => (
                    (message.from == this.props.user)?
                        (<Purple_Message message = {message.message} time={message.time} />)
                        : (<Pink_Message message = {message.message} time={message.time} />)
                    
                    // <Chat_in_list name={chat.name} last_time={chat.last_time} first_name={chat.first_name} message={chat.message}/>

                ))}

            {/* </div> */}
            <div className = "mess_bar">
            <div className = "nam">
            <Input_Field id = "Message" style = {{borderRadius: "40px"}} />
            </div>
            <button className="sig"><img src={require('../../assets/send_message.png')} onClick = {(console.log('new message, please!'))}/></button>
            </div>
            {/* <Purple_Message message = "hello!" time = "9:15 AM"/>
            <Pink_Message message = "hey, how's it going by you?" time="10:08 AM" />
            <Purple_Message message = "not too bad, web dev is super great!" time="10:12 AM" />
            <Pink_Message message = "really? You must take it with Riccardo." time="10:23 AM" /> */}
            </div>
            </div>
        )
    }
}

// chat_page.contextType = CurrentUser;
export default chat_page;