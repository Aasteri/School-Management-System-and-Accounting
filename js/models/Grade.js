class Grade {
    constructor(data) {
        this.id = data.id || Date.now();
        this.studentId = data.studentId;
        this.subjectId = data.subjectId;
        this.term = data.term;
        this.year = data.year;
        this.marks = data.marks;
        this.totalMarks = data.totalMarks;
        this.grade = this.calculateGrade(data.marks, data.totalMarks);
        this.remarks = data.remarks || '';
        this.teacherId = data.teacherId;
    }

    calculateGrade(marks, total) {
        const percentage = (marks / total) * 100;
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    }

    static create(data) {
        const grade = new Grade(data);
        db.grades.push(grade);
        db.save();
        return grade;
    }

    static getStudentReport(studentId, term, year) {
        return db.grades.filter(g => 
            g.studentId === studentId &&
            g.term === term &&
            g.year === year
        );
    }
}