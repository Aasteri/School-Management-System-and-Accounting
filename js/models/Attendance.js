class Attendance {
    constructor(data) {
        this.id = data.id || Date.now();
        this.studentId = data.studentId;
        this.date = data.date || new Date().toISOString().split('T')[0];
        this.status = data.status; // present, absent, late
        this.markedBy = data.markedBy;
        this.remarks = data.remarks || '';
    }

    static markAttendance(data) {
        const attendance = new Attendance(data);
        db.attendance.push(attendance);
        db.save();
        return attendance;
    }

    static getStudentAttendance(studentId, startDate, endDate) {
        return db.attendance.filter(a => 
            a.studentId === studentId &&
            a.date >= startDate &&
            a.date <= endDate
        );
    }

    static getClassAttendance(classId, date) {
        const students = db.students.filter(s => s.classId === classId);
        return students.map(student => {
            const attendance = db.attendance.find(a => 
                a.studentId === student.id && a.date === date
            );
            return {
                student,
                attendance: attendance || { status: 'not_marked' }
            };
        });
    }
}