# School Management System

A comprehensive web-based school management system built with vanilla JavaScript, HTML, and CSS. This system provides a complete solution for managing educational institutions with features for academic management, financial tracking, and administrative tasks.

## Table of Contents
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation Guide](#installation-guide)
  - [Local Development Setup](#local-development-setup)
  - [Production Deployment](#production-deployment)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support](#support)

## Features

### Core Modules
1. **User Management**
   - Multi-role user system (Admin, Teacher, Student, Parent, Accountant)
   - Role-based access control
   - User profile management
   - Password recovery system

2. **Academic Management**
   - Student enrollment and management
   - Class and section management
   - Subject management
   - Timetable generation
   - Attendance tracking
   - Examination management
   - Report card generation

3. **Financial Management**
   - Fee collection
   - Expense tracking
   - Salary management
   - Financial reports
   - Budget planning
   - Invoice generation

4. **Communication**
   - Browser notifications
   - In-app messaging
   - Announcement system
   - Event calendar

5. **Resource Management**
   - Library management
   - Inventory tracking
   - Asset management
   - Document storage

## System Requirements

### Development Environment
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser
- Text editor (VS Code recommended)
- Git (optional)

### Production Environment
- Web server (Apache/Nginx)
- SSL certificate
- Domain name (optional)
- 512MB RAM minimum
- 1GB storage minimum

## Installation Guide

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aasteri/School-Management-System-and-Accounting.git
   cd School-Management-System-and-Accounting
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_APP_NAME="School Management System"
   VITE_APP_URL="http://localhost:5173"
   VITE_APP_ENV="development"
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open browser: `http://localhost:5173`
   - Default admin credentials:
     - Username: `admin`
     - Password: `admin123`

### Production Deployment

#### Method 1: Netlify Deployment

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Create Netlify account
   - From Netlify dashboard:
     1. Click "New site from Git"
     2. Select repository
     3. Configure build settings:
        - Build command: `npm run build`
        - Publish directory: `dist`
     4. Click "Deploy site"

3. **Configure Environment Variables**
   - In Netlify dashboard:
     1. Go to Site settings > Build & deploy > Environment
     2. Add required variables:
        ```
        VITE_APP_NAME="School Management System"
        VITE_APP_ENV="production"
        ```

#### Method 2: Manual Server Deployment

1. **Prepare Server**
   - Install Node.js and npm
   - Set up web server (Apache/Nginx)
   - Configure SSL certificate

2. **Deploy Code**
   ```bash
   # On local machine
   npm run build
   
   # Transfer dist folder to server
   scp -r dist/* user@your-server:/var/www/html/
   ```

3. **Configure Web Server**
   
   Nginx configuration example:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Configuration

### System Settings

1. **Application Configuration**
   - Edit `js/config/app.js`:
     ```javascript
     export const APP_CONFIG = {
         name: 'School Management System',
         version: '1.0.0',
         dateFormat: 'YYYY-MM-DD',
         timeFormat: 'HH:mm',
         currency: 'USD'
     };
     ```

2. **Role Configuration**
   - Edit `js/config/roles.js` to modify permissions

### Database Setup

The system uses browser's LocalStorage for data persistence:

1. **Initialize Database**
   ```javascript
   // js/database.js
   db.init();
   ```

2. **Data Migration**
   ```javascript
   // js/utils/migration.js
   await Migration.run();
   ```

## Usage Guide

### First-Time Setup

1. **System Initialization**
   - Login as admin
   - Configure school details
   - Set up academic year

2. **User Setup**
   - Create department heads
   - Add teachers
   - Import student data

3. **Academic Setup**
   - Configure classes
   - Add subjects
   - Create timetable

### Daily Operations

1. **Attendance Management**
   ```javascript
   // Mark attendance
   await Attendance.mark({
       studentId: '123',
       date: '2024-02-20',
       status: 'present'
   });
   ```

2. **Fee Collection**
   ```javascript
   // Record payment
   await Payment.create({
       studentId: '123',
       amount: 1000,
       type: 'tuition'
   });
   ```

## Architecture

### Project Structure
```
├── index.html          # Entry point
├── style.css          # Global styles
├── js/
│   ├── app.js        # Application core
│   ├── database.js   # Data management
│   ├── config/       # Configuration files
│   ├── models/       # Data models
│   ├── utils/        # Utilities
│   └── pages/        # Page components
└── assets/           # Static files
```

### Key Components

1. **Frontend Architecture**
   - Vanilla JavaScript
   - Module-based structure
   - Event-driven communication

2. **Data Management**
   - LocalStorage for persistence
   - CRUD operations
   - Data validation

3. **Security Layer**
   - Authentication
   - Authorization
   - Data encryption

## Security

### Implementation

1. **Authentication**
   - Password hashing (SHA-256)
   - Session management
   - Token-based auth

2. **Authorization**
   - Role-based access
   - Permission checking
   - Resource protection

3. **Data Protection**
   - Input sanitization
   - XSS prevention
   - CSRF protection

## Troubleshooting

### Common Issues

1. **Login Problems**
   - Clear cache
   - Check credentials
   - Verify browser compatibility

2. **Data Issues**
   - Check LocalStorage
   - Clear site data
   - Verify browser settings

3. **Performance Issues**
   - Clear cache
   - Check browser console
   - Verify system requirements

## Support

### Getting Help

1. **Documentation**
   - Check this README
   - Review inline code comments
   - Check CONTRIBUTING.md

2. **Community Support**
   - GitHub Issues
   - Stack Overflow
   - Community forums

3. **Professional Support**
   - Email support
   - Bug reporting
   - Feature requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.