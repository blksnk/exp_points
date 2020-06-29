function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" })
}

function initNavigation() {
  // arm scrollTo on click for buttons with "data-to" attribute
  [...document.querySelectorAll('button')].forEach(item => {
    if(item.dataset.to) {
      item.addEventListener('click', () => scrollTo(item.dataset.to))
    }
  })
}

initNavigation()
