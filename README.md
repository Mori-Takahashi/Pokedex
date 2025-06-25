# Mori's Pokédex - Interactive Pokémon Explorer

A modern, responsive web application that allows users to explore the fascinating world of Pokémon using the [PokeAPI](https://pokeapi.co/). Built with clean, semantic HTML, modern CSS, and vanilla JavaScript for optimal performance and accessibility.

## ✨ Features

### Core Functionality
- **Pokémon Gallery**: Browse through hundreds of Pokémon with paginated navigation
- **Intelligent Search**: Search for Pokémon with real-time suggestions and fuzzy matching
- **Detailed View**: Click any Pokémon to view comprehensive details including stats, types, and sounds
- **Audio Experience**: Listen to authentic Pokémon cries when viewing details
- **Responsive Design**: Optimized for all devices from mobile to desktop

### Enhanced User Experience
- **Welcome Animation**: Engaging animated welcome screen
- **Background Effects**: Dynamic animated dot pattern background
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful error messages and fallback suggestions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized images, efficient API calls, and smooth animations

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3 (with CSS Custom Properties), Vanilla JavaScript (ES6+)
- **Framework**: [Bootstrap v5.3.3](https://getbootstrap.com/) for responsive grid and components
- **API**: [PokeAPI](https://pokeapi.co/) for Pokémon data
- **Fonts**: Custom Pokémon font for authentic theming
- **Icons**: SVG graphics and WebP images for optimal performance

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mori-Takahashi/Pokedex.git
   cd Pokedex
   ```

2. **Access the application:**
   - Direct file: `file:///path/to/Pokedex/index.html`
   - Local server: `http://localhost:8000`

## 🎮 Usage Guide

### Basic Navigation
1. **Getting Started**: Click "Start Exploring" on the welcome screen
2. **Browse Pokémon**: Scroll through the gallery of Pokémon cards
3. **Pagination**: Use "Previous" and "Next" buttons to navigate pages
4. **Home**: Click the home button to return to the first page

### Search Functionality
1. **Quick Search**: Type in the search box (minimum 2 characters)
2. **Suggestions**: Click on dropdown suggestions for instant results
3. **Fuzzy Matching**: Get suggestions for similar names if exact match isn't found
4. **Clear Results**: Use the home button to return to full gallery

### Detailed View
1. **Open Details**: Click on any Pokémon card
2. **Navigate**: Use arrow buttons to browse through Pokémon
3. **Audio**: Automatically plays Pokémon cry sound (if available)
4. **Close**: Click outside the modal or use browser back button

## 📁 Project Structure

```plaintext
Pokedex/
├── 📁 fonts/                    # Custom fonts
│   └── pokefont/
│       ├── Pokemon Hollow.ttf
│       └── PokemonSolid.ttf
├── 📁 icons/                    # Images and icons
│   ├── ball.webp              # Favicon
│   ├── github-mark-white.png   # GitHub icon
│   └── hero.webp              # Social media preview
├── 📁 scripts/                  # JavaScript files
│   └── script.js              # Main application logic
├── 📁 style/                    # Stylesheets
│   ├── index.css              # Main styles
│   └── PokemonSolid.ttf       # Font file
├── 📁 templates/                # Template rendering functions
│   ├── big-poke-view.js       # Detailed view templates
│   ├── poke-render-search.js   # Search result templates
│   └── poke-render.js         # Gallery card templates
├── 📁 Docs/                     # Generated documentation
├── index.html                   # Main HTML file
├── README.md                   # This file
└── LICENSE                     # Project license
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mori Takahashi**
- GitHub: [@Mori-Takahashi](https://github.com/Mori-Takahashi)
- Project: [Pokédex Repository](https://github.com/Mori-Takahashi/Pokedex)

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing comprehensive Pokémon data
- [Bootstrap](https://getbootstrap.com/) for responsive components
- [Developer Academy](https://developerakademie.com/) for the project inspiration
- The Pokémon Company for the amazing franchise that inspired this project

---

*This project was created as part of a web development exercise and is not affiliated with The Pokémon Company.*
