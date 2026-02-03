import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";

const Register = () => {
    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        role: "ADMIN" // Defaulting to ADMIN/HR as per request "Admin/Hr register"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await AuthService.register(
                formData.username,
                formData.password,
                "ADMIN", // Hardcoded based on "Register Admin/HR Account" screen
                formData.fullName,
                formData.email,
                formData.companyName
            );
            setMessage("Account successfully created!");
            setError("");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError(err.message || "Registration failed. Try again.");
            }
            setMessage("");
        }
    };

    return (
        <div className="main-container mt-5" style={{ maxWidth: "500px", padding: "0" }}>
            <div className="card shadow-sm" style={{ border: "none" }}>
                <div className="card-header text-center" style={{ backgroundColor: "#e9ecef", borderBottom: "none", paddingTop: "20px" }}>
                    <div className="mb-2">
                        {/* Placeholder for Logo if needed */}
                        <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: "2rem" }}></i>
                    </div>
                    <h4 style={{ color: "#343a40", fontWeight: "600" }}>HRMS</h4>
                </div>
                <div className="card-body p-4">
                    <h5 className="mb-3 text-start" style={{ color: "#495057" }}>HRMS - Admin / HR Registration</h5>
                    <p className="text-muted small mb-4">Register a new company. HR/Admin account will be created.</p>

                    {message && <div className="alert alert-success d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i> {message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Full Name *</label>
                            <input type="text" name="fullName" className="form-control bg-light" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email ID *</label>
                            <input type="email" name="email" className="form-control bg-light" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Username *</label>
                            <input type="text" name="username" className="form-control bg-light" placeholder="johndoe" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Password *</label>
                            <input type="password" name="password" className="form-control bg-light" placeholder="........" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Confirm Password *</label>
                            <input type="password" name="confirmPassword" className="form-control bg-light" placeholder="........" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>

                        {/* Company Name - In real app, might be dropdown or input */}
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Company Name *</label>
                            <input type="text" name="companyName" className="form-control bg-light" placeholder="ABC Corp" value={formData.companyName} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn w-100 text-white fw-bold mt-3" style={{ backgroundColor: "#f6993f", border: "none" }}>
                            Register Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
