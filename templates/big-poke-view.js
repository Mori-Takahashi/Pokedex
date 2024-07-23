function renderPokeInfosBigView(data) {
    return /*html*/`
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">${data.name}</span>
            <button type="button" class="btn-close" onclick="closeWindow()" aria-label="Close"></button>
          </div>
        </nav>
        <div class="d-flex"><!-- container for IMG -->
          <img src="${data.sprites.front_default}" alt="${data.sprites.front_default}">
          <div class="infoText">
            <span>National №: ${data.id}</span>
            <span>Type: ${data.type}</span>
            <span>Height: ${data.height}</span>
            <span>Weight: ${data.weight}</span>
            <span>Abilities: ${data.abilities[0].ability.name}</span>
            <span>Local №: ${data.game_indices[0].game_index} // ${data.game_indices[0].version.name}</span>
            <!-- info of pokemon -->
          </div>
        </div>
        <!-- render the infos -->
        <!-- class scale-out-vertical AND scale-up-ver-center -->
    `
}