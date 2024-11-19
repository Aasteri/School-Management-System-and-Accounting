class Todo {
    constructor(data) {
        this.id = data.id || Date.now();
        this.userId = data.userId;
        this.title = data.title;
        this.description = data.description;
        this.dueDate = data.dueDate;
        this.priority = data.priority;
        this.status = data.status || 'pending';
        this.category = data.category;
        this.assignedTo = data.assignedTo || [];
    }

    static create(data) {
        const todo = new Todo(data);
        db.todos.push(todo);
        db.save();
        return todo;
    }

    static getUserTodos(userId) {
        return db.todos.filter(t => 
            t.userId === userId || t.assignedTo.includes(userId)
        );
    }
}