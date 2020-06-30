var indicators = [], sections = []

function initAnimation() {
  contentContainer = document.getElementById('content');
  indicators = [ ...document.querySelectorAll('.indicator') ].map((item, index) => ({
    element: item,
    lineElement: item.querySelector('.line'),
    indexElement: item.querySelector('.index span'),
    index,
  }));

  Marquee3k.init()

  document.addEventListener('scroll', onDocumentScroll)
}

function updateIndicators(ratio) {
  indicators.forEach(item => {
    let b;
    const indexRatio = item.index / (indicators.length - 1)
    if(item.index === 0) {
      b = (1 - ratio).clamp(0.1, 1)
    } else if (item.index === indicators.length - 1) {
      b = ratio.clamp(0.1, 1)
    } else {
      b = Math.abs(indexRatio - (1 - ratio)).clamp(0.1, 1)
    }

    gsap.to(item.lineElement, {
      scaleX: b,
    })
  })
}

function updateIndexColor(ratio) {
  const l = indicators.length - 1
  const a = ratio * l
  let b = 0

  for (let i = 0; i <= l; i++) {
    if(a === l || (a + 0.02).isBetween(i, i+1, true)) {
      b = i
    } else {
      gsap.to(indicators[i].indexElement, {
          color: '#fff',
      })
    }
  }

  gsap.to(indicators[b].indexElement, {
    color: '#2d00f7',
  })
}

function changeBgColor() {
  const bg = document.getElementById('bg')

  if(scrollY >= window.innerHeight * 2) {
    gsap.to(bg, {
      opacity: 0
    })
  } else {
    gsap.to(bg, {
      opacity: 1
    })
  }
}


function onDocumentScroll(event) {
  const ratio = scrollY / (contentContainer.scrollHeight - window.innerHeight)
  updateIndicators(ratio)
  updateIndexColor(ratio)
}

initAnimation()

window.addEventListener('load', initAnimation)
// window.addEventListener('scroll', changeBgColor)
