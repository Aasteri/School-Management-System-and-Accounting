// Enhanced database structure
import { User } from './models/User.js';

class Database {
    constructor() {
        this.users = [];
        this.students = [];
        this.teachers = [];
        this.classes = [];
        this.subjects = [];
        this.attendance = [];
        this.grades = [];
        this.transactions = [];
        this.assets = [];
        this.todos = [];
        this.idCards = [];
        this.projects = [];
    }
    
    save() {
        const data = {
            users: this.users,
            students: this.students,
            teachers: this.teachers,
            classes: this.classes,
            subjects: this.subjects,
            attendance: this.attendance,
            grades: this.grades,
            transactions: this.transactions,
            assets: this.assets,
            todos: this.todos,
            idCards: this.idCards,
            projects: this.projects
        };
        localStorage.setItem('schoolMS', JSON.stringify(data));
    }
    
    load() {
        const data = JSON.parse(localStorage.getItem('schoolMS') || '{}');
        Object.keys(data).forEach(key => {
            this[key] = data[key] || [];
        });
    }

    init() {
        if (this.users.length === 0) {
            // Add demo admin user
            const adminUser = new User({
                username: 'admin',
                password: 'admin123',
                role: 'admin',
                name: 'System Admin',
                email: 'admin@school.com'
            });
            this.users.push(adminUser);
            this.save();
        }
    }
}

export const db = new Database();