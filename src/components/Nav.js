import React from 'react';
import "../App.css";
import {Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
        <h3>Log</h3>
        <ul className="nav-links">
            <Link to="/about">
                <li>About</li>
            </Link>
            <Link to="/user">
                <li>User</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
