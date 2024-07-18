function renderInDiv(pokemon, pokemonDetails) {
    return `
        <div class="col">
            <img src="${pokemonDetails.sprites.front_default}" class="poke-img img-fluid border rounded card-img-top" alt="${pokemonDetails.sprites.front_default}" />
            <div class="card-body">
                <p class="card-text">
                    Name: <b>${pokemon.name}</b> <br> 
                    API Link: <b>${pokemon.url}</b> <br>
                    ID: <b>${pokemonDetails.id}</b> <br>
                    IMG_URL: ${pokemonDetails.sprites.front_default}
                </p>
            </div>
        </div>
    `
}