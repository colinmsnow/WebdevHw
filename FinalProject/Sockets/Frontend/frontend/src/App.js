// import logo from './logo.svg';
// import './App.css';
// import React, { Component }  from 'react';
// import socketIOClient from "socket.io-client";

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

import React, { useState, useEffect, Component } from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom"
import socketIOClient from "socket.io-client";
import login from "./components/login";
import chat from "./components/chat";
// import profile from "./components/profile";
import "./App.css";
import { render } from "react-dom";

const ENDPOINT = "http://127.0.0.1:5000";

class App extends Component {
  constructor(props){
  // const [response, setResponse] = useState("");
    super(props);
  
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

      <Switch>
        <Route path = "/" component = {login} />
        {/* <Route path = "/login" component={login} /> */}
    </Switch>
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
