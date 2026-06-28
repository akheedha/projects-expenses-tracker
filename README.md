# KEA Projects & Expenses Tracker

## Overview

This project was developed as part of the KEA Building Contracting Full-Stack Take-Home Assignment.

It is a simple full-stack application that allows users to create projects, manage project expenses, and track the remaining budget for each project.

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## Features

* Create a new project
* View all projects
* Expand and collapse project details
* Add expenses to a project
* Edit existing expenses
* Delete expenses
* View estimated budget
* View total expenses
* View remaining budget

---

## Project Structure

```
projects-expenses-tracker
│
├── client
│   ├── public
│   ├── src
│   ├── package.json
│   └── ...
│
├── server
│   ├── controllers
│   ├── db
│   ├── routes
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Database Schema

The application uses two tables.

### Projects

Stores project information including:

* Project Name
* Client Name
* Estimated Budget

### Expenses

Stores expenses related to a project including:

* Description
* Amount
* Category
* Project ID (Foreign Key)

Relationship:

```
Projects (1) --------< Expenses (Many)
```

Each project can have multiple expenses.

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## API Endpoints

### Projects

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /projects     |
| GET    | /projects     |
| GET    | /projects/:id |

### Expenses

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /expenses     |
| GET    | /expenses/:id |
| PUT    | /expenses/:id |
| DELETE | /expenses/:id |

---

## Assumptions

* Each expense belongs to one project.
* Remaining budget is calculated as:

```
Estimated Budget - Total Expenses
```

* Expense totals are updated after adding, editing, or deleting an expense.

---

## Future Improvements

Given more time, I would improve the project by:

* Adding better form validation.
* Improving the UI to match the provided design more closely.
* Adding search and filtering for projects.
* Improving the mobile responsive layout.

---

## Author

**Akheedha Jan**
