import React, { useState } from "react";
import EmployeeService from "./EmployeeService";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [employee, setEmployee] = useState({ firstname: "", lastname: "", emailId: "", mobileNumber: "", salary: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.createEmployee(employee).then(() => navigate("/"));
  };

  return (
    <div className="main-container mt-5">
      <h2 className="text-center">Add Employee</h2>
      <form onSubmit={saveEmployee}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" name="firstname" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" name="lastname" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email Id</label>
          <input type="email" name="emailId" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="text" name="mobileNumber" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Salary</label>
          <input type="number" name="salary" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddEmployee;
