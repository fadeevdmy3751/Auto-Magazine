const menu = document.querySelector('.menu')
const burger = document.querySelector('.header__burger')
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('menu_hidden')
})

const galImages = document.querySelectorAll('.gallery__image')
const galButtons = document.querySelectorAll('.gallery__button')
const prevGal = galButtons[0]
const nextGal = galButtons[1]
let currentImg = 0

function changeImg(images, next) {
  const newImg = (currentImg+next+images.length) % images.length
  images[currentImg].style.display = 'none'
  images[newImg].style.display = 'block'
  currentImg = newImg
}

prevGal.addEventListener('click', ()=>changeImg(galImages, -1))
nextGal.addEventListener('click', ()=>changeImg(galImages, +1))

const template = document.querySelector('#template').content
const radioTemplate = template.querySelector('#press__radio-template')
const pressArticles = document.querySelectorAll('.press__article')
const pressNav = document.querySelector('.press__nav')

// создание списка радиокнопок по числу статей, динамически
// 1 (0) - checked
pressArticles.forEach((el, num) => {
  const newRadio = radioTemplate.cloneNode(1)
  const newInput = newRadio.querySelector('input')
  const newLabel = newRadio.querySelector('label')
  newInput.id += num
  newInput.value = num
  if (num == 0) newInput.checked = true
  newLabel.htmlFor = newInput.id
  pressNav.append(newInput, newLabel)
})

const pressRadios = document.querySelectorAll('.press__radio')
let currentArticle = 0
const pressButton = document.querySelector('.press__button')

function updatePress(){
  const checkedRadio =  +[...pressRadios].filter(el=>el.checked)[0].value
  if (checkedRadio == currentArticle) return
  pressArticles[currentArticle].style.display = 'none'
  currentArticle = checkedRadio
  pressArticles[currentArticle].style.display = 'block'
  // update ссылки на кнопке
  if ("link" in pressArticles[currentArticle].dataset)
    pressButton.href = pressArticles[currentArticle].dataset.link
  else pressButton.href = '#'
}

// проверяет что все поля заполнены верно и меняет кнопку в зависимости от этого
function checkForm() {
  const formFields = document.querySelector('.subscr-form').querySelectorAll('input')
  const submitBtn = document.querySelector('.subscr-form').querySelector('.subscr-form__submit')
  const validFields =  document.querySelector('.subscr-form').querySelectorAll('input:valid')
  if (formFields.length == validFields.length){
    submitBtn.innerHTML = 'Готово!'
  } else {
    submitBtn.innerHTML = 'подписка'
  }
}

function subscript(e) {
  // так и сохраним встроенные предупреждения о незаполненных формах, и добавим свой обработчик
  if (e.target.innerHTML == 'Готово!') {
    e.preventDefault();
    alert('Вы подписаны!');
  }
}
