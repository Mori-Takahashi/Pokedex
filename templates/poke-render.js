/**
 * Renders a Pokémon in a card format.
 * @param {number} i - The index of the Pokémon.
 * @param {Object} pokemon - The basic data of the Pokémon.
 * @param {Object} pokemonDetails - The detailed data of the Pokémon.
 * @param {string} pokemonColor - The background color based on the Pokémon type.
 * @returns {string} - The HTML string for rendering the Pokémon card.
 */
function renderInDiv(i, pokemon, pokemonDetails, pokemonColor) {
    let typesHtml = `<span class="padding-3 rounded border border-dark">${pokemonDetails.types[0].type.name}</span>`;
    if (pokemonDetails.types[1]) {
        typesHtml += ` <span class="padding-3 rounded border border-dark">${pokemonDetails.types[1].type.name}</span>`;
    }
    
    return `
        <!-- ${i} -->
        <div style="${pokemonColor}" onclick="viewPokemon(${pokemonDetails.id})" class="hover-effect cursor-pointer margin-10 shadow p-3 card" style="width: 18rem;">
        <span class="fw-lighter">National №: ${pokemonDetails.id}</span>
        <img src="${pokemonDetails.sprites.front_default}" class="card-img-top" alt="${pokemonDetails.sprites.front_default}">
            <div class="card-body">
                <p class="card-text fw-bold">${pokemon.name}</p>
                ${typesHtml} <br><br>
                <span class="fw-lighter">Local №: ${pokemonDetails.game_indices[0].game_index} in ${pokemonDetails.game_indices[0].version.name}</span>
            </div>
        </div>
    `;
}
