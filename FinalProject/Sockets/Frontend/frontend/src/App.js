import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import socketIOClient from "socket.io-client";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>My Token = {window.token}</p>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";

// function App() {
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     socket.on("FromAPI", data => {
//       setResponse(data);
//     });
//   }, []);

//   return (
//     <p>
//       It's <time dateTime={response}>{response}</time>
//     </p>
//   );
// }

// export default App;






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
