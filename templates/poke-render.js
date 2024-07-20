function renderInDiv(i, pokemon, pokemonDetails) {
    return `
        <div onclick="viewPokemon(${i})" class="hover-effect cursor-pointer margin-10 shadow p-3 card" style="width: 18rem;">
        <span class="fw-lighter">PokeID:${pokemonDetails.id}</span>
        <img src="${pokemonDetails.sprites.front_default}" class="card-img-top" alt="${pokemonDetails.sprites.front_default}">
            <div class="card-body">
                <p class="card-text fw-bold">${pokemon.name}</p>
                <span>Dummy</span> <br>
                <span class="fw-lighter">PokeID:${pokemonDetails.id}</span>

            </div>
        </div>
    `
}