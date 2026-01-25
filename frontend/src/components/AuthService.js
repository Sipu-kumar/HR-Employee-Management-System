import axios from "axios";

// Assuming backend is on 8080. 
// If REACT_APP_API_URL is set to /api/v1, we need to adjust or just hardcode for valid dev flow if needed.
// Ideally usage: process.env.REACT_APP_API_URL.replace('/v1', '/auth') or similar if strict.
// For now, let's try to infer or use standard localhost for safety.
const API_URL = "http://192.168.0.102:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    register(username, password, role, fullName, email, companyName) {
        return axios.post(API_URL + "register", {
            username,
            password,
            role,
            fullName,
            email,
            companyName
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

const authService = new AuthService();
export default authService;
