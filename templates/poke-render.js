function renderInDiv(pokemon, pokemonDetails) {
    return `
        <div class="col">
            <img src="./25.png" class="img-fluid border rounded card-img-top" alt="IMG" />
            <div class="card-body">
                <p class="card-text">
                    Name: <b>${pokemon.name}</b> <br> 
                    API Link: <b>${pokemon.url}</b>
                    ID: <b>${pokemonDetails.id}</b>

                </p>
            </div>
        </div>
    `
}