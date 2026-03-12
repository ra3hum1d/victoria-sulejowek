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





const filter = document.querySelector('.blur-filter');
const menuToggles = document.querySelectorAll('.has-dropdown .link-wrapper');

menuToggles.forEach(item => {
    item.addEventListener('click', (e) => {

        e.preventDefault();

        const parent = item.parentElement;
        const isActive = parent.classList.contains('active');

        // закрываем все меню
        document.querySelectorAll('.has-dropdown').forEach(el => {
            el.classList.remove('active');
        });

        // если текущее не было открыто — открываем его
        if (!isActive) {
            parent.classList.add('active');
        }

        const anyActive = document.querySelector('.has-dropdown.active');

        if (anyActive) {

            filter.classList.add('show');
            document.documentElement.style.overflow = 'hidden';

        } else {

            filter.classList.remove('show');
            document.documentElement.style.overflow = '';

        }

    });
});

// закрытие по клику на фон
filter.addEventListener('click', () => {

    document.querySelectorAll('.has-dropdown').forEach(el =>
        el.classList.remove('active')
    );

    filter.classList.remove('show');
    document.documentElement.style.overflow = '';

});































async function loadSponsors() {
    const grids = {
        main: document.getElementById('grid-sponsors'),
        tech: document.getElementById('grid-technical'),
        media: document.getElementById('grid-media')
    };

    if (!grids.main) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/sponsorzy?_embed&per_page=50');
        const sponsors = await response.json();

        let htmlMain = '';
        let htmlTech = '';
        let htmlMedia = '';

        sponsors.forEach(sponsor => {
            const imageUrl = sponsor._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            if (!imageUrl) return;

            // Беремо назву з WordPress (Tytuł)
            const title = (sponsor.title.rendered || "").toLowerCase();
            const slug = (sponsor.slug || "").toLowerCase();

            // 1. ПЕРЕВІРКА НА ГЕРБ (HERB) - великий по центру
            const isEagle = title.includes('herb') || slug.includes('herb');
            
            const itemHtml = `
                <div class="sponsor-item ${isEagle ? 'large-eagle' : ''}">
                    <img src="${imageUrl}" alt="${sponsor.title.rendered}">
                </div>
            `;

            // 2. РОЗПОДІЛ ЗА НАЗВАМИ З ВАШОГО WORDPRESS
            if (slug.includes('r-gol') || title.includes('r-gol')) {
                htmlTech += itemHtml;
            } 
            // Виправляємо на "u-sport" згідно з вашим скріншотом
            else if (slug.includes('u-sport') || title.includes('u-sport')) {
                htmlMedia += itemHtml;
            } 
            else {
                htmlMain += htmlMain.includes(itemHtml) ? '' : itemHtml;
            }
        });

        grids.main.innerHTML = htmlMain;
        grids.tech.innerHTML = htmlTech;
        grids.media.innerHTML = htmlMedia;

    } catch (e) {
        console.error('Помилка завантаження:', e);
    }
}
window.addEventListener('DOMContentLoaded', loadSponsors);