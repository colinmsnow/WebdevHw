import React, { useState, useEffect, Component } from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';

import socketIOClient from "socket.io-client";
import login from "./components/login";
import create_account from "./components/create_account";
import forgot_password from "./components/forgot_password";
import chat_page from "./components/chat_page";
import edit_profile from "./components/edit_profile";
// import chat from "./components/chat";
// import profile from "./components/profile";
import "./App.css";
import { render } from "react-dom";
// import edit_profile from "./components/edit_profile";


// import create_account from "./components/create_account";


const ENDPOINT = "http://127.0.0.1:5000";

// const CurrentUser = React.createContext("None");

class App extends Component {
  constructor(props){
  // const [response, setResponse] = useState("");
    super(props);
    this.handler = this.handler.bind(this)
    this.state = {user: "No One"};
  
  }

  handler(newname) {
    this.setState({
      user: newname
    })
  }

  render(){
    return (
      // useEffect(() => {
      //   const socket = socketIOClient(ENDPOINT);
      //   socket.on("FromAPI", data => {
      //     socket.emit("FromFrontend", "hello")
      //     setResponse(data);
      //   });
      // }, []);
      // <div>
      //   <p>It's {response}</p>
      // </div>
      <BrowserRouter>
      <Switch>
        <Route exact path = "/">
          <PropsRoute component={login} user={this.state.user} handler = {this.handler}/>
        </Route>

        {/* <Route path = "/create" component = {create_account} /> */}
        <Route path = "/create">
          <PropsRoute component={create_account} user={this.state.user} handler = {this.handler}/>
        </Route>
        {/* <Route path = "/forgot" component = {forgot_password} /> */}
        <Route path = "/forgot">
          <PropsRoute component={forgot_password} user={this.state.user} handler = {this.handler}/>
        </Route>
        <Route path = "/chats">
          <PropsRoute component={chat_page} user={this.state.user} handler = {this.handler}/>
        </Route>
        {/* <Route path = "/edit" component = {edit_profile} /> */}
        <Route path = "/edit">
          <PropsRoute component={edit_profile} user={this.state.user} handler = {this.handler}/>
        </Route>
    </Switch>
    </BrowserRouter>
      
      // <BrowserRouter>
      // <Switch>
      //   {/* <IndexRoute component = {login}></IndexRoute> */}
      //   <Route exact path = "/" component={login}>
      //     {/* <create_account/> */}
      //     </Route>
      //   <Route path = "/create" component={create_account}></Route>
      // </Switch>
      // </BrowserRouter>
  );
}
}

export default App;




// import logo from './logo.svg';
// import './App.css';
// import React, { Component }  from 'react';
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <p>My Token = {window.token}</p>
//     </div>
//   );
// }

// export default App;
