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














// -----------------------------U-7-----------------------------

async function loadU7GroupInfo() {
    const container = document.getElementById('u7-content-data');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u12_u7/167');
        
        if (!response.ok) throw new Error('Błąd serwera');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered.replace(/style="[^"]*"/g, "");

            htmlContent = htmlContent.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <article class="u7-card">
                    <h2 class="u7-main-title">${data.title.rendered}</h2>
                    <div class="u7-entry-text">
                        ${htmlContent}
                    </div>
                </article>
            `;

            const entryText = container.querySelector('.u7-entry-text');

            entryText.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');
                
                let currentSrc = img.getAttribute('src');
                if (currentSrc) {
                    img.setAttribute('src', currentSrc.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }

                img.classList.add('u7-team-photo');
            });

            entryText.querySelectorAll('p').forEach(p => {
                p.classList.add('u7-paragraph');
            });
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p>Przepraszamy, nie udało się załadować informacji.</p>';
    }
}


window.addEventListener('load', () => {
    loadU7GroupInfo();
}); 










// -----------------u-8-------------//


async function loadU8GroupData() {
    const container = document.getElementById('u8-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u12_u7/166');
        
        if (!response.ok) throw new Error('Nie udało się pobrać danych');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered.replace(/style="[^"]*"/g, "");

            htmlContent = htmlContent.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-card">
                    <h2 class="academy-card-title">${data.title.rendered}</h2>
                    <div class="academy-card-body">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const body = container.querySelector('.academy-card-body');
            
            body.querySelectorAll('img').forEach(img => {
                img.classList.add('academy-team-photo');
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');
                
                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
            });

            body.querySelectorAll('p').forEach(p => p.classList.add('academy-text'));
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p>Błąd ładowania danych grupy U-8.</p>';
    }
}


window.addEventListener('load', () => {
    loadU8GroupData();
}); 

















// -----------------u-9----------------//

async function loadGroup171() {
    const container = document.getElementById('group-u9-171');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u12_u7/171');
        
        if (!response.ok) throw new Error('Nie znaleziono wpisu');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered.replace(/style="[^"]*"/g, "");

            htmlContent = htmlContent.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-u9-card">
                    <h2 class="academy-u9-title">${data.title.rendered}</h2>
                    <div class="academy-u9-content">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const content = container.querySelector('.academy-u9-content');

            content.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');

                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }

                img.classList.add('u9-img');
            });

            content.querySelectorAll('p').forEach(p => p.classList.add('u9-text'));
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p>Błąd ładowania danych grupy U-9.</p>';
    }
}


window.addEventListener('load', () => {
    loadGroup171();
}); 





// --------------u-10--------------- //

async function loadHighQualityU10() {
    const container = document.getElementById('u10-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u12_u7/170');
        const data = await response.json();

        if (data && data.content) {
            let html = data.content.rendered;
            
            html = html.replace(/style="[^"]*"/g, "");
            html = html.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="u10-card">
                    <h2 class="u10-title">${data.title.rendered}</h2>
                    <div class="u10-body">${html}</div>
                </div>
            `;

            const body = container.querySelector('.u10-body');

            body.querySelectorAll('p').forEach(p => p.classList.add('u10-text'));
            body.querySelectorAll('ul').forEach(ul => ul.classList.add('u10-list'));
            body.querySelectorAll('li').forEach(li => li.classList.add('u10-list-item'));
            body.querySelectorAll('strong').forEach(b => b.classList.add('u10-bold'));
            body.querySelectorAll('a').forEach(a => a.classList.add('u10-link'));

            body.querySelectorAll('img').forEach(img => {
                img.classList.add('u10-photo-sharp');
                img.removeAttribute('width');
                img.removeAttribute('height');
                img.removeAttribute('srcset'); 
                img.removeAttribute('sizes');
                
                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
            });
        }
    } catch (error) {
        console.error('Błąd:', error);
    }
}


window.addEventListener('load', () => {
    loadHighQualityU10();
});



// ------------u-11--------------- //

async function loadU11GroupData() {
    const container = document.getElementById('u11-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u12_u7/169');
        
        if (!response.ok) throw new Error('Błąd pobierania danych');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered.replace(/style="[^"]*"/g, "");

            htmlContent = htmlContent.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-u11-card">
                    <h2 class="academy-u11-title">${data.title.rendered}</h2>
                    <div class="academy-u11-body">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const body = container.querySelector('.academy-u11-body');

            body.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');

                let currentSrc = img.getAttribute('src');
                if (currentSrc) {
                    img.setAttribute('src', currentSrc.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }

                img.classList.add('u11-team-img');
            });

            body.querySelectorAll('p').forEach(p => p.classList.add('u11-description'));
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p>Błąd ładowania danych grupy U-11.</p>';
    }
}


window.addEventListener('load', () => {
    loadU11GroupData();
});









// ----------------u-12------------- //

