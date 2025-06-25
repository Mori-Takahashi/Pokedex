// API Configuration
const API_CONFIG = {
    BASE_URL: "https://pokeapi.co/api/v2/",
    POKEMON_ENDPOINT: "pokemon/",
    STATS_ENDPOINT: "stat/",
    ITEMS_PER_PAGE: 32,
    MAX_POKEMON_LIMIT: 100000
};

let currentURL = `${API_CONFIG.BASE_URL}pokemon?limit=${API_CONFIG.ITEMS_PER_PAGE}&offset=0`;
let allPokemonNames = [];

/**
 * Logs application information to the console
 */
function logAppInfo() {
    console.log("Pokedex App initialized");
    console.log("Total Pokemon available:", allPokemonNames.length);
    console.log("Last modified:", document.lastModified);
}

// Initialization
window.onload = init;

/**
 * Initializes the application by fetching all Pokémon names,
 * rendering initial data, showing a welcome message, and logging browser info.
 */
async function init() {
    try {
        await fetchAllPokemonNames();
        await renderData(currentURL);
        showTextWelcome();
        logAppInfo();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showAlert('Failed to initialize the Pokedex. Please refresh the page.');
    }
}

/**
 * Fetches all Pokémon names and stores them in an array.
 */
async function fetchAllPokemonNames() {
    const allPokemonsURL = `${API_CONFIG.BASE_URL}pokemon?limit=${API_CONFIG.MAX_POKEMON_LIMIT}&offset=0`;
    try {
        const data = await loadData(allPokemonsURL);
        if (data?.results) {
            allPokemonNames = data.results.map(pokemon => pokemon.name);
        } else {
            throw new Error('No Pokemon data received');
        }
    } catch (error) {
        console.error('Failed to fetch Pokemon names:', error);
        showAlert('Failed to load Pokémon names. Some features may not work.');
    }
}

/**
 * Shows suggestions based on the user's input in the search box.
 */
function showSuggestions() {
    const input = document.getElementById('searchPokemonValue').value.toLowerCase().trim();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (input.length < 2) {
        suggestionsDiv.classList.remove('show');
        return;
    }

    const filteredNames = allPokemonNames
        .filter(name => name.toLowerCase().includes(input))
        .slice(0, 10);
    
    if (filteredNames.length > 0) {
        filteredNames.forEach(name => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'dropdown-item';
            suggestionItem.textContent = name.charAt(0).toUpperCase() + name.slice(1);
            suggestionItem.addEventListener('click', () => selectSuggestion(name));
            suggestionsDiv.appendChild(suggestionItem);
        });
        suggestionsDiv.classList.add('show');
    } else {
        suggestionsDiv.classList.remove('show');
    }
}

/**
 * Selects a suggestion from the dropdown and updates the search box value.
 * @param {string} name - The name of the Pokémon selected from the suggestions.
 */
function selectSuggestion(name) {
    document.getElementById('searchPokemonValue').value = name;
    document.getElementById('suggestions').classList.remove('show');
}

/**
 * Displays an alert message.
 * @param {string} message - The message to display.
 */
function showAlert(message) {
    let msgDiv = document.getElementById('alertMessage');
    msgDiv.classList.remove('d-non');
    msgDiv.innerHTML = `${message}`;
}

/**
 * Displays an alert message with a success type.
 * @param {string} alertText - The text to display in the alert.
 * [BOOTSTRAP COPY]
 */
function alertMessageValue(alertText) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const message = alertText;
    const type = 'success';

    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
}

/**
 * Displays a larger alert message with a success type.
 * @param {string} alertText - The text to display in the alert.
 * [BOOTSTRAP COPY]
 */
function alertMessageValueBigView(alertText) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholderBigView');
    const message = alertText;
    const type = 'success';

    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
}

/**
 * Loads data from the provided URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object|null>} The fetched data as JSON or null if an error occurs.
 */
async function loadData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading data from:', url, error);
        showAlert('Failed to load data. Please check your internet connection.');
        return null;
    }
}

/**
 * Loads Pokémon details from the provided URL.
 * @param {string} url - The URL to fetch Pokémon details from.
 * @returns {Promise<Object|null>} The fetched Pokémon details as JSON or null if an error occurs.
 */
async function loadPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading Pokemon details from:', url, error);
        return null;
    }
}

/**
 * Renders Pokémon data on the page.
 * @param {string} URL - The URL to fetch Pokémon data from.
 */
