# 🏗️ BuildMetrics AI

An AI-powered Construction Project & Expense Management Platform that helps construction companies manage projects, monitor budgets, track expenses, and gain AI-generated project insights through an interactive analytics dashboard.

---

## 🚀 Live Demo

### 🌐 Frontend (Vercel)
https://projects-expenses-tracker.vercel.app

### ⚙️ Backend (Railway)
https://projects-expenses-tracker-production.up.railway.app

---

# ✨ Features

## 📁 Project Management

- Create construction projects
- Store client information
- Manage project budgets

## 💰 Expense Tracking

- Record project expenses
- Categorize expenses
- Monitor total spending

## 📊 Analytics Dashboard

- Total Projects
- Total Budget
- Total Expenses
- Remaining Budget

## 📈 Data Visualization

- Budget Overview Pie Chart
- Project Budget Comparison Bar Chart

## 🤖 AI Insights

Generate AI-powered project summaries and budget insights using Google Gemini AI.

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Bootstrap 5
- Axios
- Recharts

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- Neon Database

## AI

- Google Gemini API

## Deployment

- Frontend: Vercel
- Backend: Railway
- Database: Neon PostgreSQL

---

# 📂 Project Structure

```
projects-expenses-tracker
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── styles
│   │
│   └── public
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── db
│   └── uploads
│
└── README.md
```

---

# 🗄 Database

## Projects Table

| Column | Type |
|---------|------|
| id | Serial |
| project_name | Text |
| client_name | Text |
| estimated_budget | Decimal |

## Expenses Table

| Column | Type |
|---------|------|
| id | Serial |
| project_id | Integer |
| expense_name | Text |
| amount | Decimal |
| category | Text |
| expense_date | Date |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/akheedha/projects-expenses-tracker.git

cd projects-expenses-tracker
```

---

## Install Frontend

```bash
cd client

npm install

npm run dev
```

---

## Install Backend

```bash
cd server

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
DB_USER=your_database_user
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432

PORT=5000

GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=https://your-backend-url
```

---

# 📡 API Endpoints

## Projects

| Method | Endpoint |
|---------|----------|
| GET | /projects |
| GET | /projects/:id |
| POST | /projects |

---

## Expenses

| Method | Endpoint |
|---------|----------|
| GET | /expenses/project/:id |
| POST | /expenses |

---

## AI

| Method | Endpoint |
|---------|----------|
| POST | /ai/analyze |

---

# 📊 Dashboard

The dashboard displays:

- Total Projects
- Total Budget
- Total Expenses
- Remaining Budget
- Budget Overview
- Project Budget Comparison

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Railway

Database

- Neon PostgreSQL

---

# 📚 Future Improvements

- User Authentication
- Role-Based Access Control
- Edit/Delete Projects
- Expense Categories Dashboard
- File Uploads
- PDF Reports
- Email Notifications
- Dark Mode
- Advanced AI Budget Forecasting

---

# 👩‍💻 Author

**Akheedha Jan**

GitHub:
https://github.com/akheedha

LinkedIn:
https://www.linkedin.com/in/akheedha/

---
