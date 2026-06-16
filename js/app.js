// Grab buttons and inputs
const categoryBtns = document.querySelectorAll('.cat-btn');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchHistoryDropdown = document.getElementById('search-history-dropdown');

// History Logic
let searchHistory = JSON.parse(localStorage.getItem('newsSearchHistory')) || [];

function saveSearch(query) {
    // Remove if already exists to put at the top
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== query.toLowerCase());
    searchHistory.unshift(query);
    if (searchHistory.length > 8) searchHistory.pop(); // Keep only last 8
    localStorage.setItem('newsSearchHistory', JSON.stringify(searchHistory));
}

function renderSearchHistory() {
    if (searchHistory.length === 0) {
        searchHistoryDropdown.classList.add('hidden');
        return;
    }
    
    searchHistoryDropdown.innerHTML = '';
    searchHistory.forEach((term, index) => {
        let item = document.createElement('div');
        item.className = 'search-history-item';
        
        let termSpan = document.createElement('span');
        termSpan.className = 'history-term';
        termSpan.textContent = term;
        termSpan.onclick = function() {
            searchInput.value = term;
            searchHistoryDropdown.classList.add('hidden');
            searchForm.dispatchEvent(new Event('submit', { cancelable: true })); // Trigger search
        };

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-history-btn';
        deleteBtn.innerHTML = '&times;'; // Cross mark
        deleteBtn.type = 'button'; // Prevent form submission
        deleteBtn.onclick = function(e) {
            e.stopPropagation(); // Don't trigger the item click
            searchHistory.splice(index, 1);
            localStorage.setItem('newsSearchHistory', JSON.stringify(searchHistory));
            renderSearchHistory();
        };

        item.appendChild(termSpan);
        item.appendChild(deleteBtn);
        searchHistoryDropdown.appendChild(item);
    });
    
    searchHistoryDropdown.classList.remove('hidden');
}

// Show history on click/focus
searchInput.addEventListener('focus', renderSearchHistory);
searchInput.addEventListener('click', renderSearchHistory);

// Hide when clicking outside
document.addEventListener('click', function(e) {
    if (!searchForm.contains(e.target)) {
        searchHistoryDropdown.classList.add('hidden');
    }
});

// Helper to fetch and display news
async function loadNews(endpoint, params) {
    showLoading();
    try {
        const articles = await fetchNewsData(endpoint, params);
        renderNewsCards(articles);
    } catch (error) {
        showError(error.message);
    }
}

// Handle Category Clicks
categoryBtns.forEach(button => {
    button.addEventListener('click', function(e) {
        // Change which button is active
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Get category name
        let category = e.target.getAttribute('data-id');
        
        // Change the main title
        mainTitle.textContent = `Latest ${category} News`;
        
        // Clear search box
        searchInput.value = '';

        // Load category news
        loadNews('/top-headlines', { category: category });
    });
});

// Handle Search Submit
searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from refreshing
    let query = searchInput.value.trim();

    if (query !== '') {
        // Save to history
        saveSearch(query);
        searchHistoryDropdown.classList.add('hidden');

        // Remove active class from categories since we are searching now
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        
        mainTitle.textContent = `Search Results for "${query}"`;
        
        // Load search news
        loadNews('/everything', { q: query, sortBy: 'publishedAt' });
    }
});

// Load general news when the page first opens
window.onload = function() {
    loadNews('/top-headlines', { category: 'general' });
};
