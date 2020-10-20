let count = 0;
let income = 0;
let expenses = 0;
let budget = 0;
const addValue = document.querySelector('.add-value');
const budgetValue = document.querySelector('.budget-value');
const addType = document.querySelector('.add-type');
const incomeValue = document.querySelector('.income-value');
const expensesValue = document.querySelector('.expenses-value');
const addDescription = document.querySelector('.add-description');
const delBtnInc = document.querySelector('.del-btn-inc');
const delBtnExp = document.querySelector('.del-btn-exp');
const addBtn = document.querySelector('.add-btn');


let ctrlAdditem = function() {
    //income
    if (addType.value === 'inc') {
        income = +addValue.value + +income;
        budget = +addValue.value + +budget;
        incomeValue.textContent = '+' + formatNumber(income);
        if (budget > 0) {
            budgetValue.textContent = '+' + formatNumber(budget);
        } else {
            budgetValue.textContent = formatNumber(budget);
        }

        differentDivs('income');
        addDescription.value = '';
        addValue.value = '';
    }
    //expenses
    if (addType.value === 'exp') {
        expenses = +addValue.value + +expenses;
        budget = +budget - +addValue.value;
        expensesValue.textContent = '-' + formatNumber(expenses);
        if (budget > 0) {
            budgetValue.textContent = '+' + formatNumber(budget);
        } else {
            budgetValue.textContent = formatNumber(budget);
        }

        differentDivs('expenses');
        addDescription.value = '';
        addValue.value = '';
    }
}
addBtn.addEventListener('click', ctrlAdditem);

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { ctrlAdditem(); }
});

function formatNumber(num) {
    return (+num).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


addType.addEventListener('change', function() {
    changeColor();
})

function changeColor() {
    addBtn.classList.toggle('add-btn-red');
    addType.classList.toggle('add-type-red');
    addDescription.classList.toggle('add-description-red');
    addValue.classList.toggle('add-value-red');
}

function differentDivs(type) {

    count++;

    document.querySelector(`.${type}-list`).innerHTML += `\
        <div class = "${type}-item ${type}-${count}">\
         <div class = "item-descr">${addDescription.value}</div>\
          <div class = "item-value-${type}">${formatNumber(addValue.value)}\
          <button class="del-btn-${type}" onClick = "removeItem(this)">\
          <i class="ion-ios-close-outline"></i>\
          </button></div>\
          </div>\
          `;
}




function removeItem(e) {
    budget = (+budgetValue.textContent.replace(',', '') + +e.parentElement.textContent.replace(',', ''));

    console.log(e.classList.value);
    if (e.classList.value === 'del-btn-income') {
        income = (+incomeValue.textContent.replace(',', '') - +e.parentElement.textContent.replace(',', ''));
        budget = (+budgetValue.textContent.replace(',', '') - +e.parentElement.textContent.replace(',', ''));
        console.log(income);
        incomeValue.textContent = '+' + formatNumber(income)
    } else {
        expenses = (+expensesValue.textContent.replace(',', '') + +e.parentElement.textContent.replace(',', ''));
        expensesValue.textContent = formatNumber(expenses)
    }

    if (budget > 0) {
        budgetValue.textContent = '+' + formatNumber(budget)
        e.parentElement.parentElement.remove();
    } else {
        budgetValue.textContent = formatNumber(budget)
        e.parentElement.parentElement.remove();
    }


}