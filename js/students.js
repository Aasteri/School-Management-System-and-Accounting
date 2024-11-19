// Students Management
document.getElementById('addStudentBtn').addEventListener('click', () => {
    document.querySelector('.student-form').classList.toggle('hidden');
});

function addStudent() {
    const name = document.getElementById('studentName').value;
    const className = document.getElementById('studentClass').value;
    const fees = parseFloat(document.getElementById('studentFees').value);
    
    if (!name || !className || !fees) return;
    
    const student = {
        id: Date.now(),
        name,
        class: className,
        fees
    };
    
    db.students.push(student);
    db.save();
    updateStudentsList();
    
    // Clear form
    document.getElementById('studentName').value = '';
    document.getElementById('studentClass').value = '';
    document.getElementById('studentFees').value = '';
    document.querySelector('.student-form').classList.add('hidden');
}

function updateStudentsList() {
    const list = document.getElementById('studentsList');
    list.innerHTML = '';
    
    db.students.forEach(student => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div>
                <strong>${student.name}</strong> - ${student.class}
                <br>Fees: $${student.fees}
            </div>
            <button onclick="deleteStudent(${student.id})" class="btn-primary">Delete</button>
        `;
        list.appendChild(div);
    });
    
    document.getElementById('totalStudents').textContent = db.students.length;
}

function deleteStudent(id) {
    db.students = db.students.filter(s => s.id !== id);
    db.save();
    updateStudentsList();
}