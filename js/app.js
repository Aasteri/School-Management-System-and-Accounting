// Main application initialization
import { auth } from './utils/auth.js';
import { PERMISSIONS } from './config/roles.js';
import { db } from './database.js';

// Navigation items configuration
const NAV_ITEMS = {
    dashboard: { icon: 'fas fa-tachometer-alt', title: 'Dashboard', permission: PERMISSIONS.VIEW_DASHBOARD },
    students: { icon: 'fas fa-user-graduate', title: 'Students', permission: PERMISSIONS.MANAGE_STUDENTS },
    teachers: { icon: 'fas fa-chalkboard-teacher', title: 'Teachers', permission: PERMISSIONS.MANAGE_TEACHERS },
    attendance: { icon: 'fas fa-calendar-check', title: 'Attendance', permission: PERMISSIONS.MANAGE_ATTENDANCE },
    grades: { icon: 'fas fa-graduation-cap', title: 'Grades', permission: PERMISSIONS.MANAGE_GRADES },
    finances: { icon: 'fas fa-money-bill-wave', title: 'Finances', permission: PERMISSIONS.MANAGE_FINANCES },
    assets: { icon: 'fas fa-boxes', title: 'Assets', permission: PERMISSIONS.MANAGE_ASSETS },
    todos: { icon: 'fas fa-tasks', title: 'To-Do', permission: PERMISSIONS.MANAGE_TODOS },
    idCards: { icon: 'fas fa-id-card', title: 'ID Cards', permission: PERMISSIONS.GENERATE_ID_CARDS }
};

function initializeApp() {
    // Initialize database
    db.load();
    db.init();
    
    // Initialize authentication
    auth.init();
    
    // Setup login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // If user is already logged in, show main app
    if (auth.currentUser) {
        showMainApp();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (auth.login(username, password)) {
        showMainApp();
    } else {
        alert('Invalid credentials');
    }
}

function showMainApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    // Setup navigation
    setupNavigation();
    
    // Load initial data
    loadDashboard();
}

function setupNavigation() {
    const navLinks = document.getElementById('navLinks');
    navLinks.innerHTML = '';
    
    Object.entries(NAV_ITEMS).forEach(([id, item]) => {
        if (auth.checkPermission(item.permission)) {
            const li = document.createElement('li');
            li.dataset.page = id;
            li.innerHTML = `
                <i class="${item.icon}"></i>
                <span>${item.title}</span>
            `;
            li.addEventListener('click', () => navigateTo(id));
            navLinks.appendChild(li);
        }
    });
}

function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        loadPageData(pageId);
    }
}

function loadPageData(pageId) {
    switch (pageId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'attendance':
            loadAttendance();
            break;
        case 'grades':
            loadGrades();
            break;
        // Add other page loaders
    }
}

function loadDashboard() {
    // Load dashboard data based on user role
    const dashboard = document.getElementById('dashboard');
    const role = auth.currentUser.role;
    
    // Customize dashboard based on role
    switch (role) {
        case 'teacher':
            loadTeacherDashboard(dashboard);
            break;
        case 'student':
            loadStudentDashboard(dashboard);
            break;
        // Add other role-specific dashboards
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);