# 📰 NewsPulse — Modern News Dashboard

NewsPulse is a sleek, modern, and responsive web dashboard that aggregates top headlines and search queries using the **NewsAPI**. It features a stunning premium dark theme designed with slate-grey, charcoal-black, and electric-blue accents.

---

## ✨ Features

* **Real-Time News Aggregation:** Pulls the latest news headlines from around the globe using NewsAPI's robust endpoints.
* **Dynamic Category Filtering:** Toggle between General, Business, Technology, Sports, Entertainment, Health, and Science.
* **Smart Search with Autocomplete History:** Includes a custom-built search experience that caches up to 8 of your latest search terms in `localStorage` for easy access and removal.
* **Premium Aesthetics:** Beautifully curated dark theme with smooth transitions, subtle card hover scale animations, and clean shadows.
* **Fully Responsive Layout:** Optimized for all screen sizes, from mobile phones to high-res desktop screens.

---

## 🎨 Theme Details
The dashboard uses a custom designed **Grey, Black, and Blue** CSS variable system:
- **Background (`#0b0f17`):** A sophisticated dark slate.
- **Cards & UI Panels (`#151c28` & `#1e293b`):** Deep charcoal panels with subtle hover states.
- **Accents (`#3b82f6` & `#60a5fa`):** Electric blue for highlighting sources, active categories, buttons, and loading animations.

---

## 🚀 Getting Started

### 1. Prerequisites
You need a web browser and a local server setup (Python, Node.js, or Live Server) to run the application locally.

### 2. Get a NewsAPI Key
1. Go to [NewsAPI.org](https://newsapi.org/) and register for a free API Key.
2. Open `js/config.js` in your text editor.
3. Replace the `API_KEY` value with your personal API key:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

### 3. Run Locally
You can start a local server to run the application:

**Using Python:**
```bash
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

**Using Node (npx):**
```bash
npx http-server
```

---

## 📁 File Structure

```text
├── index.html          # Main HTML structure and layout
├── css/
│   └── styles.css      # Core styles & variables (Grey, Black, Blue theme)
├── js/
│   ├── config.js       # Holds API endpoints and access key
│   ├── api.js          # Handles fetching from NewsAPI
│   ├── ui.js           # Renders news cards, handles loading/error states
│   └── app.js          # App lifecycle, search history & category click listeners
└── README.md           # Project documentation
```

---

## 🛠️ Built With

- **HTML5:** Semantic markup structure.
- **CSS3 (Custom Properties):** Custom design system and smooth transitions.
- **Modern JavaScript (ES6+):** Vanilla JS for state handling, async-fetch network requests, and DOM manipulation.
- **NewsAPI:** Third-party API for fresh global headlines.
