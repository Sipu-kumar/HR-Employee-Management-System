# Employee Management System

A full-stack Employee Management System built with:

- **Backend**: Spring Boot (Maven, REST API, JPA, PostgreSQL)
- **Frontend**: React.js
- **Database**: PostgreSQL

---

## 🚀 How to Run

### 1️⃣ Backend (Spring Boot + PostgreSQL)

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Configure PostgreSQL:

Create a database in PostgreSQL (example: ems_db)

Update your application.properties (located in backend/src/main/resources/) with your DB details:

spring.datasource.url=jdbc:postgresql://localhost:5432/ems_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

3. Run the backend:

mvn spring-boot:run


4. The backend will start on:

    http://localhost:8080

2️⃣ Frontend (React)

1. Navigate to the frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Start the development server:

npm start


4. The frontend will start on:

http://localhost:3000    

📂 Project Structure
Employee-management-System/
│── backend/      # Spring Boot REST API + PostgreSQL
│── frontend/     # React.js user interface
│── README.md     # Project documentation

✨ Features
Add new employees
Update employee details
Delete employees
View all employees in a table
Connected frontend & backend with PostgreSQL database

🛠 Tech Stack
Frontend: React, JavaScript, HTML, CSS
Backend: Spring Boot, Spring Data JPA, REST API
Database: PostgreSQL
Build Tools: Maven, npm

📌 Notes

Make sure PostgreSQL is installed and running before starting the backend.

The backend runs on port 8080 and the frontend on port 3000 by default.

You can deploy the frontend separately (e.g., Netlify/Vercel) and backend on a server (Heroku/Render).