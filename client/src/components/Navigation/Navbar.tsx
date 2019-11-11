import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className='collapse navbar-collapse'>
        <h1>Movie Tool</h1>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to='/movies' className='nav-link'>Movies</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/theaters' className='nav-link'>Theaters</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/credit-card' className='nav-link'>Credit Card</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
