let API_KEY = "https://pokeapi.co/api/v2/";

window.onload = init();

function init() {
    renderData();
}

async function loadData() {
    try {
        let response = await fetch(API_KEY + "pokemon?limit=32&offset=0");
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

async function loadPokemonDescription() {
    try {
        let response = await fetch();
        let responseToJson = await response.json();
        return responseToJson
    } catch (error) {
        console.error("Error in loadPokemonDescription function:", error);
    }
}

async function renderData() {
    let data = await loadData();
    let content = document.getElementById("render");
    content.innerHTML = ``;
    if (data && data.results) {
        for (let i = 0; i < data.results.length; i++) {
            let pokemon = data.results[i];
            let pokemonDescription = await loadPokemonDescription()
            let pokemonDetails = await loadPokemonDetails(pokemon.url);
            content.innerHTML += renderInDiv(pokemon, pokemonDetails, pokemonDescription);
        }
    } else {
        content.innerHTML = "No data available";
    }
}

async function nextPage() {
    let data = await loadData();
}

function previousPage() {

}