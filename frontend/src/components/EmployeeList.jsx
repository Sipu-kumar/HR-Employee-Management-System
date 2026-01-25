import React, { useEffect, useState } from "react";
import EmployeeService from './EmployeeService';

import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  };

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then(() => fetchEmployees());
  };

  return (
    <div className="container mt-4">
      {/* Search and Add Bar */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="search" aria-label="search" />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-primary" onClick={() => navigate("/add")}>
            <i className="bi bi-plus me-1"></i> Add Employee
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="text-muted small text-uppercase">
              <th scope="col" className="ps-4">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Salary</th>
              <th scope="col" className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id}>
                <td className="ps-4 fw-bold">{index + 1}</td>
                <td>{emp.firstname}</td>
                <td>{emp.lastname}</td>
                <td>{emp.emailId}</td>
                <td>{emp.mobileNumber || "-"}</td>
                <td>{emp.salary ? `$${emp.salary}` : "-"}</td>
                <td className="text-end pe-4">
                  <div className="d-flex justify-content-end gap-2">
                    <button onClick={() => navigate(`/update/${emp.id}`)} className="btn btn-primary btn-sm" style={{ minWidth: '80px' }}>
                      <i className="bi bi-pencil-fill me-1"></i> Edit
                    </button>
                    <button onClick={() => deleteEmployee(emp.id)} className="btn btn-danger btn-sm" style={{ minWidth: '80px' }}>
                      <i className="bi bi-trash-fill me-1"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && <div className="p-4 text-center text-muted">No employees found. Add one to get started!</div>}
      </div>
    </div>
  );
}

export default EmployeeList;
