document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');
    const categoryFilter = document.getElementById('category-filter');

    // Initialize expenses from localStorage or empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        let filteredExpenses = expenses;
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'todos') {
            filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);
        }
        filteredExpenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.description}: C$${expense.amount} (${expense.category})`;
            expenseList.appendChild(li);
        });
        // Calculate total expense
        const total = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        totalExpense.textContent = total;
    }

    // Event listener for expense submission
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('expense-description').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        if (description && amount && category) {
            const expense = {
                description,
                amount,
                category
            };
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Por favor complete todos los campos.');
        }
    });

    // Event listener for category filter change
    categoryFilter.addEventListener('change', renderExpenses);

    // Render initial expenses
    renderExpenses();
});
