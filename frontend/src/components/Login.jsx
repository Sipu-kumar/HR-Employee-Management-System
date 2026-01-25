import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "./AuthService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(username, password);
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("Invalid username or password");
            }
        }
    };

    return (
        <div className="main-container mt-5" style={{ maxWidth: "500px", padding: "0" }}>
            <div className="card shadow-sm" style={{ border: "none" }}>
                <div className="card-header text-center" style={{ backgroundColor: "#e9ecef", borderBottom: "none", paddingTop: "20px" }}>
                    <div className="mb-2">
                        <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: "2rem" }}></i>
                    </div>
                    <h4 style={{ color: "#343a40", fontWeight: "600" }}>HRMS</h4>
                </div>
                <div className="card-body p-4">
                    <h5 className="mb-3 text-start" style={{ color: "#495057" }}>HRMS - Login</h5>
                    <p className="text-muted small mb-4">Welcome back! Please login to your account.</p>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Username *</label>
                            <input
                                type="text"
                                className="form-control bg-light"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Password *</label>
                            <input
                                type="password"
                                className="form-control bg-light"
                                placeholder="........"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn w-100 text-white fw-bold mt-3" style={{ backgroundColor: "#3f83f8", border: "none" }}>
                            Login
                        </button>

                        <div className="text-center mt-3">
                            <div className="alert alert-success d-flex align-items-center justify-content-center p-2 mt-3" role="alert" style={{ fontSize: "0.9rem" }}>
                                <i className="bi bi-check-circle-fill me-2"></i> Login successful! (Demo UI)
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <Link to="/register" style={{ textDecoration: 'none' }}>Don't have an account? Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