async function renderData(URL) {
    let data = await loadData(URL);
    let content = document.getElementById("render");
    content.innerHTML = ``;
    if (data && data.results) {
        for (let i = 0; i < data.results.length; i++) {
            let pokemon = data.results[i];
            let pokemonDetails = await loadPokemonDetails(pokemon.url);
            let pokemonColor = checkColor(pokemonDetails.types[0].type.name);
            content.innerHTML += renderInDiv(i, pokemon, pokemonDetails, pokemonColor);
        }
        disableSpinner();
        checkButton(data);
    } else {
        showAlert("oh something is wrong here :(");
    }
}

/**
 * Renders the search result of a Pokémon on the page.
 * @param {string} URL - The URL to fetch the search result from.
 */
async function renderDataSearch(URL) {
    let data = await loadData(URL);
    let content = document.getElementById("render");
    content.innerHTML = ``;
    if (data) {
        let pokemonColor = checkColor(data.types[0].type.name);
        content.innerHTML += renderInDivSearch(data, pokemonColor);
        disableSpinner();
        checkButton(data);
    } else {
        showAlert("I couldn't find anything :(");
    }
}

/**
 * Searches for a Pokémon based on the user's input.
 */
async function searchPokemon() {
    const input = document.getElementById('searchPokemonValue').value.toLowerCase().trim();
    
    if (input.length < 2) {
        alertMessageValue('Please enter at least 2 characters');
        return;
    }

    const searchURL = `${API_CONFIG.BASE_URL}${API_CONFIG.POKEMON_ENDPOINT}${input}`;
    enableSpinner();
    
    try {
        const data = await loadPokemonDetails(searchURL);
        const content = document.getElementById('render');
        content.innerHTML = '';
        
        if (data) {
            await renderDataSearch(searchURL);
        } else {
            const suggestions = getSimilarPokemonNames(input);
            const message = suggestions.length > 0 
                ? `Pokémon "${input}" not found. Did you mean: ${suggestions.slice(0, 5).join(', ')}?`
                : `Pokémon "${input}" not found and no similar names available.`;
            showAlert(message);
        }
    } catch (error) {
        console.error('Search error:', error);
        showAlert('Search failed. Please try again.');
    } finally {
        disableSpinner();
    }
}

/**
 * Returns a list of Pokémon names that are similar to the input name.
 * @param {string} input - The input Pokémon name.
 * @returns {Array} A list of similar Pokémon names.
 */
function getSimilarPokemonNames(input) {
    const threshold = 3; // Max Levenshtein distance
    return allPokemonNames.filter(name => getLevenshteinDistance(input, name) <= threshold);
}

/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} The Levenshtein distance.
 */
function getLevenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1,     // Insertion
                    matrix[i - 1][j] + 1      // Deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

/**
 * Enables the loading spinner.
 */
function enableSpinner() {
    document.getElementById('spinner').innerHTML = /*html*/`
<svg id="spinner" class="container-spinner" viewBox="0 0 40 40" height="40" width="40"><circle class="track" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none"/><circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none"/></svg>
    `;
}

/**
 * Disables the loading spinner.
 */
function disableSpinner() {
    document.getElementById('spinner').innerHTML = ``;
}

/**
 * Checks the availability of the next and previous buttons based on the provided data.
 * @param {Object} data - The data to check the buttons' state.
 */
function checkButton(data) {
    const nextButton = document.getElementById('nextPage');
    const prevButton = document.getElementById('previousPage');
    
    if (nextButton) {
        nextButton.disabled = !data.next;
    }
    
    if (prevButton) {
        prevButton.disabled = !data.previous;
    }
}

/**
 * Loads and renders the next page of Pokémon data.
 */
async function nextPage() {
    let data = await loadData(currentURL);
    currentURL = data.next;
    enableSpinner();
    renderData(currentURL);
}

/**
 * Loads and renders the previous page of Pokémon data.
 */
async function previousPage() {
    let data = await loadData(currentURL);
    currentURL = data.previous;
    enableSpinner();
    renderData(currentURL);
}

/**
 * Loads and renders the previous Pokémon in the big view.
 * @param {number} id - The ID of the Pokémon.
 */
function previousPageBigView(id) {
    if (id < 1 || id > 1302) {
        alertMessageValueBigView("there are no more Pokemons :(");
    } else {
        viewPokemon(id);
    }
}

/**
 * Loads and renders the next Pokémon in the big view.
 * @param {number} id - The ID of the Pokémon.
 */
function nextPageBigView(id) {
    viewPokemon(id);
}

/**
 * Loads and displays detailed information about a specific Pokémon.
 * @param {number} id - The ID of the Pokémon.
 */
