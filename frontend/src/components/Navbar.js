import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">ROUND ONE</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/">Problems</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/progress">My Progress</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/courses">Courses</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/mock-interview">Mock Interview</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        );
    }

/*
Notes:
- Switch to Navlink, but would need to fix styling
            <NavLink className={({isActive}) => {return "navbar-brand" + (isActive && "active")}} to="/">Navbar</NavLink>
*/

export default Navbar;