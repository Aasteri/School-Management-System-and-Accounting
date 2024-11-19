import { User } from '../models/User.js';
import { ROLES } from '../config/roles.js';

export function initUserManagement() {
    const userList = document.getElementById('userList');
    const addUserForm = document.getElementById('addUserForm');
    const bulkUploadForm = document.getElementById('bulkUploadForm');

    // Initialize event listeners
    addUserForm.addEventListener('submit', handleAddUser);
    bulkUploadForm.addEventListener('submit', handleBulkUpload);
    document.getElementById('uploadUsers').addEventListener('change', handleFileSelect);

    // Load initial user list
    loadUsers();

    async function handleAddUser(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const user = await User.create({
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role')
            });
            
            loadUsers();
            e.target.reset();
        } catch (error) {
            alert('Failed to create user: ' + error.message);
        }
    }

    async function handleBulkUpload(e) {
        e.preventDefault();
        const file = document.getElementById('uploadUsers').files[0];
        if (!file) return;

        try {
            const users = User.parseExcelUsers(file);
            const { createdUsers, errors } = await User.bulkCreate(users);
            
            if (errors.length > 0) {
                console.error('Some users failed to create:', errors);
            }
            
            loadUsers();
            e.target.reset();
        } catch (error) {
            alert('Failed to bulk upload users: ' + error.message);
        }
    }

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('fileName').textContent = file.name;
        }
    }

    function loadUsers() {
        const users = db.users;
        userList.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.active ? 'Active' : 'Inactive'}</td>
                <td>
                    <button onclick="editUser('${user.id}')" class="btn-edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="toggleUserStatus('${user.id}')" class="btn-toggle">
                        <i class="fas fa-power-off"></i>
                    </button>
                    <button onclick="deleteUser('${user.id}')" class="btn-delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            userList.appendChild(row);
        });
    }

    window.editUser = async function(userId) {
        const user = db.users.find(u => u.id === userId);
        if (!user) return;

        const { value: formValues } = await Swal.fire({
            title: 'Edit User',
            html: `
                <input id="swal-name" class="swal2-input" value="${user.name}">
                <input id="swal-email" class="swal2-input" value="${user.email}">
                <select id="swal-role" class="swal2-input">
                    ${Object.values(ROLES).map(role => 
                        `<option value="${role}" ${user.role === role ? 'selected' : ''}>
                            ${role}
                        </option>`
                    ).join('')}
                </select>
            `,
            focusConfirm: false,
            preConfirm: () => ({
                name: document.getElementById('swal-name').value,
                email: document.getElementById('swal-email').value,
                role: document.getElementById('swal-role').value
            })
        });

        if (formValues) {
            try {
                await User.update(userId, formValues);
                loadUsers();
            } catch (error) {
                alert('Failed to update user: ' + error.message);
            }
        }
    };

    window.toggleUserStatus = async function(userId) {
        try {
            await User.toggleActive(userId);
            loadUsers();
        } catch (error) {
            alert('Failed to toggle user status: ' + error.message);
        }
    };

    window.deleteUser = async function(userId) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await User.delete(userId);
                loadUsers();
            } catch (error) {
                alert('Failed to delete user: ' + error.message);
            }
        }
    };
}