async function loadHighQualityU12() {
    const container = document.getElementById('u12-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u12_u7/168');
        const data = await response.json();

        if (data && data.content) {
            let html = data.content.rendered;
            
            html = html.replace(/style="[^"]*"/g, "");
            html = html.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="u12-card">
                    <h2 class="u12-title">${data.title.rendered}</h2>
                    <div class="u12-content-body">${html}</div>
                </div>
            `;

            const body = container.querySelector('.u12-content-body');

            body.querySelectorAll('p').forEach(p => p.classList.add('u12-text-p'));
            body.querySelectorAll('strong').forEach(b => b.classList.add('u12-accent'));
            body.querySelectorAll('ul').forEach(ul => ul.classList.add('u12-list-group'));
            body.querySelectorAll('li').forEach(li => li.classList.add('u12-list-item'));
            body.querySelectorAll('a').forEach(a => a.classList.add('u12-link'));

            body.querySelectorAll('img').forEach(img => {
                img.classList.add('u12-photo-full');
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');
                
                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
            });
        }
    } catch (error) {
        console.error('Błąd U-12:', error);
        container.innerHTML = '<p>Błąd ładowania danych grupy U-12.</p>';
    }
}
window.addEventListener('load', () => {
    loadHighQualityU12()
}); 











// --------------u-13---------- //

async function loadU13GroupData() {
    const container = document.getElementById('u13-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u19_u13/161');
        
        if (!response.ok) throw new Error('Błąd pobierania danych');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered.replace(/style="[^"]*"/g, "");
            htmlContent = htmlContent.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-u13-card">
                    <h2 class="academy-u13-title">${data.title.rendered}</h2>
                    <div class="academy-u13-body">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const body = container.querySelector('.academy-u13-body');

            body.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');

                let currentSrc = img.getAttribute('src');
                if (currentSrc) {
                    img.setAttribute('src', currentSrc.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
                img.classList.add('u13-team-img');
            });

            body.querySelectorAll('p').forEach(p => p.classList.add('u13-description'));
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p>Błąd ładowania danych grupy U-13.</p>';
    }
}


window.addEventListener('load', () => {
    loadU13GroupData();
}); 








// -------------u-14--------- //




async function loadU14GroupData() {
    const container = document.getElementById('u14-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u19_u13/16725');
        
        if (!response.ok) throw new Error('Błąd pobierania danych');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered
                .replace(/style="[^"]*"/g, "")
                .replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-u14-card">
                    <h2 class="academy-u14-title">${data.title.rendered}</h2>
                    <div class="academy-u14-body">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const body = container.querySelector('.academy-u14-body');

            body.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');
                img.classList.add('u14-team-img');

                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
            });

            body.querySelectorAll('p').forEach(p => p.classList.add('u14-description'));
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p class="u14-status">Błąd ładowania данных группы U-14.</p>';
    }
}


window.addEventListener('load', () => {
    loadU14GroupData();
}); 










// -------------------u-15---------------- //

async function loadU15GroupData() {
    const container = document.getElementById('u15-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u19_u13/13201');
        
        if (!response.ok) throw new Error('Błąd pobierania danych');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered
                .replace(/style="[^"]*"/g, "")
                .replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-u15-card">
                    <h2 class="academy-u15-title">${data.title.rendered}</h2>
                    <div class="academy-u15-body">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const body = container.querySelector('.academy-u15-body');

            body.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');
                img.classList.add('u15-team-img');

                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
            });

            body.querySelectorAll('p').forEach(p => p.classList.add('u15-description'));
        }
    } catch (error) {
        console.error('Błąd:', error);
        container.innerHTML = '<p class="u15-status">Błąd ładowania danych grupy U-15.</p>';
    }
}


window.addEventListener('load', () => {
    loadU15GroupData();
}); 


// -----------------u-17---------------- //

async function loadU17GroupData() {
    const container = document.getElementById('u17-group-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.victoriasulejowek.pl/wp-json/wp/v2/akademia_u19_u13/164');
        
        if (!response.ok) throw new Error('Błąd pobierania данных');
        
        const data = await response.json();

        if (data && data.content) {
            let htmlContent = data.content.rendered
                .replace(/style="[^"]*"/g, "")
                .replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3');

            container.innerHTML = `
                <div class="academy-u17-card">
                    <h2 class="academy-u17-title">${data.title.rendered}</h2>
                    <div class="academy-u17-body">
                        ${htmlContent}
                    </div>
                </div>
            `;

            const body = container.querySelector('.academy-u17-body');

            body.querySelectorAll('img').forEach(img => {
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.removeAttribute('width');
                img.removeAttribute('height');
                img.classList.add('u17-team-img');

                let src = img.getAttribute('src');
                if (src) {
                    img.setAttribute('src', src.replace(/-(\d+)x(\d+)\.(jpg|jpeg|png|webp)/g, '.$3'));
                }
            });

            body.querySelectorAll('p').forEach(p => p.classList.add('u17-description'));
        }
    } catch (error) {
        console.error('Ошибка:', error);
        container.innerHTML = '<p class="u17-status">Błąd ładowania danych grupy U-17.</p>';
    }
}


window.addEventListener('load', () => {
    loadU17GroupData();
}); 