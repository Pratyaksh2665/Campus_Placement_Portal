# Campus Placement Portal

A full-stack **Campus Placement Portal** built to connect students with recruiters and simplify the college placement process.

## 🚀 Live Demo

### Open the deployed application
👉 https://campus-placement-portal-frontend-88e9.onrender.com/

### Backend API
👉 https://campus-placement-portal-mh1g.onrender.com/

---

## 📌 Features

### 👨‍🎓 Student

- Student registration and login
- Student profile management
- Add college, branch, year and CGPA
- Add skills
- Upload resume
- Add GitHub, LinkedIn and portfolio links
- Browse available jobs
- Search jobs by keyword
- View detailed job information
- Apply for jobs
- Prevent duplicate applications
- Save jobs
- View submitted applications
- Track application status
- Receive application status notifications

### 👨‍💼 Recruiter

- Recruiter registration and login
- Recruiter dashboard
- Create and manage companies
- Create and manage jobs
- View jobs posted by the recruiter
- View applicants for a job
- View applicant profile information
- View applicant resume
- View applicant skills, CGPA, college, branch and other details
- Update application status:
  - Applied
  - Under Review
  - Interview
  - Selected
  - Rejected
- Send application status notifications to students

### 🌐 Public

- Landing page
- Browse jobs without logging in
- Search jobs
- Browse companies
- View company details
- Visit company websites
- Featured companies
- Latest jobs

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Cookie-based authentication
- Multer
- Cloudinary

### Deployment

- Frontend: Render
- Backend: Render
- Database: MongoDB Atlas
- Resume storage: Cloudinary

---

## 📂 Project Structure

```text
campus-placement-portal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── recruiter/
│   │   │   └── student/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── ...
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── index.js
    ├── package.json
    └── ...
```

> Folder names may differ slightly depending on the current repository structure.

---

## 🔐 Authentication & Authorization

The application supports role-based access control.

### Student

Students can:

- Manage their profile
- Search and apply for jobs
- Save jobs
- Track applications

### Recruiter

Recruiters can:

- Manage their companies
- Create jobs
- Manage their jobs
- View applicants
- Update application statuses

Protected routes ensure that users can only access functionality allowed for their role.

---

## 🔎 Job Search

Jobs can be searched by keyword.

For example:

```text
Microsoft
React
Node.js
Software Engineer
```

The search is handled through the backend API and retrieves matching jobs from MongoDB.

---

## 🏢 Company Management

There are separate public and recruiter company flows.

### Public

```text
/companies
/companies/:id
```

Anyone can browse companies and view company details.

### Recruiter

```text
/recruiter/companies
/recruiter/company/create
/recruiter/company/:id
```

Recruiters can only manage companies created by them.

---

## 💼 Job Management

### Public

```text
/jobs
/jobs/:id
```

Users can browse and view available jobs.

### Recruiter

```text
/recruiter/jobs
/recruiter/job/create
/recruiter/job/:id
```

Recruiters can create, update and delete their own jobs.

---

## 📄 Applicant Management

Recruiters can open the applicants for each job.

Applicant information includes:

- Name
- Email
- Phone
- College
- Branch
- Year
- CGPA
- Skills
- Experience
- Bio
- GitHub
- LinkedIn
- Portfolio
- Resume

Recruiters can then update the application status.

```text
Applied
    ↓
Under Review
    ↓
Interview
    ↓
Selected / Rejected
```

---

## 📄 Resume Upload

Students can upload their resume from their profile.

Supported format:

```text
PDF
```

Maximum file size:

```text
5 MB
```

Resumes are uploaded to Cloudinary and the resulting URL is stored in the user's profile.

---

## 🔔 Notifications

Students receive notifications when recruiters update their application status.

For example:

```text
Your application for "Software Engineer"
has been Selected.
```

---

## 🔧 Environment Variables

### Frontend

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://campus-placement-portal-mh1g.onrender.com/api
```

### Backend

Create a `.env` file containing the required configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit `.env` files or secrets to GitHub.

---

## ▶️ Run Locally

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd campus-placement-portal
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create `.env` files in the frontend and backend directories.

### 5. Start backend

```bash
cd backend
npm start
```

### 6. Start frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

and the backend at:

```text
http://localhost:5000
```

---

## 🧪 Main Application Routes

### Public

```text
/
/jobs
/jobs/:id
/companies
/companies/:id
/login
/register
```

### Student

```text
/student/dashboard
/student/applications
/student/profile
/saved-jobs
```

### Recruiter

```text
/recruiter/dashboard
/recruiter/companies
/recruiter/company/create
/recruiter/company/:id
/recruiter/jobs
/recruiter/job/create
/recruiter/job/:id
/recruiter/job/:id/applicants
```

---

## 🔗 API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Profile

```text
GET  /api/profile
PUT  /api/profile
POST /api/profile/upload-resume
```

### Jobs

```text
GET    /api/jobs
GET    /api/jobs/:id
GET    /api/jobs/recruiter
POST   /api/jobs/create
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Companies

Public:

```text
GET /api/companies
GET /api/companies/:id
```

Recruiter:

```text
GET    /api/company
POST   /api/company/create
GET    /api/company/:id
PUT    /api/company/:id
DELETE /api/company/:id
```

### Applications

```text
POST /api/applications/apply
GET  /api/applications/my
GET  /api/applications/job/:jobId
PUT  /api/applications/:id/status
```

---

## 🔒 Security

The application includes:

- JWT-based authentication
- HTTP cookie authentication
- Role-based authorization
- Protected recruiter routes
- Protected student routes
- Recruiter ownership checks for companies and jobs
- Recruiter ownership checks before viewing applicants
- Recruiter ownership checks before updating application status
- Password hashing with bcrypt
- Environment variables for secrets
- Resume file type and size restrictions

---

## 🚀 Future Improvements

Possible improvements include:

- Admin dashboard
- Advanced job filters
- Pagination
- Job recommendations
- Email notifications
- Interview scheduling
- Recruiter profile pages
- Student profile pages
- Application analytics
- Company logos
- Job bookmarks with improved UI
- Advanced resume parsing
- Search and filtering improvements

---

## 👨‍💻 Author

**Pratyaksh Mishra**

Campus Placement Portal built as a full-stack web application using the MERN stack.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