async function viewPokemon(id) {
    const pokeInfosURL = `${API_CONFIG.BASE_URL}${API_CONFIG.POKEMON_ENDPOINT}${id}`;
    
    try {
        const data = await loadPokemonDetails(pokeInfosURL);
        const content = document.getElementById('renderInfos');
        content.innerHTML = '';
        
        if (data) {
            const nextID = id + 1;
            const previousID = id - 1;
            
            if (data.cries?.latest) {
                playPokeSound(data.cries.latest, 0.1);
            }
            
            const pokemonColor = checkColor(data.types[0]?.type?.name);
            const pokemonColor1 = data.types[1] ? checkColor(data.types[1].type.name) : null;
            const dropshadow = checkColorShadow(data.types[0]?.type?.name);
            
            content.innerHTML = renderPokeInfosBigView(data, pokemonColor, pokemonColor1, nextID, previousID, dropshadow);
            openWindow();
        } else {
            showAlert('Failed to load Pokémon details.');
        }
    } catch (error) {
        console.error('Error viewing Pokemon:', error);
        showAlert('An error occurred while loading Pokémon details.');
    }
}

/**
 * Plays the cry sound of a Pokémon.
 * @param {string} sound - The URL of the cry sound.
 * @param {number} volume - The volume level for the sound.
 */
function playPokeSound(sound, volume = 0.1) {
    if (!sound) return;
    
    try {
        const audio = new Audio(sound);
        audio.volume = Math.min(Math.max(volume, 0), 1);
        audio.play().catch(error => {
            console.warn('Could not play Pokemon sound:', error.message);
        });
    } catch (error) {
        console.warn('Error creating audio element:', error.message);
    }
}

/**
 * Opens the window to display Pokémon details.
 */
function openWindow() {
    let window = document.getElementById('renderInfos');
    window.classList.add('scale-up-ver-center');
    window.classList.remove('scale-out-vertical');
    window.classList.remove('d-non');
    document.body.classList.add('overflow-hidden');
}

/**
 * Closes the window displaying Pokémon details.
 */
function closeWindow() {
    let window = document.getElementById('renderInfos');
    window.classList.remove('scale-up-ver-center');
    window.classList.add('scale-out-vertical');
    setTimeout(function() {
        window.classList.add('d-non');
        document.body.classList.remove('overflow-hidden');
    }, 500);
}

/**
 * Returns the background color style for a given Pokémon type.
 * @param {string} type - The Pokémon type.
 * @returns {string} The background color style.
 */
function checkColor(type) {
    let colors = {
        normal: "background-color: #A8A77A;",
        fire: "background-color: #EE8130;",
        water: "background-color: #6390F0;",
        electric: "background-color: #F7D02C;",
        grass: "background-color: #7AC74C;",
        ice: "background-color: #96D9D6;",
        fighting: "background-color: #C22E28;",
        poison: "background-color: #A33EA1;",
        ground: "background-color: #E2BF65;",
        flying: "background-color: #A98FF3;",
        psychic: "background-color: #F95587;",
        bug: "background-color: #A6B91A;",
        rock: "background-color: #B6A136;",
        ghost: "background-color: #735797;",
        dragon: "background-color: #6F35FC;",
        dark: "background-color: #705746;",
        steel: "background-color: #B7B7CE;",
        fairy: "background-color: #D685AD;"
    };
    return colors[type] || "background-color: #FFFFFF;";
}

/**
 * Returns the drop shadow color for a given Pokémon type.
 * @param {string} type - The Pokémon type.
 * @returns {string} The drop shadow color.
 */
function checkColorShadow(type) {
    let colors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    };
    return colors[type] || "background-color: #FFFFFF;";
}

/**
 * Hides the welcome message.
 */
function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.add('hidden');
    setTimeout(() => {
        welcomeMessage.style.display = 'none';
    }, 500);
}

/**
 * Shows the welcome text with an animation.
 */
function showTextWelcome() {
    setTimeout(function(){
        let classDiv = document.getElementById('welcomeMessageText');
        classDiv.classList.remove('d-non');
        classDiv.classList.add('tracking-in-expand');
    });
}

/**
 * Initializes and animates the dot animation on the canvas.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const dots = [];
    const numDots = 100;
    const maxDistance = 100;

    class Dot {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
    }

    function initDots() {
        for (let i = 0; i < numDots; i++) {
            dots.push(new Dot());
        }
    }

    function connectDots() {
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                let dx = dots[i].x - dots[j].x;
                let dy = dots[i].y - dots[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dots.forEach(dot => {
            dot.update();
            dot.draw();
        });

        connectDots();

        requestAnimationFrame(animate);
    }

    initDots();
    animate();
});
