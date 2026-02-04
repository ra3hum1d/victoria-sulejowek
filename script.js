document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const THRESHOLD = 0; 

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      header.classList.add('header-scrolled');
      // document.body.classList.add('has-fixed-header');
    } else {
      header.classList.remove('header-scrolled');
      // document.body.classList.remove('has-fixed-header');
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll);
});





const box = document.querySelector('.video-cont')
const btn = document.querySelector('.play-video-button')

btn.addEventListener('click',()=>{
  box.innerHTML = `
    <iframe width="100%" height="944px" 
      src="https://www.youtube.com/embed/z8gu9TthcAQ?autoplay=1" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allow="autoplay" 
      allowfullscreen>
    </iframe>
  `
})







const swiperHero = new Swiper('.hero-swiper', {
  loop: true,
  allowTouchMove: false,
  speed: 15000,
  autoplay: { delay: 0, disableOnInteraction: false },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {

      return '<span class="' + className + '"></span>';
    }
  }
});


swiperHero.on('paginationClick', function(swiper, e) {

  const FAST = 900;
  const SLOW = 15000;
  swiper.params.speed = FAST;

  swiper.once('transitionEnd', () => {
    swiper.params.speed = SLOW;
  });
});






