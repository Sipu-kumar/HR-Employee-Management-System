import axios from "axios";

const EMPLOYEE_API_BASE_URL = "https://employee-management-system-production-34d6.up.railway.app/api/v1/employees";
//http://localhost:8080/api/v1/employees

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    }

    updateEmployee(id, employee) {
        return axios.put(`https://employee-management-system-production-34d6.up.railway.app/api/v1/employees/${id}`, employee);
    }



    deleteEmployee(employeeId) {
        return axios.delete(`https://employee-management-system-production-34d6.up.railway.app/api/v1/employees/${employeeId}`);
    }
}

// ✅ Fix for ESLint warning
const employeeServiceInstance = new EmployeeService();
export default employeeServiceInstance;
