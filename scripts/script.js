let API_KEY = "https://pokeapi.co/api/v2/"

async function loadData() {
    let response = await fetch(API_KEY + "pokemon?limit=5&offset=0");
    let responseToJson = await response.json();
    console.log(responseToJson);
}


async function renderData() {
    
}