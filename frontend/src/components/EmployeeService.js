import axios from "axios";
import authService from "./AuthService";

// ✅ Use environment variable (Vercel friendly)
const EMPLOYEE_API_BASE_URL = `${process.env.REACT_APP_API_URL}/employees`;
// const EMPLOYEE_API_BASE_URL = "https://employee-management-system-production-34d6.up.railway.app/api/v1/employees";
// //http://localhost:8080/api/v1/employees

class EmployeeService {

  getConfig() {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      return { headers: { Authorization: "Bearer " + user.token } };
    }
    return {};
  }

  getEmployees() {
    return axios.get(EMPLOYEE_API_BASE_URL, this.getConfig());
  }

  createEmployee(employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee, this.getConfig());
  }

  getEmployeeById(employeeId) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, this.getConfig());
  }

  updateEmployee(id, employee) {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee, this.getConfig());
  }

  deleteEmployee(employeeId) {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, this.getConfig());
  }
}

// ✅ FIX: assign instance to variable before export
const employeeService = new EmployeeService();
export default employeeService;
