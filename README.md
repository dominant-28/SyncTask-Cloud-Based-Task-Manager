# SyncTask-Cloud-Based-Task-Manager


## Overview
The Cloud-Based Task Manager is a web application designed to streamline team task management. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this platform provides a user-friendly interface for efficient task assignment, tracking, and collaboration. The application caters to administrators and regular users, offering comprehensive features to enhance productivity and organization.

## Why/Problem?
In a dynamic work environment, effective task management is crucial for team success. Traditional methods of task tracking through spreadsheets or manual systems can be cumbersome and prone to errors. The Cloud-Based Task Manager aims to address these challenges by providing a centralized platform for task management, enabling seamless collaboration and improved workflow efficiency.

## Background
With the rise of remote work and dispersed teams, there is a growing need for tools that facilitate effective communication and task coordination. The Cloud-Based Task Manager addresses this need by leveraging modern web technologies to create an intuitive and responsive task management solution. The MERN stack ensures scalability, while the integration of Redux Toolkit, Headless UI, and Tailwind CSS enhances user experience and performance.

## Features
### Admin Features
#### User Management:
- Create admin accounts.
- Add and manage team members.

#### Task Assignment:
- Assign tasks to individual or multiple users.
- Update task details and status.

#### Task Properties:
- Label tasks as todo, in progress, or completed.
- Assign priority levels (high, medium, normal, low).
- Add and manage sub-tasks.

#### Asset Management:
- Upload task assets, such as images.

#### User Account Control:
- Disable or activate user accounts.
- Permanently delete or trash tasks.

### User Features
#### Task Interaction:
- Change task status (in progress or completed).
- View detailed task information.

#### Communication:
- Add comments or chat to task activities.

### General Features
#### Authentication and Authorization:
- Users can register as either a regular user or an admin.
- Role-based access control ensures appropriate permissions for each role.
- Secure authentication for login and access management.

#### Profile Management:
- Update user profiles.

#### Password Management:
- Change passwords securely.

#### Dashboard:
- Provide a summary of user activities.
- Filter tasks into todo, in progress, or completed.

### Face Recognition Authentication
The application includes an optional Face Recognition Authentication feature, allowing users to register and log in using facial recognition. During registration, users can capture and store their facial data securely. At login, the system matches their face to the stored data for authentication, enhancing security and user convenience. Face data is securely stored as descriptor arrays, ensuring privacy. The system utilizes models such as `face_landmark_68_model`, `face_recognition_model`, and `tiny_face_detector_model` for accurate facial recognition and authentication.

### Notification System
The Task Manager includes a real-time notification system to keep users informed about important updates. Users receive alerts for new task assignments, status changes, and comments, ensuring seamless collaboration and timely responses.

## Technologies Used
### Frontend:
- React (Vite)
- Redux Toolkit for State Management
- Headless UI
- Tailwind CSS

### Backend:
- Node.js with Express.js

### Database:
- MongoDB for efficient and scalable data storage.

The Cloud-Based Task Manager is an innovative solution that brings efficiency and organization to task management within teams. By harnessing the power of the MERN stack and modern frontend technologies, the platform provides a seamless experience for both administrators and users, fostering collaboration and productivity.

