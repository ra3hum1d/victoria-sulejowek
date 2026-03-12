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


















async function loadUpcomingMatch() {
    const container = document.getElementById('upcoming-match-content');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/terminarz/15927?v=' + Math.random());
        const data = await response.json();

        if (data) {
            let htmlContent = '';

            // Виводимо заголовок (Назви команд)
            if (data.title && data.title.rendered) {
                htmlContent += `<h3 class="match-teams">${data.title.rendered}</h3>`;
            }

            // Виводимо контент (Дата та час)
            if (data.content && data.content.rendered) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.content.rendered;
                
                // Очищаємо стилі дати
                tempDiv.querySelectorAll('p').forEach(p => p.removeAttribute('style'));
                htmlContent += `<div class="match-details">${tempDiv.innerHTML}</div>`;
            }

            container.innerHTML = htmlContent;
        }
    } catch (e) {
        console.error('Błąd ładowania meczu:', e);
    }
}


window.addEventListener('load', () => {
    loadUpcomingMatch();
}); 































































async function loadSecondTeamTerminarz() {
    const container = document.getElementById('second-team-terminarz-content');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/druga_druzyna/146?v=' + Math.random());
        const data = await response.json();

        if (data && data.content && data.content.rendered) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.content.rendered;

            // Очищуємо стилі для списків та тексту
            tempDiv.querySelectorAll('li, p, ul').forEach(el => {
                el.removeAttribute('style');
                el.classList.add('in-construction-text');
            });

            container.innerHTML = tempDiv.innerHTML;
        }
    } catch (e) {
        console.error('Błąd ładowania terminarza 146:', e);
    }
}


window.addEventListener('load', () => {
    loadSecondTeamTerminarz();
}); 