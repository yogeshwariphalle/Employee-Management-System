# 🚀 Employee Management System

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)
![REST API](https://img.shields.io/badge/REST-API-success?style=for-the-badge)
![Bruno](https://img.shields.io/badge/API_Testing-Bruno-orange?style=for-the-badge)

A **Full Stack Employee Management System** built using **Spring Boot**, **React.js**, **MySQL**, and **REST APIs**. The application allows users to manage employee records with complete CRUD functionality, search and filter employees, and view dashboard statistics. REST APIs are tested using **Bruno**.

---

## 📌 Features

- ✅ Add Employee
- ✅ Update Employee
- ✅ Delete Employee
- ✅ View All Employees
- ✅ Search Employees
- ✅ Filter by Department
- ✅ Filter by Status
- ✅ Filter by Salary Range
- ✅ Dashboard Statistics
- ✅ Employee Status Management
- ✅ Input Validation
- ✅ Global Exception Handling
- ✅ RESTful API Architecture
- ✅ API Testing using Bruno

---

## 🛠️ Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- REST API
- Maven

### Frontend

- React.js
- Vite
- Axios
- HTML5
- CSS3

### Database

- MySQL

### API Testing

- Bruno
- Postman

### Tools

- Intellij IDEA
- Visual Studio Code
- Git
- GitHub

---

## 📂 Project Structure

```
Employee-Management-System
│
├── employee_management_system          # Spring Boot Backend
│
├── employee_management_system_frontend
│   └── frontend                        # React Frontend
│
├── screenshots
│
└── README.md
```

---

## ⚙️ Backend Setup

### Clone Repository

```bash
git clone https://github.com/yogeshwariphalle/Employee-Management-System.git
```

### Navigate to Backend

```bash
cd employee_management_system
```

### Configure Database

Update the **application.properties**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### Run Application

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## 💻 Frontend Setup

Navigate to frontend folder

```bash
cd employee_management_system_frontend/frontend
```

Install dependencies

```bash
npm install
```

Run application

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

or

```
http://localhost:5174
```

---

## 🔗 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/employees | Create Employee |
| GET | /api/employees | Get All Employees |
| GET | /api/employees/{id} | Get Employee By ID |
| PUT | /api/employees/{id} | Update Employee |
| DELETE | /api/employees/{id} | Delete Employee |
| GET | /api/employees/search?keyword=IT | Search Employees |
| GET | /api/employees/department/{department} | Employees By Department |
| GET | /api/employees/status/{status} | Employees By Status |
| GET | /api/employees/salary?min=30000&max=60000 | Salary Range |
| GET | /api/employees/dashboard | Dashboard Statistics |
| PATCH | /api/employees/{id}/status | Update Employee Status |

---

## 🧪 API Testing

All REST APIs were tested using **Bruno**.

Example API:

```
GET /api/employees
```

Response

```json
[

{
  "id": 1,
  "name": "Yogeshwari Phalle",
  "email": "yogeshwari@gmail.com",
  "phone": "9876543210",
  "department": "IT",
  "designation": "Java Developer",
  "salary": 50000,
  "status": "ACTIVE"
}
   
]
```

---

## 🚀 Future Enhancements

- Authentication & Authorization (Spring Security + JWT)
- Pagination & Sorting
- File Upload (Employee Profile Image)
- Export Employees to Excel/PDF
- Email Notifications
- Responsive UI with Bootstrap

---

## 👩‍💻 Author

**Yogeshwari Phalle**

- GitHub: https://github.com/yogeshwariphalle
- LinkedIn: https://www.linkedin.com/in/yogeshwari-phalle-8a95321b3/

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub!
