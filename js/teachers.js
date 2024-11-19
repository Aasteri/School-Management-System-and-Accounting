// Teachers Management
document.getElementById('addTeacherBtn').addEventListener('click', () => {
    document.querySelector('.teacher-form').classList.toggle('hidden');
});

function addTeacher() {
    const name = document.getElementById('teacherName').value;
    const subject = document.getElementById('teacherSubject').value;
    const salary = parseFloat(document.getElementById('teacherSalary').value);
    
    if (!name || !subject || !salary) return;
    
    const teacher = {
        id: Date.now(),
        name,
        subject,
        salary
    };
    
    db.teachers.push(teacher);
    db.save();
    updateTeachersList();
    
    // Clear form
    document.getElementById('teacherName').value = '';
    document.getElementById('teacherSubject').value = '';
    document.getElementById('teacherSalary').value = '';
    document.querySelector('.teacher-form').classList.add('hidden');
}

function updateTeachersList() {
    const list = document.getElementById('teachersList');
    list.innerHTML = '';
    
    db.teachers.forEach(teacher => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div>
                <strong>${teacher.name}</strong> - ${teacher.subject}
                <br>Salary: $${teacher.salary}
            </div>
            <button onclick="deleteTeacher(${teacher.id})" class="btn-primary">Delete</button>
        `;
        list.appendChild(div);
    });
    
    document.getElementById('totalTeachers').textContent = db.teachers.length;
}