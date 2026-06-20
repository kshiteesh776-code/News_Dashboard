// Function to fetch news from NewsAPI
async function fetchNewsData(endpoint, params) {
    try {
        let url = `${BASE_URL}${endpoint}?apiKey=${API_KEY}&language=en`;
        
        // Add extra parameters like category or search query
        for (let key in params) {
            url += `&${key}=${params[key]}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.message);
        }

        return data.articles;
    } catch (err) {
        console.error("News Fetch Error: ", err);
        throw err; // Pass the error to the UI to handle
    }
}
