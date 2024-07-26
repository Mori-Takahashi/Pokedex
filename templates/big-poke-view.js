function renderPokeInfosBigView(data, pokemonColor, pokemonColor1, nextID, previousID, dropshadow) {
  let typesHtml = `<span style="${pokemonColor}; color: white;" class="padding-3 rounded border border-dark">Type 1: ${data.types[0].type.name}</span>`;
  if (data.types[1]) {
      typesHtml += `<span style="${pokemonColor1}; color: white;" class="padding-3 rounded border border-dark"> Type 2: ${data.types[1].type.name}</span>`;
  }
  let versionNrGameName = `<span>Local №: ${data.game_indices[0].game_index} // Game: ${data.game_indices[0].version.name}</span>`;
  for (let index = 1; index < data.game_indices.length && index < 3; index++) {
    const element = data.game_indices[index];
    if (element.game_index > 1) {
      versionNrGameName += `<span>Local №: ${element.game_index} // Game: ${element.version.name}</span>`;
    }
  }

  let typeHtmlabilities = `<span>${data.abilities[0].ability.name}</span>`;
  if (data.abilities[1] && data.abilities[1].ability.name) {
    typeHtmlabilities += `<span>${data.abilities[1].ability.name}</span>`;
  }
  return /*html*/`
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">${data.name}</span>
          <button type="button" class="btn-close" onclick="closeWindow()" aria-label="Close"></button>
        </div>
      </nav>
      <div id="liveAlertPlaceholderBigView"></div>
      <div class="BigViewDetials d-flex justify-content-around">
        <img style="filter: drop-shadow(6px -4px 53px ${dropshadow});" src="${data.sprites.front_default}" alt="${data.sprites.front_default}">
        <div class="infoText">
          <span>National №: ${data.id}</span>
          ${typesHtml}
          <span>Height: ${data.height}</span>
          <span>Weight: ${data.weight}</span>
          <span style="font-weight: bold; text-decoration: underline;">Abilities:</span>
          ${typeHtmlabilities} <br>
          ${versionNrGameName}
          <button class="max-width-button btn btn-dark" id="previousPage" onclick="previousPageBigView(${previousID})" type="button">&#8617; Back</button> <br>
          <button class="max-width-button btn btn-dark" id="nextPage" onclick="nextPageBigView(${nextID})" type="button">Next &#8618;</button>
        </div>
      </div>
  `;
}