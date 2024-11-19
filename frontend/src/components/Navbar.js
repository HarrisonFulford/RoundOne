import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {

  const currentPath = window.location.pathname; // Get the current URL path

  const links = [
    { href: ["/", "/problem", "/feedback"], label: "Problems" },
    { href: ["/progress"], label: "My Progress" },
    { href: ["/courses"], label: "Courses" },
    { href: ["/mock-interview"], label: "Mock Interview" },
  ];

  return (
    <nav className="container-fluid navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: '#f9f9f9' }}>
      <div className='row w-100'>
        <div className='col'></div>
        <div className="col-10 d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <img 
              src="RoundOneLogo.svg" 
              alt="ROUND ONE Logo" 
              style={{
                filter: 'invert(11%) sepia(31%) saturate(1233%) hue-rotate(183deg) brightness(91%) contrast(95%)'
              }}
            />
          </a>
            
          <div className="d-flex align-items-center">
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse row navbar-collapse" id="navbarNav">
              <ul className="navbar-nav pr-5">
                {links.map((link) => (
                  <li className='nav-item ps-5' key={link.label}>
                    <a
                      className={`nav-link ${link.href.includes(currentPath) ? 'active-link' : ''}`}
                      href={link.href[0]}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </nav>
    


        );
    }

export default Navbar;