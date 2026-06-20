// Grab elements from the page
const newsContainer = document.getElementById('news-container');
const loadingBox = document.getElementById('loading');
const errorBox = document.getElementById('error-msg');
const errorText = document.getElementById('error-text');
const mainTitle = document.getElementById('main-title');

// A placeholder image if a news article doesn't have one
const fallbackImg = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

// Show loading state
function showLoading() {
    newsContainer.innerHTML = '';
    loadingBox.classList.remove('hidden');
    errorBox.classList.add('hidden');
}

// Show error state
function showError(message) {
    loadingBox.classList.add('hidden');
    errorBox.classList.remove('hidden');
    errorText.textContent = message || "Failed to load the news. Check your internet or API key.";
}

// Draw the news cards on the screen
function renderNewsCards(articles) {
    loadingBox.classList.add('hidden');

    if (!articles || articles.length === 0) {
        showError("No news found for this search. Try something else!");
        return;
    }

    // Loop through the articles and create HTML for each one
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        
        // Skip removed articles
        if (article.title === '[Removed]') continue;

        let card = document.createElement('a');
        card.className = 'news-card';
        card.href = article.url;
        card.target = '_blank';

        let imgUrl = article.urlToImage || fallbackImg;
        let dateObj = new Date(article.publishedAt);
        let formattedDate = dateObj.toLocaleDateString();

        card.innerHTML = `
            <img src="${imgUrl}" alt="News Image" class="news-img" onerror="this.src='${fallbackImg}'">
            <div class="news-info">
                <div class="news-source">${article.source.name || 'News Source'}</div>
                <div class="news-title">${article.title}</div>
                <div class="news-desc">${article.description || 'Click to read more...'}</div>
                <div class="news-date">${formattedDate}</div>
            </div>
        `;

        newsContainer.appendChild(card);
    }
}
