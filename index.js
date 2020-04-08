const addDrinkBtn = document.querySelector('[data-alpha-pos = "add-drink"]')
const orderList = document.querySelector('[data-order-list]')
const checkOutBtn = document.querySelector('[data-alpha-pos="checkout"]')
let allDrinksOptions = document.querySelectorAll('input[name = "drink"]')


function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

function AlphaPos() { }
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `

  orderList.insertAdjacentHTML('afterbegin', orderListsCard)
}

AlphaPos.prototype.deletDrink = function (target) {
  target.remove()
}

AlphaPos.prototype.checkOut = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  alert(` Total amount is  ${totalAmount}`)
}

AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}


Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

addDrinkBtn.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const alphaPos = new AlphaPos()
  const drinkName = alphaPos.getCheckedValue('drink')
  const sugar = alphaPos.getCheckedValue('sugar')
  const ice = alphaPos.getCheckedValue('ice')
  console.log(drinkName, sugar, ice)
  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('請選擇你的飲料')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

orderList.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  console.log(event.target.parentElement.parentElement.parentElement)
  const alphaPos = new AlphaPos()
  alphaPos.deletDrink(event.target.parentElement.parentElement.parentElement)
})

checkOutBtn.addEventListener('click', function (event) {
  const alphaPos = new AlphaPos()
  alphaPos.checkOut()
  alphaPos.clearOrder(orderList)
})
