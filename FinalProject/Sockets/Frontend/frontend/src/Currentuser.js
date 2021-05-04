import React from "react";

export const CurrentUser = React.createContext();

class Context extends React.Component {
  state = {
    name: "John"
  };

  //Now you can place all of your logic here
  //instead of cluttering your app component
  //using this components state as your context value
  //allows you to easily write funcitons to change
  //your context just using the native setState 
  //you can also place functions in your context value
  //to call from anywhere in your app
  render() {
    return (
      <CurrentUser.Provider value={this.state}>
        {this.props.children}
      </CurrentUser.Provider>
    );
  }
}

export default Context;