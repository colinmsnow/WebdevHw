import React, { useState, useEffect, Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';

import socketIOClient from "socket.io-client";
import login from "./components/login";
import create_account from "./components/create_account";
import forgot_password from "./components/forgot_password";
import chat_page from "./components/chat_page";
import edit_profile from "./components/edit_profile";
import "./App.css";
import { render } from "react-dom";

const ENDPOINT = "http://127.0.0.1:5000";

class App extends Component {
  // Main app
  constructor(props) {
    super(props);

    // Handler and state are used to get and set the current
    // user which is sent with requests
    this.handler = this.handler.bind(this)
    this.state = { user: "No One" };

  }

  handler(newname) {
    // Used to set the global current user
    this.setState({
      user: newname
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <PropsRoute component={login} user={this.state.user} handler={this.handler} />
          </Route>
          <Route path="/create">
            <PropsRoute component={create_account} user={this.state.user} handler={this.handler} />
          </Route>
          <Route path="/forgot">
            <PropsRoute component={forgot_password} user={this.state.user} handler={this.handler} />
          </Route>
          <Route path="/chats">
            <PropsRoute component={chat_page} user={this.state.user} handler={this.handler} />
          </Route>
          <Route path="/edit">
            <PropsRoute component={edit_profile} user={this.state.user} handler={this.handler} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;