function renderInDiv(i, pokemon, pokemonDetails) {
    let typesHtml = `<span class="padding-3 rounded border border-dark">${pokemonDetails.types[0].type.name}</span>`;
    if (pokemonDetails.types[1]) {
        typesHtml += ` <span class="padding-3 rounded border border-dark">${pokemonDetails.types[1].type.name}</span>`;
    }
    
    return `
        <div onclick="viewPokemon(${i})" class="hover-effect cursor-pointer margin-10 shadow p-3 card" style="width: 18rem;">
        <span class="fw-lighter">PokeID:${pokemonDetails.id}</span>
        <img src="${pokemonDetails.sprites.front_default}" class="card-img-top" alt="${pokemonDetails.sprites.front_default}">
            <div class="card-body">
                <p class="card-text fw-bold">${pokemon.name}</p>
                ${typesHtml} <br><br>
                <span class="fw-lighter">PokeID:${pokemonDetails.id}</span>
            </div>
        </div>
    `
}
