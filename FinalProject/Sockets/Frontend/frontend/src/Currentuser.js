import React from "react";

export const CurrentUser = React.createContext();

class Context extends React.Component {
  // Unused
  state = {
    name: "John"
  };

  render() {
    return (
      <CurrentUser.Provider value={this.state}>
        {this.props.children}
      </CurrentUser.Provider>
    );
  }
}

export default Context;