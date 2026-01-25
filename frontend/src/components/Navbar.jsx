import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function Navbar() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      {/* Top Bar: White Background */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-shield-lock-fill text-primary me-2" style={{ fontSize: "1.5rem" }}></i>
            <span className="fw-bold text-dark">HRMS</span>
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-3 text-muted">
                    Welcome {user.fullName || user.username} | <span className="fw-bold">{user.companyName || "My Company"}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-primary btn-sm px-4" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Sub Header: Blue Background (Only shown if logged in) */}
      {user && (
        <div className="bg-primary py-3 text-white">
          <div className="container d-flex justify-content-between align-items-center">
            <h5 className="mb-0">My Company Employee List</h5>
            <div className="d-flex">
              <span className="me-2 text-white-50" style={{ fontSize: '1.5rem' }}>...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
