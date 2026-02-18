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














async function initVerticalSponsorSlider() {
    const wrapper = document.getElementById('sponsor-list');
    if (!wrapper) return;
    
    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/sponsorzy?_embed');
        if (!response.ok) return;

        const sponsors = await response.json();
        wrapper.innerHTML = ''; 

        sponsors.forEach(sponsor => {
            let imgUrl = '';
            if (sponsor._embedded && sponsor._embedded['wp:featuredmedia']) {
                imgUrl = sponsor._embedded['wp:featuredmedia'][0].source_url;
            }
            if (imgUrl) {
                wrapper.innerHTML += `
                    <div class="swiper-slide">
                        <img src="${imgUrl}" alt="${sponsor.title.rendered}">
                    </div>`;
            }
        });

        new Swiper('.mySponsorSwiper', {
            direction: 'vertical',
            loop: true,
            speed: 1000,
            autoplay: { delay: 2000, disableOnInteraction: false },
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: false
        });
    } catch (e) { 
        console.error('Błąd ładowania sponsorów:', e); 
    }
}

window.addEventListener('load', () => {
    initVerticalSponsorSlider();
});





// Знаходимо сам фільтр (додаємо крапку!)
const filter = document.querySelector('.blur-filter');
// Знаходимо всі кнопки меню
const menuToggles = document.querySelectorAll('.has-dropdown .link-wrapper');

menuToggles.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = item.parentElement;
        
        // Перемикаємо стан активності для пункту меню (стрілочка/хрестик)
        parent.classList.toggle('active');

        // Логіка для фільтра: 
        // Перевіряємо, чи є хоча б одне відкрите меню
        const anyActive = document.querySelector('.has-dropdown.active');
        
        if (anyActive) {
            filter.classList.add('show'); // Показуємо чорний фон
        } else {
            filter.classList.remove('show'); // Ховаємо, якщо все закрито
        }
    });
});

// Додатково: закривати меню при кліку на сам фільтр
filter.addEventListener('click', () => {
    document.querySelectorAll('.has-dropdown').forEach(el => el.classList.remove('active'));
    filter.classList.remove('show');
});































async function loadSponsors() {
    const container = document.getElementById('sponsors-grid');
    if (!container) return;

    try {
        // Додаємо _embed, щоб отримати посилання на зображення разом із даними спонсорів
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/sponsorzy?_embed&per_page=20');
        const sponsors = await response.json();

        let html = '';
        sponsors.forEach(sponsor => {
            // Перевіряємо, чи є у спонсора встановлене головне зображення
            const imageUrl = sponsor._embedded && 
                             sponsor._embedded['wp:featuredmedia'] ? 
                             sponsor._embedded['wp:featuredmedia'][0].source_url : 
                             ''; // Порожньо, якщо картинки немає

            if (imageUrl) {
                html += `
                    <div class="sponsor-item">
                        <img src="${imageUrl}" alt="${sponsor.title.rendered}" title="${sponsor.title.rendered}">
                    </div>
                `;
            }
        });

        container.innerHTML = html;
    } catch (e) {
        console.error('Błąd ładowania sponsorów:', e);
    }
}


window.addEventListener('load', () => {
    loadSponsors();
}); 