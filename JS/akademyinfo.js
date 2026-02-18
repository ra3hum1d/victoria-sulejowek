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

























async function loadTeamSquad() {
    const container = document.getElementById('team-content');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/pierwsza_druzyna/54?v=' + Math.random());
        const data = await response.json();

        if (data && data.content && data.content.rendered) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.content.rendered;

            tempDiv.querySelectorAll('img').forEach(img => {
                img.classList.add('team-photo');
            });

            tempDiv.querySelectorAll('strong').forEach(strong => {
                strong.parentElement.classList.add('position-header');
            });

            tempDiv.querySelectorAll('p').forEach(p => {
                if (!p.querySelector('img') && !p.querySelector('strong')) {
                    p.classList.add('player-name');
                }
            });

            container.innerHTML = tempDiv.innerHTML;
            container.classList.add('squad-loaded');
        }
    } catch (e) {
        console.error('Błąd:', e);
    }
}


window.addEventListener('load', () => {
    loadTeamSquad();
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


















async function loadSecondTeamSquad() {
    const container = document.getElementById('second-team-content');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/druga_druzyna/143?v=' + Math.random());
        const data = await response.json();

        if (data && data.content && data.content.rendered) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.content.rendered;

            // Добавляем классы игрокам
            tempDiv.querySelectorAll('img').forEach(img => img.classList.add('second-team-photo'));
            tempDiv.querySelectorAll('strong').forEach(strong => strong.parentElement.classList.add('second-position-header'));
            tempDiv.querySelectorAll('p').forEach(p => {
                if (!p.querySelector('img') && !p.querySelector('strong')) p.classList.add('second-player-name');
            });

            container.innerHTML = tempDiv.innerHTML;
        }
    } catch (e) { console.error('Błąd (2nd Squad):', e); }
}


window.addEventListener('load', () => {
    loadSecondTeamSquad();
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















async function loadInformacjeOAkademii() {
    const container = document.getElementById('akademia-info-content');
    if (!container) return;

    try {
        // Отримуємо дані для запису ID 158 (Informacje o Akademii)
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia/158?v=' + Math.random());
        const data = await response.json();

        if (data && data.content) {
            // Очищення від інлайнових стилів (Georgia тощо)
            const cleanContent = data.content.rendered.replace(/style="[^"]*"/g, "");

            container.innerHTML = `
                <div class="akademia-info-card">
                    <h2 class="akademia-main-title">${data.title.rendered}</h2>
                    <div class="akademia-text-container">
                        ${cleanContent}
                    </div>
                </div>
            `;

            // Додаємо класи до всіх тегів всередині отриманого контенту
            const textContainer = container.querySelector('.akademia-text-container');
            
            textContainer.querySelectorAll('p').forEach(p => {
                p.classList.add('akademia-info-paragraph');
            });

            textContainer.querySelectorAll('h1, h2, h3').forEach(header => {
                header.classList.add('akademia-info-subtitle');
            });
        }
    } catch (e) {
        console.error('Błąd ładowania informacji o akademii:', e);
    }
}


window.addEventListener('load', () => {
    loadInformacjeOAkademii();
}); 