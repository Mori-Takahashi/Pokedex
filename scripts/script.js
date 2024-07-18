let API_KEY = "https://pokeapi.co/api/v2/"

function init() {
    loadData();
}

async function read() {
    try {
        let response = await loadData();
        if (response) {
            let userKeysArray = Object.keys(response);
            console.log(userKeysArray);
        } else {
            console.error("Response konnte nicht geladen werden (null oder undefined")
        }
    } catch (error) {
        console.error("Error in read function:", error);
    }
}




async function renderData() {

}

async function loadData() {
    try {
        let response = await fetch(API_KEY + "pokemon?limit=30&offset=0");
        let responseToJson = await response.json();
        console.log(responseToJson);
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
        return null;
    }
}
