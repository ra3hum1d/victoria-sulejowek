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






































async function loadAkademiaInfo() {
    const container = document.getElementById('akademia-przedszkola-content');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia/157?v=' + Math.random());
        const data = await response.json();

        if (data && data.content) {
            // 1. Видаляємо інлайнові стилі (style="...")
            let cleanContent = data.content.rendered.replace(/style="[^"]*"/g, "");

            container.innerHTML = `
                <div class="akademia-card">
                    <h2 class="akademia-header">${data.title.rendered}</h2>
                    <div class="akademia-body">
                        ${cleanContent}
                    </div>
                </div>
            `;

            // 2. Додаємо класи до створених елементів
            const body = container.querySelector('.akademia-body');
            
            // Додаємо клас до абзаців
            body.querySelectorAll('p').forEach(p => p.classList.add('akademia-text'));
            
            // Додаємо класи до списків, якщо вони є (наприклад, для розкладу чи переваг)
            body.querySelectorAll('ul').forEach(ul => ul.classList.add('akademia-list'));
            body.querySelectorAll('li').forEach(li => li.classList.add('akademia-list-item'));
            
            // Додаємо класи до заголовків всередині тексту, якщо вони є
            body.querySelectorAll('h3').forEach(h3 => h3.classList.add('akademia-subtitle'));

        }
    } catch (e) {
        console.error('Błąd ładowania danych akademii:', e);
    }
}


window.addEventListener('load', () => {
    loadAkademiaInfo();
});