// Accounting Management
document.getElementById('addTransactionBtn').addEventListener('click', () => {
    document.querySelector('.transaction-form').classList.toggle('hidden');
});

function addTransaction() {
    const type = document.getElementById('transactionType').value;
    const description = document.getElementById('transactionDesc').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    
    if (!description || !amount) return;
    
    const transaction = {
        id: Date.now(),
        type,
        description,
        amount,
        date: new Date().toISOString()
    };
    
    db.transactions.push(transaction);
    db.save();
    updateTransactionsList();
    updateFinancialSummary();
    
    // Clear form
    document.getElementById('transactionDesc').value = '';
    document.getElementById('transactionAmount').value = '';
    document.querySelector('.transaction-form').classList.add('hidden');
}

function updateTransactionsList() {
    const list = document.getElementById('transactionsList');
    list.innerHTML = '';
    
    db.transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(transaction => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div>
                    <strong>${transaction.description}</strong>
                    <br>${new Date(transaction.date).toLocaleDateString()}
                </div>
                <div style="color: ${transaction.type === 'income' ? 'green' : 'red'}">
                    ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount}
                </div>
            `;
            list.appendChild(div);
        });
}

function updateFinancialSummary() {
    const income = db.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = db.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    document.getElementById('totalIncome').textContent = `$${income}`;
    document.getElementById('totalExpenses').textContent = `$${expenses}`;
    document.getElementById('netBalance').textContent = `$${balance}`;
    document.getElementById('totalRevenue').textContent = `$${balance}`;
}