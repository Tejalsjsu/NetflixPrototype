var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
var Button = require('react-bootstrap').Button;
var cookie = require('react-cookies');
var API = require("../api");

let imgStyle = {height: '50px', width: '140px'};
let btnStyle = { marginTop: '8px', marginRight: '4px'}


function AdminNavBar() {
    this.activateClass = (props) =>{
        this.className= 'active'
    }

    this.logout = () =>{
        // var userId = cookie.load('userId');
        // cookie.remove('userId');
        // API.logout(userId)
        //     .then((res) => {
        //     console.log("status logout client" +[res.status]);
        //     if (res.status === '201') {
        //         console.log("successfull Log out");
        //         cookie.remove('userId');
        //         this.props.history.push('/login');
        //     } else {
        //         cookie.remove('userId');
        //         this.props.history.push('/login');
        //     }
        // });
    }

        return (
           <div>
                <nav className="navbar navbar-inverse navbar1">
                    <div >
                        <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse bar-item" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li onClick={this.activateClass} ><NavLink exact to="/adminAddMovie">Admin Dashboard</NavLink></li>
                                <li onClick={this.activateClass} ><NavLink to="/userActivity">User Activity</NavLink></li>
                                <li onClick={this.activateClass} ><NavLink to="/movieActivity">Movie Activity</NavLink></li>
                                <li onClick={this.activateClass} ><NavLink to="/AdminFinancials">Financial Reports</NavLink></li>
                                {/*className='active is-active'*/}
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li><NavLink to="/profile">< span className="glyphicon glyphicon-log-in"></span> Admin Profile </NavLink></li>
                                <li onClick={this.logout}><NavLink to="/login">< span className="glyphicon glyphicon-log-in"></span> Logout </NavLink></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </nav>

                <div className="container">

            </div>
           </div>
        )
}

module.exports = AdminNavBar;
