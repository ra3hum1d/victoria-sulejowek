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

















