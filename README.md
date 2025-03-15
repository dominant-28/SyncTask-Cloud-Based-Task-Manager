# SyncTask-Cloud-Based-Task-Manager


## Overview
The Cloud-Based Task Manager is a web application designed to streamline team task management. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this platform provides a user-friendly interface for efficient task assignment, tracking, and collaboration. The application caters to administrators and regular users, offering comprehensive features to enhance productivity and organization.

## Why/Problem?
In a dynamic work environment, effective task management is crucial for team success. Traditional methods of task tracking through spreadsheets or manual systems can be cumbersome and prone to errors. The Cloud-Based Task Manager aims to address these challenges by providing a centralized platform for task management, enabling seamless collaboration and improved workflow efficiency.

## Background
With the rise of remote work and dispersed teams, there is a growing need for tools that facilitate effective communication and task coordination. The Cloud-Based Task Manager addresses this need by leveraging modern web technologies to create an intuitive and responsive task management solution. The MERN stack ensures scalability, while the integration of Redux Toolkit, Headless UI, and Tailwind CSS enhances user experience and performance.

## Screenshots
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://drive.google.com/uc?export=view&id=1svmd6JT_nXAJEoxfSmWf8GFvesXI2qA_" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1wn5jZ-Klsmsf-Zbv01L585S0zMLxqQxx" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1_-1Dzmd1YGry_6qeeESM9hA-9HQ7Jix-" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1ky-NRPf5XDyI3hMABGgNHw43vx_sHfRz" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1xZ_IzlW_QT_qFYP3iHkHAUAXQ-t_SG7i" width="500">
  <img src="https://drive.google.com/uc?export=view&id=172t8LhWJ7EPqWZmgEPNn5u01-TbsbLIM" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1i0lE2MRP2Ma195e7i0xYwEGV_BAdJNAM" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1XhSkL61-9KYxV6t7c1pl1kLiGmmrxLLV" width="500">
  <img src="https://drive.google.com/uc?export=view&id=15f6lUxXfuNn9MHck4gPD9FoyQCfeVFZ1" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1rw9Vc-r2GEJFD8jEfSPEZKzItlF-KiSe" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1V1emNreZUFa7FVgefTyuPDOV3iEETwTV" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1uyDb3SVuvBo2t0jZjB7I3Va0z8EeGofg" width="500">
  <img src="https://drive.google.com/uc?export=view&id=1zFeGo_MLQTN9k2gFNyTzFxYdvGyEm2PT" width="500">
</div>

## Video
<a href="https://drive.google.com/uc?export=download&id=14x7DYadF9gMUaH8Yx1fqOcdHXVwPczap" target="_blank">
    🎥 Watch Video Demo
</a>

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
- Duplicate the task.

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

#### Seaching Tasks
- if the large number of task gather, we can search to get the specific Task by its title and discription.
  
#### Face Recognition Authentication
The application includes an optional Face Recognition Authentication feature, allowing users to register and log in using facial recognition. During registration, users can capture and store their facial data securely. At login, the system matches their face to the stored data for authentication, enhancing security and user convenience. Face data is securely stored as descriptor arrays, ensuring privacy. The system utilizes models such as `face_landmark_68_model`, `face_recognition_model`, and `tiny_face_detector_model` for accurate facial recognition and authentication.

#### Notification System
The Task Manager includes a real-time notification system to keep users informed about important updates. Users receive alerts for new task assignments, status changes, and comments, ensuring seamless collaboration and timely responses.

## Technologies Used
### Frontend:
- React (Vite)
- Redux Toolkit for State Management
- Headless UI
- Tailwind CSS
- HTML
- JavaScript

### Backend:
- Node.js with Express.js

### Database:
- MongoDB(Atlas) for efficient and scalable data storage.

## Future Improvement
- Integrating the AI in this app.
- Intergration with the third party apps.
- Adding feature of alert for timeline.
- Space for chatting at individual level.
- Integrating with the Draw.io for creating the workflow.
  
The Cloud-Based Task Manager is an innovative solution that brings efficiency and organization to task management within teams. By harnessing the power of the MERN stack and modern frontend technologies, the platform provides a seamless experience for both administrators and users, fostering collaboration and productivity.

