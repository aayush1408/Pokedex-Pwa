const main = document.querySelector('main');
const stats = document.querySelector('#stats');


function pokemonName() {
    const pokemon = document.querySelector('#pokemon');
    const pokemon_name = pokemon.value;
    getPokemon(pokemon_name.toLowerCase());
}

async function getPokemon(pokemon) {
    console.log(pokemon);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const json = await res.json();
    console.log(json);
    if (json.detail === 'Not found.') {
        main.innerHTML = `<h2>This pokemon is yet to be known</h2>`
    }
    else {
        main.innerHTML = viewPokemon(json);
        stats.innerHTML = json.stats.map(function (i) {
            return `<li class="collection-item"> ${i.stat.name} ----- ${i.base_stat}</li>`
        }).join('\n');
    }
}


function viewPokemon(pokemon) {
    return `
        <div>
        <h5>Name -- ${pokemon.name}</h5>        
        <img src=${pokemon.sprites.front_default} />
        <p>Weight -- ${pokemon.weight}</p>
        <p>Height -- ${pokemon.height}</p>
        </div>
    `
}