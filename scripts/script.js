let API_KEY = "https://pokeapi.co/api/v2/";
let currentURL = API_KEY + "pokemon?limit=32&offset=0";
let search_API = "pokemon/";

window.onload = init;

function init() {
    renderData();
}

async function searchPokemon() {
    let input = document.getElementById('searchPokemon').value;
    let searchURL = API_KEY + search_API + input;
    let data = await loadPokemonDetails(searchURL);
    let content = document.getElementById("render");
    content.innerHTML = ``;
    if (data) {
        console.log(data);
    } else {
        alert("ERROR");
    }
}

async function loadData(url) {
    try {
        let response = await fetch(url);
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
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
        return null;
    }
}

async function renderData() {
    let data = await loadData(currentURL);
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

function viewPokemon(count) {
    /* full view function */
    alert(count);
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
    renderData();
}

async function previousPage() {
    let data = await loadData(currentURL);
    currentURL = data.previous;
    enableSpinner();
    renderData();
}