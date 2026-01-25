import React, { useEffect, useState } from "react";
import EmployeeService from "./EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", emailId: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      const found = res.data.find(emp => emp.id.toString() === id);
      if (found) setEmployee(found);
    });
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const update = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(id, employee).then(() => navigate("/"));
  };

  return (
    <div className="main-container mt-5">
      <h2 className="text-center">Update Employee</h2>
      <form onSubmit={update}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" name="firstname" className="form-control" value={employee.firstname} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" name="lastname" className="form-control" value={employee.lastname} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email Id</label>
          <input type="email" name="emailId" className="form-control" value={employee.emailId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input type="text" name="mobileNumber" className="form-control" value={employee.mobileNumber || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Salary</label>
          <input type="number" name="salary" className="form-control" value={employee.salary || ''} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
