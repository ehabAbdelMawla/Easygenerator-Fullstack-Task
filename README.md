# Full Stack Authentication App
This is a full-stack authentication module built using NestJS (backend) and React (frontend). It includes user signup, login, protected routes, and authentication using JWT.

## 📌 Features
✅ User authentication (signup, login, JWT authentication)
✅ Form validation (email, name, password rules)
✅ Protected dashboard page (requires authentication)
✅ Token-based authentication (stored in localStorage)
✅ Full-stack best practices with TypeScript
✅ UI with React, React Hook Form, Sass
✅ Backend using NestJS, MongoDB, JWT, and Bcrypt

## 🛠 Tech Stack
Frontend (React)
React + TypeScript
React Router
React Hook Form 
Axios (API requests)
Backend (NestJS)
NestJS + TypeScript
MongoDB (Database)
Mongoose (ORM)
JWT (Authentication)
Bcrypt (Password Hashing)


## 🚀 Setup & Installation
1️⃣ Clone the Repository
```
git clone https://github.com/ehabAbdelMawla/Easygenerator-Fullstack-Task.git
cd Easygenerator-Fullstack-Task
```

🖥 Backend Setup (/backend)
```
docker compose up
```
note: i upload `.env` file to make it easy to test
Backend will be running at: http://localhost:5555
Swagger running at: http://localhost:5555/api

🌐 Frontend Setup (/frontend)
1️⃣ Install dependencies
```
cd frontend
npm install
```
2️⃣ Start the frontend
npm start
Frontend will be running at: http://localhost:3000

## ✅ Best Practices Followed
✔ Secure authentication with JWT
✔ Password hashing using bcrypt
✔ API validation for user inputs
✔ Modular NestJS structure for maintainability
✔ Environment variables for secrets
✔ Sass for styling

📌 To-Do (Optional Enhancements)
🔹 Add forgot password functionality
🔹 Setup unit tests for backend & frontend