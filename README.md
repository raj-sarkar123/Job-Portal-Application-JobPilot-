# 🚀 JobPilot – Job Portal Application

JobPilot is a modern **full-stack job portal** built to connect **job seekers** and **recruiters** through a clean, role-based hiring experience.  
It supports job discovery, applications tracking, and recruiter job management with secure authentication.

---

## ✨ Features

### 👤 Candidate
- Browse and search jobs
- Apply to jobs
- Track application status
- Save jobs for later
- Role-based dashboard access 

### 🧑‍💼 Recruiter
- Post new jobs
- Manage job listings
- View candidate applications
- Secure recruiter-only routes

### 🔐 Authentication & Roles
- Clerk authentication
- Role-based access control (Candidate / Recruiter)
- Protected routes and actions

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**
- **ShadCN UI**
- **Framer Motion**
- **Lucide Icons**

### Backend / Services
- **Supabase** (Database + Storage)
- **Clerk** (Authentication & User Management)

### Tooling
- Git & GitHub
- ESLint
- Vite

---

## 📂 Project Structure

```bash
jobPortal/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── .gitignore
├── package.json
└── README.md
Create a .env file in the root directory:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Clone the repository
git clone https://github.com/raj-sarkar123/Job-Portal-Application-JobPilot.git
cd jobPortal

npm install
npm run dev
http://localhost:5173
🔒 Role-Based Access Logic

Recruiters can access job posting routes

Candidates can apply and track applications

UI and CTA buttons change dynamically based on role

📸 Screenshots

(Add screenshots here for better presentation)

🚀 Future Enhancements

Resume upload & parsing

Application status updates

Job recommendations (AI-based)

Admin dashboard

Notifications & email alerts

👨‍💻 Author

Raj Sarkar
B.Tech Student | MERN Stack Developer

🔗 GitHub: https://github.com/raj-sarkar123

⭐ If you like this project

Give it a star ⭐ and feel free to fork!

