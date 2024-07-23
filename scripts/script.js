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
            content.innerHTML += renderInDiv(i, pokemon, pokemonDetails);
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
        content.innerHTML += renderInDivSearch(data);
        disableSpinner();
        checkButton(data);
    } else {
        showAlert("I couldn't find anything :(");
    }
}

async function searchPokemon() {
    let input = document.getElementById('searchPokemonValue').value.toLowerCase();
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

function enableSpinner() {
    document.getElementById('spinner').innerHTML = /*html*/`
        <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only"></span>
        </div>
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

// class scale-out-vertical AND scale-up-ver-center

async function viewPokemon(id) {
    let pokeInfos = API_KEY + search_API + id;
    let data = await loadPokemonDetails(pokeInfos);
    let content = document.getElementById("renderInfos");
    content.innerHTML = ``;
    if (data) {
        console.log(data);
        content.innerHTML = renderPokeInfosBigView(data);
        
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

// overflow-x: hidden