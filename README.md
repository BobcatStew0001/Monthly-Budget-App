💰 Budget Tracker App
A full-stack personal finance management application designed to help users track income, expenses, savings, and recurring transactions through a modern and responsive web interface.

📌 Overview
The Budget Tracker App allows users to manage their monthly finances in one centralized dashboard. Users can securely log in, monitor spending habits, manage recurring financial transactions, and gain a better understanding of their financial health.

This project was built using a C# WebAPI backend and a TypeScript frontend, with data stored in a PostgreSQL database.

🛠️ Tech Stack
Backend
C#
ASP.NET WebAPI
Dapper ORM
PostgreSQL
Frontend
TypeScript
HTML/CSS
Database
PostgreSQL
Development Tools
JetBrains Rider
JetBrains DataGrip
VS Code
Figma
✨ Features
🔐 User Authentication & Login
📊 Monthly Financial Overview Dashboard
💵 Income Tracking
💳 Expense Tracking
💰 Savings Monitoring
🔄 Add & Remove Recurring Transactions
📈 Organized Financial Data Visualization
🗄️ PostgreSQL Database Integration
📚 What I Learned
This project helped strengthen my understanding of full-stack application development and database integration. Key areas of growth included:

Building and structuring a RESTful WebAPI using C#
Connecting and managing a PostgreSQL database
Using Dapper for lightweight and efficient database operations
Improving my TypeScript development skills
Designing and organizing scalable backend architecture
Creating a responsive and user-friendly financial dashboard
🧱 Application Architecture
Frontend (TypeScript)
        │
        ▼
ASP.NET WebAPI (C# Backend)
        │
        ▼
Dapper ORM
        │
        ▼
PostgreSQL Database
🚀 Getting Started
Prerequisites
Make sure the following are installed:

.NET SDK
PostgreSQL
Node.js & npm
JetBrains Rider or VS Code
⚙️ Installation
Clone the Repository
git clone https://github.com/yourusername/budget-tracker-app.git
cd budget-tracker-app
Backend Setup
cd Backend
dotnet restore
dotnet run
Frontend Setup
cd Frontend
npm install
npm run dev
🗄️ Database Configuration
Create a PostgreSQL database
Update the connection string inside the backend configuration file
Example:

"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=BudgetTracker;Username=postgres;Password=yourpassword"
}
📷 Planned Improvements
Budget goal tracking
Financial charts & analytics
Mobile responsiveness improvements
Export financial reports
Notification system for recurring transactions
Dark mode support
📁 Repository Structure
Budget-Tracker-App/
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Data/
│
├── Frontend/
│   ├── Components/
│   ├── Pages/
│   └── Assets/
│
├── Database/
│
└── README.md
👨‍💻 Author
Zach Brown

Software Developer in Training focused on backend development, databases, and modern web applications.
