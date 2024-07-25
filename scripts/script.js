// API URLs
let API_KEY = "https://pokeapi.co/api/v2/";
let currentURL = API_KEY + "pokemon?limit=32&offset=0";
let search_API = "pokemon/";
let getPokeStats_API = "https://pokeapi.co/api/v2/stat/";
let allPokemons = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

// Initialization
window.onload = init;

async function init() {
    await fetchAllPokemonNames();
    renderData(currentURL);
    showTextWelcome();
}

//dropdown
async function fetchAllPokemonNames() {
    let data = await loadData(allPokemons);
    if (data && data.results) {
        allPokemonNames = data.results.map(pokemon => pokemon.name);
    } else {
        showAlert("Failed to load Pokémon names");
    }
}

function showSuggestions() {
    let input = document.getElementById('searchPokemonValue').value.toLowerCase();
    let suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (input.length < 3) {
        suggestionsDiv.classList.remove('show');
        return;
    }

    let filteredNames = allPokemonNames.filter(name => name.toLowerCase().includes(input));
    if (filteredNames.length > 0) {
        filteredNames.forEach(name => {
            let suggestionItem = document.createElement('div');
            suggestionItem.className = 'dropdown-item';
            suggestionItem.innerText = name;
            suggestionItem.onclick = () => selectSuggestion(name);
            suggestionsDiv.appendChild(suggestionItem);
        });
        suggestionsDiv.classList.add('show');
    } else {
        suggestionsDiv.classList.remove('show');
    }
}

function selectSuggestion(name) {
    document.getElementById('searchPokemonValue').value = name;
    document.getElementById('suggestions').classList.remove('show');
}

//Alert Functions
function showAlert(messege) {
    let msgDiv = document.getElementById('alertMessage');
    msgDiv.classList.remove('d-non');
    msgDiv.innerHTML = `${messege}`
    setTimeout(function() {
        msgDiv.classList.add('d-non');
        msgDiv.innerHTML = ``;
        location.reload();
    }, 5000);
}

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

//Data Loading Functions
async function loadData(url) {
    try {
        let response = await fetch(url);
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
        showAlert("I cannot load any data :(");
        return null;
    }
}

async function loadPokemonDetails(url) {
    try {
        let response = await fetch(url);
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error in loadPokemonDetails function:", error);
        showAlert("I can't load any parts :(");
        return null;
    }
}

//Data Rendering Functions
async function renderData(URL) {
    let data = await loadData(URL);
    let content = document.getElementById("render");
    content.innerHTML = ``;
    if (data && data.results) {
        for (let i = 0; i < data.results.length; i++) {
            let pokemon = data.results[i];
            let pokemonDetails = await loadPokemonDetails(pokemon.url);
            let pokemonColor = checkColor(pokemonDetails.types[0].type.name)
            content.innerHTML += renderInDiv(i, pokemon, pokemonDetails, pokemonColor);
        }
        disableSpinner();
        checkButton(data);
    } else {
        showAlert("oh something is wrong here :(");
    }
}

async function renderDataSearch(URL) {
    let data = await loadData(URL);
    let content = document.getElementById("render");
    content.innerHTML = ``;
    if (data) {
        let pokemonColor = checkColor(data.types[0].type.name)
        content.innerHTML += renderInDivSearch(data, pokemonColor);
        disableSpinner();
        checkButton(data);
    } else {
        showAlert("I couldn't find anything :(");
    }
}

async function searchPokemon() {
    let input = document.getElementById('searchPokemonValue').value.toLowerCase();
    if (input.length  < 3) {
        alertMessageValue("Please enter more than 3 characters");
    } else {
        let searchURL = API_KEY + search_API + input;
        let data = await loadPokemonDetails(searchURL);
        let content = document.getElementById("render");
        content.innerHTML = ``;
        if (data) {
            renderDataSearch(searchURL);
        } else {
            showAlert(`I couldn't find any Pokemon with the name: ${input}`);
        }
    }
}

