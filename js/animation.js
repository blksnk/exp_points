var indicators = [], sections = []

function initAnimation() {
  contentContainer = document.getElementById('content');
  indicators = [ ...document.querySelectorAll('.indicator') ].map((item, index) => ({
    element: item,
    line: item.querySelector('.line'),
    index,
  }));

  document.addEventListener('scroll', onDocumentScroll)
}

function updateIndicators(ratio) {
  const a = ratio * (indicators.length - 1)


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

    console.log('index:', item.index, 'b:', b)
    gsap.to(item.line, {
      scaleX: b,
    })
  })

  console.log('--------------------------------------')
}


function onDocumentScroll(event) {
  const ratio = scrollY / (contentContainer.scrollHeight - window.innerHeight)
  updateIndicators(ratio)
}

initAnimation()

window.addEventListener('load', initAnimation)
