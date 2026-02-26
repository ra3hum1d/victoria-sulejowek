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












// async function initVerticalSponsorSlider() {
//     const wrapper = document.getElementById('sponsor-list');
    
//     try {
//         // Загружаем данные из вашего WordPress
//         const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/sponsorzy?_embed');
//         if (!response.ok) return;

//         const sponsors = await response.json();
//         if (sponsors.length === 0) return;

//         wrapper.innerHTML = ''; 

//         sponsors.forEach(sponsor => {
//             let imgUrl = '';
//             // Проверка наличия картинки в Featured Media
//             if (sponsor._embedded && sponsor._embedded['wp:featuredmedia']) {
//                 imgUrl = sponsor._embedded['wp:featuredmedia'][0].source_url;
//             }

//             if (imgUrl) {
//                 wrapper.innerHTML += `
//                     <div class="swiper-slide">
//                         <img src="${imgUrl}" alt="${sponsor.title.rendered}">
//                     </div>`;
//             }
//         });

//         // Инициализация Swiper: строго по одному слайду
//         new Swiper('.mySponsorSwiper', {
//             direction: 'vertical',
//             loop: true,
//             speed: 1000, // Скорость анимации переключения (1 сек)
//             autoplay: {
//                 delay: 2000, // Каждый логотип виден по 3 секунды
//                 disableOnInteraction: false,
//             },
//             slidesPerView: 1, // ВСЕГДА ТОЛЬКО ОДИН
//             spaceBetween: 0,
//             allowTouchMove: false
//         });

//     } catch (error) {
//         console.error('Ошибка загрузки спонсоров:', error);
//     }
// }

// // Запускаем после загрузки окна
// window.addEventListener('load', initVerticalSponsorSlider);

/**
 * 1. FUNKCJE POMOCNICZE
 */
function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/**
 * 2. SLIDER SPONSORÓW
 */
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

/**
 * 3. NAZWA MECZU (Drużyny)
 */
async function loadNextMatchContent() {
    const container = document.getElementById('next-match-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/nast_pny_mecz/17460');
        if (!response.ok) throw new Error('Błąd API');
        
        const data = await response.json();

        if (data && data.content && data.content.rendered) {
            let matchText = data.content.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim();

            container.innerHTML = `
                <div class="match-info-box">
                    <p class="match-details">${matchText}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '';
    }
}


window.addEventListener('load', () => {
    loadNextMatchContent();
}); 

/**
 * 4. MIEJSCE I CZAS (Lokalizacja)
 */
async function loadMatchLocation() {
    const locationElement = document.getElementById('match-location');
    if (!locationElement) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/nast_pny_mecz?per_page=1&v=' + Math.random());
        const data = await response.json();

        if (data && data.length > 0) {
            const rawContent = data[0].content.rendered;
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = rawContent;
            
            const cleanText = (tempDiv.innerText || tempDiv.textContent || "").trim();

            setTimeout(() => {
                if (cleanText.length > 0) {
                    // ТЕПЕРЬ ТУТ НЕТ ВСТРОЕННЫХ СТИЛЕЙ
                    locationElement.innerHTML = `<span>${cleanText}</span>`;
                } else {
                    locationElement.innerText = "Miejsce i czas zostaną podane wkrótce";
                }
            }, 800); 
        }
    } catch (e) { 
        console.error('Błąd ładowania lokalizacji:', e); 
        locationElement.innerText = "Błąd danych";
    }
}


























async function loadJuniorMatchContent() {
    const container = document.getElementById('next-match-container-junior');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/terminarz/9637');
        if (!response.ok) throw new Error('Błąd API');
        
        const data = await response.json();

        if (data && data.content && data.content.rendered) {
            let matchText = data.content.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim();

            container.innerHTML = `
                <div class="junior-v2-box">
                    <p class="junior-v2-text">${matchText}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '';
    }
}


window.addEventListener('load', () => {
    loadJuniorMatchContent();
}); 




















