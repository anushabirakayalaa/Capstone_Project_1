# Capstone_Project_1
Blog Application
A full-stack MERN Blog Application where users can read articles and authors can create, edit, and manage their own blogs.

Features
        Authentication
                User Registration
                User Login
                JWT Authentication
                Protected Routes
        User Features
                View all articles
                Read article details
                Responsive article cards
                Toast notifications
        Author Features
                Create articles
                Edit articles
                Delete articles
                View own articles
        UI Features
                Responsive Design
                Tailwind CSS Styling
                Modern Card Layout
                Mobile Friendly
                Toast Messages using React Hot Toast
Tech Stack
Frontend
        React
        Vite
        Tailwind CSS
        React Router DOM
        Axios
        React Hot Toast
        
Backend
        Node.js
        Express.js
        MongoDB
        JWT Authentication

        
Folder Structure
project/
│
├── backend/
│
└── frontend/
    │
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
Installation
        Clone Repository
        git clone <repository-url>
Backend Setup
Navigate to backend
        cd backend
Install dependencies
        npm install
Start backend server
        npm run server

Backend runs on:
        http://localhost:5000
Frontend Setup
Navigate to frontend
        cd frontend
Install dependencies
        npm install
Install additional packages
        npm install react-router-dom axios react-hot-toast
Start frontend
        npm run dev
Frontend runs on:
        http://localhost:5173
Toast Setup
Install React Hot Toast:
        npm install react-hot-toast
Add Toaster in App.jsx
        <Toaster position="top-center" reverseOrder={false} />      
Example:
        toast.success("Article added successfully");
        Responsive Grid Layout

Articles are displayed using responsive Tailwind grid classes:
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
        1 card → extra small screens
        2 cards → small screens
        3 cards → medium screens
        4 cards → large screens and above
API Features
        Get all articles
        Get article by ID
        Create article
        Update article
        Delete article
        User authentication
Author Dashboard
Authors can:
        Add new articles
        Edit existing articles
        Delete articles
        Manage their own blogs
Timestamp Format
Timestamps are displayed in IST format using:
        new Date(date).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata"
        })
Future Improvements
        Dark Mode
        Article Likes
        Comments Section
        Search Functionality
        Pagination
        Profile Images
        Rich Text Editor
        
