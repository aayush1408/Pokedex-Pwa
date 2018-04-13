const main = document.querySelector('main');
const stats = document.querySelector('#stats');
const types = document.querySelector('#types');

if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('sw.js');
        console.log('SW registered');
    }
    catch (error) {
        console.log('SW not registered');
    }
}

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
        main.innerHTML = `<h2>This pokemon is yet to be known</h2>`;
        stats.innerHTML = `<h2></h2>`;
        types.innerHTML = `<h2></h2>`;
    }
    else {
        main.innerHTML = viewPokemon(json);
        stats.innerHTML = json.stats.map(function (i) {
            return `<li class="collection-item"> ${i.stat.name.toUpperCase()} ----- ${i.base_stat}</li>`
        }).join('\n');
        types.innerHTML = json.types.map(function (i) {
            return `<li class="collection-item">TYPE -- ${i.type.name.toUpperCase()}</li>`
        }).join('\n');
    }
}


function viewPokemon(pokemon) {
    return `
        <div>
        <ul class="collection">
        <li class="collection-item">NAME -- ${pokemon.name.toUpperCase()}</li>        
        <li class="collection-item"><img src=${pokemon.sprites.front_default} /></li>
        </ul>
        <ul class="collection" style="border:none;">
        <li class="collection-item">WEIGHT -- ${pokemon.weight}</li>
        <li class="collection-item">HEIGHT -- ${pokemon.height}</li>
        </ul>
        </div>
    `
}
