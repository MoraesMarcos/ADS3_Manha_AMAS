// Refatoracao do arquivo javaBlog.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newNewsForm');
    const newsDiv = document.getElementById('news');

    form.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();

        const title = getInputValue('newsTitle');
        const link = getInputValue('newsLink');
        const image = getInputValue('newsImage');

        if (validateInputs(title, link, image)) {
            const newsItem = createNewsItem(title, link, image);
            newsDiv.appendChild(newsItem);
            form.reset();
            showSuccessMessage('Notícia adicionada com sucesso!');
            saveToLocalStorage(title, link, image);
        } else {
            showErrorMessage('Por favor, preencha todos os campos corretamente.');
        }
    }

    function getInputValue(id) {
        return document.getElementById(id).value.trim();
    }

    function validateInputs(title, link, image) {
        return title && link && image;
    }

    function createNewsItem(title, link, image) {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const newsLink = document.createElement('a');
        newsLink.href = link;
        newsLink.target = '_blank';
        newsLink.rel = 'noopener noreferrer';

        const newsImage = document.createElement('img');
        newsImage.src = image;
        newsImage.alt = `Imagem relacionada a ${title}`;

        const newsTitle = document.createElement('h4');
        newsTitle.textContent = title;

        newsLink.append(newsImage, newsTitle);
        newsItem.appendChild(newsLink);

        return newsItem;
    }

    function showSuccessMessage(message) {
        alert(message); // Pode ser melhorado usando modais ou toasts
    }

    function showErrorMessage(message) {
        alert(message); // Pode ser melhorado usando modais ou toasts
    }

    function saveToLocalStorage(title, link, image) {
        const existingNews = JSON.parse(localStorage.getItem('newsItems')) || [];
        existingNews.push({ title, link, image });
        localStorage.setItem('newsItems', JSON.stringify(existingNews));
    }

    // Opcional: carregar posts anteriores do localStorage ao carregar a página
    function loadNewsFromLocalStorage() {
        const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
        newsItems.forEach(({ title, link, image }) => {
            const newsItem = createNewsItem(title, link, image);
            newsDiv.appendChild(newsItem);
        });
    }

    loadNewsFromLocalStorage();
});
