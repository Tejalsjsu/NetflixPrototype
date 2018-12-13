import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("profileName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.reload();
  };

  // componentDidMount() {
  //   if (
  //     localStorage.getItem("JWTToken") === null ||
  //     localStorage.getItem("JWTToken") === undefined
  //   ) {
  //     this.props.history.push("/login");
  //   }
  // }

  render() {
    return (
      <div>
        {localStorage.getItem("JWTToken") ? (
          <nav className="navbar navbar-inverse navbar1">
            <div>
              <div className="container">
                <div
                  className="collapse navbar-collapse bar-item"
                  id="myNavbar"
                >
                  <ul className="nav navbar-nav">
                    {localStorage.getItem("role") &&
                    localStorage.getItem("role") === "USER" ? (
                      <React.Fragment>
                        <li>
                          <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                          <NavLink to="/movieScoreboard">
                            Movie Scoreboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/subscription">Subscription</NavLink>
                        </li>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {localStorage.getItem("role") &&
                    localStorage.getItem("role") === "ADMIN" ? (
                      <React.Fragment>
                        <li>
                          <NavLink exact to="/adminAddMovie">
                            Admin Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/userActivity">User Activity</NavLink>
                        </li>
                        <li>
                          <NavLink to="/movieActivity">Movie Activity</NavLink>
                        </li>
                        <li>
                          <NavLink to="/AdminFinancials">
                            Financial Reports
                          </NavLink>
                        </li>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </ul>

                  <ul className="nav navbar-nav navbar-right">
                    {/* <li><NavLink to="/profile">< span className="glyphicon glyphicon-log-in"></span> Admin Profile </NavLink></li>*/}
                    <li>
                      <NavLink to="/login">
                        <span className="glyphicon glyphicon-log-in" /> Profile{" "}
                      </NavLink>
                    </li>
                    <li>
                      <a>
                        <span
                          onClick={this.logout}
                          className="glyphicon glyphicon-log-in"
                        />{" "}
                        Logout{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Navigation;
