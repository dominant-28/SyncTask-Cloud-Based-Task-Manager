# 🚀 SyncTask – Cloud-Based Task Manager

**SyncTask** is a scalable, feature-rich web application designed to streamline team collaboration and task management. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js), it provides a responsive, role-based interface for real-time task assignment, tracking, and communication.

The platform supports advanced task workflows, real-time notifications, face recognition login, and now includes a powerful **email invitation and temporary login system** for streamlined user onboarding. SyncTask is ideal for teams looking to boost productivity and stay organized in both remote and hybrid work environments.

---

## ✨ Key Features

### 👤 Role-Based Access Control
- Secure registration and login with JWT authentication.
- Two user roles: **Admin** and **Member**.
- Admins can manage users, tasks, and control permissions.

### 📩 Admin Invite & Temporary Login (NEW)
- Admins can invite team members via email.
- Invited users receive a secure temporary login link to access the system.
- Onboarding is streamlined for faster collaboration.

### ✅ Comprehensive Task Management
- Create, assign, edit, and delete tasks.
- Add sub-tasks, set due dates, priority (High, Medium, Low), and labels.
- Status tracking: **To Do**, **In Progress**, **Completed**.
- Support for asset uploads (e.g., images).
- Duplicate or trash tasks as needed.

### 💬 Real-Time Collaboration
- Task-based commenting system.
- In-app and email notifications for:
  - Task updates
  - Task assigned
  - Register/login and invitation

### 🔒 Facial Recognition Authentication (Optional)
- Users can opt for face-based login using:
  - `face_landmark_68_model`
  - `face_recognition_model`
  - `tiny_face_detector_model`
- Facial data stored securely as descriptor arrays.

### 📊 Dashboard & Search
- Dashboards which gives the all info about the taks assigned.
- Intelligent task filtering (by status, priority).
- Smart search by title.

### 🛠️ Workflow Creation
- Integrated **Draw.io** for visual task planning.
- Export workflow diagrams to image format and store with task assets.

### ⚙️ Profile & Password Management
- Update user profile, credentials, and passwords.

---

## 📁 View All Screenshots

👉 [Click here to view all screenshots](https://drive.google.com/drive/folders/1_pPcJVpHpmbLv4BZnza8ptK59P_cUYkS?usp=sharing)


---

## 🎥 Demo

📽️ [**Watch the Demo Video**](https://drive.google.com/uc?export=download&id=14x7DYadF9gMUaH8Yx1fqOcdHXVwPczap)

---

## 🧰 Tech Stack

### 🔹 Frontend
- **React (Vite)**
- **Redux Toolkit** (state management)
- **Tailwind CSS**
- **Headless UI**, HTML, JavaScript

### 🔹 Backend
- **Node.js**, **Express.js**
- **JWT** for authentication
- **Nodemailer** for email invitations

### 🔹 Database
- **MongoDB Atlas** – cloud-based document DB

---

## 🔮 Future Enhancements
- AI-powered task suggestions and prioritization
- Integration with third-party apps (e.g., Slack, Google Calendar)
- Timeline alerts and deadline notifications
- Direct messaging (user-to-user chat)

---




