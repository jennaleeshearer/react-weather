import { Component } from "react";

export class Home extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setUser(null)
    this.props.history.push("/login")
  }

  render() {
    return (
      <div className="user-card">
        <h1>Welcome {this.props.user.name}</h1>
        <button onClick={this.handleLogout}>Log Out</button>
      </div>
    )
  }
}
