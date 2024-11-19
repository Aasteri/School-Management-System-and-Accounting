import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { db } from '../database.js';
import { NotificationService } from '../utils/notifications.js';
import { ROLES, ROLE_PERMISSIONS } from '../config/roles.js';

export class User {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.username = data.username || this.generateUsername();
        this.password = data.password || this.generatePassword();
        this.role = data.role;
        this.name = data.name;
        this.email = data.email;
        this.profilePic = data.profilePic || 'default-avatar.png';
        this.active = data.active !== undefined ? data.active : true;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.lastLogin = data.lastLogin || null;
    }

    generateUsername() {
        return `USER${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    }

    generatePassword() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }

    static hashPassword(password) {
        return CryptoJS.SHA256(password).toString();
    }

    static async create(data) {
        const user = new User(data);
        const hashedPassword = this.hashPassword(user.password);
        const rawPassword = user.password;
        user.password = hashedPassword;
        
        db.users.push(user);
        db.save();

        // Send notification instead of email
        await NotificationService.notify({
            title: 'New User Created',
            message: `Account created for ${user.name} with username: ${user.username}`,
            type: 'success'
        });
        
        return user;
    }

    static async bulkCreate(usersData) {
        const createdUsers = [];
        const errors = [];

        for (const userData of usersData) {
            try {
                const user = await this.create(userData);
                createdUsers.push(user);
            } catch (error) {
                errors.push({ userData, error: error.message });
            }
        }

        return { createdUsers, errors };
    }

    static authenticate(username, password) {
        const hashedPassword = this.hashPassword(password);
        const user = db.users.find(u => 
            u.username === username && 
            u.password === hashedPassword &&
            u.active === true
        );
        
        if (user) {
            user.lastLogin = new Date().toISOString();
            db.save();
            return new User(user);
        }
        
        return null;
    }

    static update(userId, updates) {
        const index = db.users.findIndex(u => u.id === userId);
        if (index === -1) throw new Error('User not found');

        const user = db.users[index];
        const updatedUser = { ...user, ...updates };
        
        if (updates.password) {
            updatedUser.password = this.hashPassword(updates.password);
        }

        db.users[index] = updatedUser;
        db.save();
        
        return new User(updatedUser);
    }

    static delete(userId) {
        db.users = db.users.filter(u => u.id !== userId);
        db.save();
    }

    static toggleActive(userId) {
        const user = db.users.find(u => u.id === userId);
        if (!user) throw new Error('User not found');

        user.active = !user.active;
        db.save();
        
        return new User(user);
    }

    static parseExcelUsers(file) {
        const workbook = XLSX.read(file, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        return data.map(row => ({
            name: row.name,
            email: row.email,
            role: row.role,
        }));
    }
}