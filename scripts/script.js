let API_KEY = "https://pokeapi.co/api/v2/";
let currentURL = API_KEY + "pokemon?limit=32&offset=0";
let search_API = "pokemon/";
let getPokeStats_API = "https://pokeapi.co/api/v2/stat/";

window.onload = init;

function init() {
    renderData(currentURL);
}

function showAlert(messege) {
    let msgDiv = document.getElementById('alertMessage');
    msgDiv.classList.remove('d-non');
    msgDiv.innerHTML = `${messege}`
    setTimeout(function() {
        msgDiv.classList.add('d-non');
        msgDiv.innerHTML = ``;
        init();
    }, 5000);
}

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
        console.log(data);
        renderDataSearch(searchURL);
    } else {
        showAlert("Oh, there was an error :(");
    }
    }
    
}

function enableSpinner() {
    document.getElementById('spinner').innerHTML = /*html*/`
<svg id="spinner" class="container-spinner" viewBox="0 0 40 40" height="40" width="40"><circle class="track" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none"/><circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none"/></svg>
    `
}

function disableSpinner() {
    document.getElementById('spinner').innerHTML = ``;
}

async function checkButton(data) {
    if (data.next === null) {
        document.getElementById("nextPage").disabled = true;
    } else {
        document.getElementById("nextPage").disabled = false;
    }
    if (data.previous === null) {
        document.getElementById("previousPage").disabled = true;
    } else {
        document.getElementById("previousPage").disabled = false;
    }
}

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

async function viewPokemon(id) {
    let pokeInfos = API_KEY + search_API + id;
    let data = await loadPokemonDetails(pokeInfos);
    let content = document.getElementById("renderInfos");
    content.innerHTML = ``;
    if (data) {
        console.log(data);
        let nextID = id + 1
        let previousID = id - 1
        let pokemonColor = checkColor(data.types[0].type.name);
        let pokemonColor1 = data.types[1] ? checkColor(data.types[1].type.name) : null;
        content.innerHTML = renderPokeInfosBigView(data, pokemonColor, pokemonColor1, nextID, previousID);
        
    } else {
        showAlert("Oh, there was an error :(");
    }
    openWindow()
}

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

function checkColor(type) {
    if (type === "normal") {
        return "background-color: #A8A77A;";
    }
    if (type === "fire") {
        return "background-color: #EE8130;";
    }
    if (type === "water") {
        return "background-color: #6390F0;";
    }
    if (type === "electric") {
        return "background-color: #F7D02C;";
    }
    if (type === "grass") {
        return "background-color: #7AC74C;";
    }
    if (type === "ice") {
        return "background-color: #96D9D6;";
    }
    if (type === "fighting") {
        return "background-color: #C22E28;";
    }
    if (type === "poison") {
        return "background-color: #A33EA1;";
    }
    if (type === "ground") {
        return "background-color: #E2BF65;";
    }
    if (type === "flying") {
        return "background-color: #A98FF3;";
    }
    if (type === "psychic") {
        return "background-color: #F95587;";
    }
    if (type === "bug") {
        return "background-color: #A6B91A;";
    }
    if (type === "rock") {
        return "background-color: #B6A136;";
    }
    if (type === "ghost") {
        return "background-color: #735797;";
    }
    if (type === "dragon") {
        return "background-color: #6F35FC;";
    }
    if (type === "dark") {
        return "background-color: #705746;";
    }
    if (type === "steel") {
        return "background-color: #B7B7CE;";
    }
    if (type === "fairy") {
        return "background-color: #D685AD;";
    }
    return "background-color: #FFFFFF;";
}