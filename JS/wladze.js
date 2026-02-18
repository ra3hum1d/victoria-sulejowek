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