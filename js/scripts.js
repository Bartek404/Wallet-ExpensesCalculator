const incomeSection = document.querySelector('.income-area')
const expensesSection = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionPanel = document.querySelector('.add-transaction-panel')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')
const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')

const btnLight = document.querySelector('.light')
const btnDark = document.querySelector('.dark')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	addTransactionPanel.style.display = 'flex'
}

const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInputs()
}

const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createNewTransaction()
	} else {
		alert('Wypelnij wszystkie pola!')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)
	checkCategory(selectedCategory)
	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
        <p class="transaction-amount"> ${amountInput.value} PLN
        <button class="delete" onclick="deleteTransaction(${ID})">
            <i class="fas fa-times"></i>
        </button>
    </p>
    `
	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expense')

	moneyArr.push(amountInput.valueAsNumber)
	countMoney(moneyArr)
	ID++
	closePanel()
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[+] Przychod':
			categoryIcon = `<i class="fas fa-money-bill-wave"></i>`
			break
		case '[-] Zakupy':
			categoryIcon = `<i class="fas fa-cart-arrow-down"></i>`
			break
		case '[-] Jedzenie':
			categoryIcon = `<i class="fas fa-hamburger"></i>`
			break
		case '[-] Kino':
			categoryIcon = `<i class="fas fa-film"></i>`
			break
	}
}

const countMoney = moneyArr => {
	let money = moneyArr.reduce((first, second) => first + second, 0)
	availableMoney.textContent = `${money} PLN`
}

const deleteTransaction = ID => {
	const toDelete = document.getElementById(ID)
	const amountToDelete = parseFloat(toDelete.childNodes[3].innerText)
	const indexOf = moneyArr.indexOf(amountToDelete)
	moneyArr.splice(indexOf, 1)
	toDelete.remove()
	countMoney(moneyArr)
}

const deleteAllTransactions = () => {
	incomeSection.innerHTML = '<h3>Przychod</h3>'
	expensesSection.innerHTML = '<h3>Wydatki</h3>'
	moneyArr = [0]
	countMoney(moneyArr)
}

const lightMode = () => {
	root.style.setProperty('--first-color', '#F9F9F9')
	root.style.setProperty('--second-color', '#14161F')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}

const darkMode = () => {
	root.style.setProperty('--first-color', '#14161F')
	root.style.setProperty('--second-color', '#F9f9f9')
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)')
}

addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
deleteAllBtn.addEventListener('click', deleteAllTransactions)
btnLight.addEventListener('click', lightMode)
btnDark.addEventListener('click', darkMode)
