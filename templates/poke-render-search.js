function renderInDivSearch(data) {
    let typesHtml = `<span class="padding-3 rounded border border-dark">${data.types[0].type.name}</span>`;
    if (data.types[1]) {
        typesHtml += ` <span class="padding-3 rounded border border-dark">${data.types[1].type.name}</span>`;
    }
    
    return `
        <div onclick="viewPokemon(${data.id})" class="hover-effect cursor-pointer margin-10 shadow p-3 card" style="width: 18rem;">
        <span class="fw-lighter">PokeID:${data.id}</span>
        <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.sprites.front_default}">
            <div class="card-body">
                <p class="card-text fw-bold">${data.forms[0].name}</p> 
                ${typesHtml} <br><br>
                <span class="fw-lighter">PokeID:${data.id}</span>
            </div>
        </div>
    `
}