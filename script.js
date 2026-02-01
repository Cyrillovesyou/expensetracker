

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const filterCategory = document.getElementById("filter-category");
const totalAmount = document.getElementById("total-amount")

let expenses = [];

expenseForm.addEventListener("submit" , (e) => {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const amount = Number(document.getElementById("expense-amount").value);
  const category = document.getElementById("options-category").value;
  const date = document.getElementById("expense-date").value;

  let expense = {
    id: Date.now(),
    name,
    amount,
    category,
    date
  }

  expenses.push(expense);
  displayExpenses(expenses)
  expenseForm.reset()
  updateTotalAmount();
  
})
expenseList.addEventListener("click" , (e) => {
  if(e.target.classList.contains("delete-btn")){
    const id = parseInt(e.target.dataset.id)
    expenses = expenses.filter(expense => expense.id !== id)
    displayExpenses(expenses)
     updateTotalAmount();
  }else{
    if(e.target.classList.contains("edit-btn")){
      const id = parseInt(e.target.dataset.id)
      const expense = expenses.find(expense => expense.id === id)

      document.getElementById("expense-name").value = expense.name;
      document.getElementById("expense-amount").value = expense.amount;
      document.getElementById("options-category").value = expense.category;
      document.getElementById("expense-date").value = expense.date;
      
      expenses = expenses.filter(expense => expense.id !== id)
      displayExpenses(expenses);
      updateTotalAmount();

    }
  }
})
filterCategory.addEventListener("change" , (e) => {
  const category = e.target.value;
  if(category === "ALL"){
     displayExpenses(expenses);
     updateTotalAmount();
  }else{
    const filteredExpenses = expenses.filter(expense => expense.category === category);
    displayExpenses(filteredExpenses)
    updateTotalAmount();
  }
})
function displayExpenses(expenses){
  expenseList.innerHTML = "";

  expenses.forEach(expense => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td>
      <button class="edit-btn" data-id="${expense.id}">Edit</button>
      <button class="delete-btn" data-id="${expense.id}">Delete</button>
      </td>
    `
    expenseList.appendChild(row)
  })

}
function updateTotalAmount(){
  const total = expenses.reduce((sum , expense) => sum + expense.amount, 0);
  totalAmount.textContent = total;
}
//Dark theme / Light theme
const toggleIcon = document.getElementById("theme-icon");

toggleIcon.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggleIcon.classList.toggle("fa-moon");
  toggleIcon.classList.toggle("fa-sun");
});
