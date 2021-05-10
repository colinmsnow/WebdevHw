
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
            other_user:null


        };
        this.socket =  socketIOClient(ENDPOINT);
    }

    update_other_user(newname){

        // const socket = socketIOClient(ENDPOINT);
        let socket = this.socket;

        console.log("Asking for a new user")


        // let a = this.state;
        // a.other_user = newname;
        // a.success = null;
        socket.emit("get_messages", {username:this.props.user, other_user:newname})
        console.log("asked for messages")
        // this.setState(a);
    }

    update_messages(newmessages, newuser){





        let a = this.state;
        a.messages = newmessages;
        a.other_user = newuser;
        // a.success = null;
        this.setState(a);
    }


    new_chat(){
        console.log("trying new chat")
        let a = this.state;
        a.other_user = null;
        // a.success = null;
        this.setState(a);
        // this.setState({
        //     success: null,
        //     chats:[],
        //     messages:[],
        //     other_user:null


        // })
    }

    update_chats(data){
        let a = this.state;
        a.success=data.success
        a.chats=data.chats
        if (data.other_user != "null"){
            a.other_user = data.other_user
        }
        this.setState(a)


    }
    componentDidMount(){

        // const socket = socketIOClient(ENDPOINT);
        let socket = this.socket;

        socket.on("new_message", data => {
        console.log("There was a new message somewhere")

        if (data.other_user == this.props.user){

            socket.emit("get_chats", {username:this.props.user, other_user:this.state.other_user})
            socket.emit("get_messages", {username:this.props.user, other_user:this.state.other_user})

        }

        // socket.emit("get_chats", {username:this.props.user, other_user:this.state.other_user})
        // socket.emit("get_messages", {username:this.props.user, other_user:this.state.other_user})
        });
        socket.on("messages", data => {
            console.log("Received some data for messages")
            console.log(data)
            this.update_messages(data.messages, data.other_user)
            });

        socket.on("Error", data => {
            console.log("Error in chat_page: " + data);
            // TODO: Create popup with error from data
        });
        socket.on("chats", data => {
            console.log("Received some data for chats")
            console.log(data)
            this.update_chats(data)
            });
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
        let socket = this.socket;

        // const socket = socketIOClient(ENDPOINT);

        socket.emit("get_messages", {username:this.props.user, other_user:this.props.other_user})

        // socket.on("chats", data => {
        //     console.log("Received some data for chats")
        //     console.log(data)
        //     this.update_chats(data)
        //     });

        // socket.on("new_message", () => {
        //         console.log("There was a new message somewhere")

        //         socket.emit("get_chats", {username:this.props.user, other_user:this.props.other_user})
        //         socket.emit("get_messages", {username:this.props.user, other_user:this.props.other_user})
        //         });
        //         socket.on("messages", data => {
        //             console.log("Received some data for messages")
        //             console.log(data)
        //             this.update_messages(data.messages, data.other_user)
        //             });

        // socket.on("Error", data => {
        //     console.log("Error in chat_page: " + data);
        //     // TODO: Create popup with error from data
        // });


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
            {/* <Top_bar handler = {this.new_chat}/> */}
            <div className = "cont">
            <div className="titl">
            <h2>Conversations</h2>
            </div>

            <img className='icon_message' src={require('../../assets/new_message.png')} onClick = {()=>this.new_chat()}/>
            </div>
            </div>
                {this.state.chats.map((chat, index) => (
                    // <button onClick = {()=>this.update_other_user(chat.username)} className = "chat_list">
                    <button onClick = {()=>{
                        socket.emit("get_messages", {username:this.props.user, other_user:chat.username})
                        }} className = "chat_list" style={{width:"100%"}}>

                    <Chat_in_list name={chat.name} last_time={chat.last_time} first_name={chat.first_name} message={chat.message}/>
                    </button>

                ))}
            {/* <Chat_in_list name="Maia Materman" last_time="10:05 PM" first_name="Maia" message="blah blah blah blah blah blah blah blah blah"/> */}
            </div>
            <div className = "right_pane">
            <div>
            <div className = "newchatbar">
             {this.state.other_user != null &&   <h2>{this.state.other_user}</h2> }
                {/* TODO: Make this display user you are talking to */}

            
            {this.state.other_user == null && <Input_Field id = "new_user" className = "nam"/>}
            {this.state.other_user == null && <button className= "sig" style = {{height:"3.7em", marginLeft:"1em"}} onClick = {()=>{
                socket.emit("get_chats", {username:this.props.user, other_user:document.getElementById("new_user").value})
                socket.emit("get_messages", {username:this.props.user, other_user:document.getElementById("new_user").value})

                }}>GO</button>}

            
            </div>
            <div className = "sig" style={{display:"flex", width:"44%"}}>
            <Link to="/edit" style={{textDecoration:"none", marginRight:"1em"}}>
            <Purple_Button_Right name = "Edit Account" />
            </Link>  
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
            {/* TODO: Round search bar corners, show and format send button, fit 70% of right pane */}
            <div className = "mess_bar">
            {/* <button onClick = {()=>(socket.emit("send_message", {username:this.props.user, other_user:this.state.other_user, content:document.getElementById("Message").value}))}><img src={require('../../assets/send_message.png')} /></button> */}

            <div className = "bottombar">

            <Input_Field id = "Message" borderRadius = "40px" name={null} className = "bottom_input" height = "75%" />
            {/* TODO: Why did we do this all inline?? */}
            <button style = {{backgroundColor:"#D0BBE6", borderRadius: "40px", border: "none", paddingLeft: "1em", paddingRight: "1em", marginLeft: "5%", cursor: "pointer", height: "75%", marginRight:"2.5%"}} onClick = {()=>(socket.emit("send_message", {username:this.props.user, other_user:this.state.other_user, content:document.getElementById("Message").value}))}><img src={require('../../assets/send_message.png')}/></button>


            </div>
            {/* <button className="sig"><img src={require('../../assets/send_message.png')} onClick = {()=>(console.log('new message, please!'))}/></button> */}
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