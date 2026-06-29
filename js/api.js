// Function to fetch news from NewsAPI
async function fetchNewsData(endpoint, params) {
    try {
        let url;
        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || 
                        hostname === '127.0.0.1' || 
                        hostname.startsWith('192.168.') || 
                        hostname.startsWith('10.');

        if (isLocal) {
            // Direct request to NewsAPI (permitted on localhost free plan)
            url = `${BASE_URL}${endpoint}?apiKey=${API_KEY}&language=en`;
            for (let key in params) {
                url += `&${key}=${params[key]}`;
            }
        } else {
            // Proxy request through Vercel serverless function in production
            url = `/api/news?endpoint=${endpoint}`;
            for (let key in params) {
                url += `&${key}=${params[key]}`;
            }
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
