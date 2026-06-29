// api/news.js
// Vercel Serverless Function to proxy NewsAPI requests, bypassing CORS/localhost restrictions.

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { endpoint, ...queryParams } = req.query;

        if (!endpoint) {
            return res.status(400).json({ error: 'Endpoint is required (e.g. /top-headlines or /everything)' });
        }

        // Access the API key. In production, the user can set NEWS_API_KEY in Vercel settings.
        // If not set, it will fallback to the hardcoded default key.
        const apiKey = process.env.NEWS_API_KEY || '0fbe00c5c7a0483bbdc5b8dbe22fcfc3';
        
        let url = `https://newsapi.org/v2${endpoint}?apiKey=${apiKey}&language=en`;
        
        for (let key in queryParams) {
            url += `&${key}=${encodeURIComponent(queryParams[key])}`;
        }

        const apiResponse = await fetch(url);
        const data = await apiResponse.json();

        return res.status(apiResponse.status).json(data);
    } catch (error) {
        console.error('NewsAPI Proxy error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
