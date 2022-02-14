import React from 'react';
import { NavLink } from 'react-router-dom';

export function NavBar(props) {
  const handleSignOut = () => {
    props.handleSignOut();
  }
  return (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <NavLink className="navbar-brand" exact to="/">GameFinder</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav mr-auto navbar-right">
          <NavLink className="nav-item nav-link" exact to="/" activeClassName='activeLink'>Home</NavLink>
          <NavLink className="nav-item nav-link" to="/mygames" activeClassName='activeLink'>My Games</NavLink>
          {props.user &&
            <li>
              <div className="btn-nav">
              <button className="btn btn-warning navbar-btn" onClick={handleSignOut} >
                Log Out as {props.user.displayName}
              </button>
              </div>
            </li>
          }
        </div>
      </div>
    </nav>
  );
}