//Spinner Functions
function enableSpinner() {
    document.getElementById('spinner').innerHTML = /*html*/`
<svg id="spinner" class="container-spinner" viewBox="0 0 40 40" height="40" width="40"><circle class="track" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none"/><circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none"/></svg>
    `
}

function disableSpinner() {
    document.getElementById('spinner').innerHTML = ``;
}

//Button Check Functions
async function checkButton(data) {
    if (data.next === null || data.next === undefined) {
        document.getElementById("nextPage").disabled = true;
    } else {
        document.getElementById("nextPage").disabled = false;
    }
    if (data.previous === null || data.next === undefined) {
        document.getElementById("previousPage").disabled = true;
    } else {
        document.getElementById("previousPage").disabled = false;
    }
}

//page check function
async function nextPage() {
    let data = await loadData(currentURL);
    currentURL = data.next;
    enableSpinner();
    renderData(currentURL);
}

async function previousPage() {
    let data = await loadData(currentURL);
    currentURL = data.previous;
    enableSpinner();
    renderData(currentURL);
}

function previousPageBigView(id) {
    if (id < 1 || id > 1302) {
        alertMessageValueBigView("there are no more Pokemons :(");
    } else {
        viewPokemon(id);
    }
}

function nextPageBigView(id) {
    viewPokemon(id);
}

//Pokemon View Functions
async function viewPokemon(id) {
    let pokeInfos = API_KEY + search_API + id;
    let data = await loadPokemonDetails(pokeInfos);
    let content = document.getElementById("renderInfos");
    content.innerHTML = ``;
    if (data) {
        let nextID = id + 1;
        let previousID = id - 1;
        let pokemonColor = checkColor(data.types[0].type.name);
        let pokemonColor1 = data.types[1] ? checkColor(data.types[1].type.name) : null;
        content.innerHTML = renderPokeInfosBigView(data, pokemonColor, pokemonColor1, nextID, previousID);
    } else {
        showAlert("Oh, there was an error :(");
    }
    openWindow();
}

//Window Functions
function openWindow() {
    let window = document.getElementById('renderInfos');
    window.classList.add('scale-up-ver-center');
    window.classList.remove('scale-out-vertical');
    window.classList.remove('d-non');
    document.body.classList.add('overflow-hidden');
}

function closeWindow() {
    let window = document.getElementById('renderInfos');
    window.classList.remove('scale-up-ver-center');
    window.classList.add('scale-out-vertical');
    setTimeout(function() {
        window.classList.add('d-non');
        document.body.classList.remove('overflow-hidden');
    }, 500);
}

//color Functions
function checkColor(type) {
    const colors = {
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

//Welcome msg
function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.classList.add('hidden');
    setTimeout(() => {
        welcomeMessage.style.display = 'none';
    }, 500);
}

function showTextWelcome() {
    setTimeout(function(){
        let classDiv = document.getElementById('welcomeMessageText');
        classDiv.classList.remove('d-non');
        classDiv.classList.add('tracking-in-expand');
    })
}

/* 

               _       _            ___  ___           _   _____     _         _         _     _ 
              | |     | |           |  \/  |          (_) |_   _|   | |       | |       | |   (_)
  ___ ___   __| | ___ | |__  _   _  | .  . | ___  _ __ _    | | __ _| | ____ _| |__  ___| |__  _ 
 / __/ _ \ / _` |/ _ \| '_ \| | | | | |\/| |/ _ \| '__| |   | |/ _` | |/ / _` | '_ \/ __| '_ \| |
| (_| (_) | (_| |  __/| |_) | |_| | | |  | | (_) | |  | |   | | (_| |   < (_| | | | \__ \ | | | |
 \___\___/ \__,_|\___||_.__/ \__, | \_|  |_/\___/|_|  |_|   \_/\__,_|_|\_\__,_|_| |_|___/_| |_|_|
                              __/ |                                                              
                             |___/                                                               

*/