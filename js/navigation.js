function scrollTo(id) {
  console.log("called")
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" })
}

function initNavigation() {
  // arm scrollTo on click for buttons with "data-to" attribute
  [...document.querySelectorAll('button')].forEach(item => {
    if(item.dataset.to) {
      item.addEventListener('click', () => scrollTo(item.dataset.to))
    }
  })
}

let scrollTimer = null;
let disableScrollEvent = false;

function stickyScroll() {
    const index = Math.round(scrollY / window.innerHeight)
    console.log(index)
    disableScrollEvent = true;
    scrollTo(`s${index + 1}`)
    setTimeout(() => {
      disableScrollEvent = false
    }, 500)
}

initNavigation()

window.addEventListener('scroll', function() {
    if(scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    if(!disableScrollEvent) {
      scrollTimer = setTimeout(stickyScroll, 500);
    }
}, false);
