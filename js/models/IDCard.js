class IDCard {
    constructor(data) {
        this.id = data.id || Date.now();
        this.userId = data.userId;
        this.cardNumber = this.generateCardNumber();
        this.issueDate = new Date().toISOString();
        this.validUntil = data.validUntil;
        this.type = data.type; // student, staff, visitor
    }

    generateCardNumber() {
        return `${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6)}`.toUpperCase();
    }

    static generate(userData) {
        const idCard = new IDCard(userData);
        db.idCards.push(idCard);
        db.save();
        return idCard;
    }

    static getTemplate(type) {
        return {
            student: {
                color: '#4CAF50',
                fields: ['name', 'class', 'roll', 'bloodGroup']
            },
            staff: {
                color: '#2196F3',
                fields: ['name', 'designation', 'department']
            },
            visitor: {
                color: '#FFC107',
                fields: ['name', 'purpose', 'validUntil']
            }
        }[type];
    }
}