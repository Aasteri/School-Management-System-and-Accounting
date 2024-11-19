// Authentication and authorization utilities
import { ROLE_PERMISSIONS } from '../config/roles.js';
import { User } from '../models/User.js';

export const auth = {
    currentUser: null,

    login(username, password) {
        const user = User.authenticate(username, password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    },

    checkPermission(permission) {
        if (!this.currentUser) return false;
        return ROLE_PERMISSIONS[this.currentUser.role].includes(permission);
    },

    init() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }
};