async function loadJuniorMatchPip() {
    const container = document.getElementById('junior-match-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/terminarz/15927');
        if (!response.ok) throw new Error('Błąd API');
        
        const data = await response.json();

        if (data && data.content && data.content.rendered) {
            let matchText = data.content.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim();

            container.innerHTML = `
                <div class="junior-v2-box">
                    <p class="junior-v2-text">${matchText}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '';
    }
}


window.addEventListener('load', () => {
    loadJuniorMatchPip();
}); 



















































/**
 * 5. SKRYPTY NAGŁÓWKA I WIDEO
 */
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) header.classList.add('header-scrolled');
            else header.classList.remove('header-scrolled');
        });
    }

    const btn = document.querySelector('.play-video-button');
    const box = document.querySelector('.video-cont');
    if (btn && box) {
        btn.addEventListener('click', () => {
            box.innerHTML = `<iframe width="100%" height="944px" src="https://www.youtube.com/embed/z8gu9TthcAQ?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        });
    }

    loadNextMatchTitle();
});

window.addEventListener('load', () => {
    initVerticalSponsorSlider();
    loadMatchLocation();
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



























































let currentPage = 1;
const perPage = 6;

// Функція для перемикання тексту
window.toggleExpand = function(btn, index) {
    const textContainer = document.getElementById(`text-${index}`);
    const isExpanded = textContainer.classList.contains('expanded');
    
    if (isExpanded) {
        textContainer.classList.remove('expanded');
        btn.innerText = 'Czytaj więcej';
    } else {
        textContainer.classList.add('expanded');
        btn.innerText = 'Zwiń'; // Текст кнопки після розгортання
    }
};

async function loadMainNews(page = 1) {
    const container = document.getElementById('news-list-container');
    if (!container) return;
    
    container.innerHTML = '<div style="padding:40px; text-align:center;">Ładowanie...</div>';

    try {
        const response = await fetch(`https://www.victoriasulejowek.pl/wp-json/wp/v2/aktualnosci_glowan?page=${page}&per_page=${perPage}&_embed`);
        const posts = await response.json();
        const totalPages = response.headers.get('X-WP-TotalPages') || 1;
        
        container.innerHTML = ''; 

        posts.forEach((post, index) => {
            const title = post.title?.rendered || "Brak tytułu";
            const fullContent = post.content?.rendered || "Brak treści";
            
            let imgUrl = 'https://via.placeholder.com/240x180?text=Victoria';
            if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                imgUrl = post._embedded['wp:featuredmedia'][0].source_url;
            }

            container.innerHTML += `
                <div class="news-card-v2">
                    <div class="news-img-wrapper">
                        <img src="${imgUrl}" alt="${title}">
                    </div>
                    <div class="news-content-col">
                        <h2 class="news-title-v2">${title}</h2>
                        <div id="text-${index}" class="news-text-container">
                            ${fullContent}
                        </div>
                        <button class="read-more-btn" onclick="toggleExpand(this, ${index})">
                            Czytaj więcej
                        </button>
                    </div>
                </div>
            `;
        });

        document.getElementById('page-info').innerText = `Strona ${page} z ${totalPages}`;
        document.getElementById('prev-page').disabled = (page <= 1);
        document.getElementById('next-page').disabled = (page >= totalPages);
        
    } catch (error) {
        container.innerHTML = '<div>Błąd ładowania.</div>';
    }
}

// Пагінація
// Пагінація з розумним скролом
document.getElementById('prev-page')?.addEventListener('click', () => { 
    if (currentPage > 1) { 
        currentPage--; 
        loadMainNews(currentPage); 
        // Скрол до контейнера новин
        document.getElementById('news-list-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } 
});

document.getElementById('next-page')?.addEventListener('click', () => { 
    currentPage++; 
    loadMainNews(currentPage); 
    // Скрол до контейнера новин
    document.getElementById('news-list-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

loadMainNews(currentPage);