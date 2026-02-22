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







async function loadManagement() {
    const container = document.getElementById('management-content');
    if (!container) return;

    try {
        // Запит до API для отримання даних типу 'klub'
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/klub/151?v=' + Math.random());
        const data = await response.json();

        if (data && data.content) {
            // Очищуємо контент від зайвих стилів редактора WordPress
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.content.rendered;
            
            // Видаляємо всі інлайнові стилі (колір, шрифти), щоб текст підкорявся вашому CSS
            tempDiv.querySelectorAll('*').forEach(el => el.removeAttribute('style'));

            container.innerHTML = `
                <div class="management-card">
                    <h2 class="management-title">${data.title.rendered}</h2>
                    <div class="management-details">
                        ${tempDiv.innerHTML}
                    </div>
                </div>
            `;
        }
    } catch (e) {
        console.error('Błąd ładowania władz klubu:', e);
        container.innerHTML = '<p>Błąd podczas pobierania danych.</p>';
    }
}


window.addEventListener('load', () => {
    loadManagement();
}); 





































