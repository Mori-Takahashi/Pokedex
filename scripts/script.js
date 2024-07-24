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
    if (input.length  < 3) {
        alertMessageValue();
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


function alertMessageValue() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const message = 'Please enter more than 3 characters';
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

/* 
    let backgroundColors = [
    {
    normal : "#A8A77A",
    fire : "#EE8130",
    water : "#6390F0",
    electric : "#F7D02C",
    grass : "#7AC74C",
    ice : "#96D9D6",
    fighting : "#C22E28",
    poison : "#A33EA1",
    ground : "#E2BF65",
    flying : "#A98FF3",
    psychic :"#F95587",
    bug : "#A6B91A",
    rock : "#B6A136",
    ghost : "#735797",
    dragon : "#6F35FC",
    dark : "#705746",
    steel : "#B7B7CE",
    fairy : "#D685AD",
    }
]
     */