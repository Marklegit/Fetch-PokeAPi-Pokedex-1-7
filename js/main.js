const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		const target = document.querySelector(tab.dataset.tabTarget);
		tabContents.forEach(tabContent => {
			tabContent.classList.remove('active');
		});
		tabs.forEach(tab => {
			tab.classList.remove('active');
		});
		tab.classList.add('active');
		target.classList.add('active');
	});
});

let pokedexContainer = document.getElementById('pokedex-content-kanto');
let pokedexJohtoContainer = document.getElementById("pokedex-content-johto");
let pokedexHoennContainer = document.getElementById("pokedex-content-hoenn");
let pokedexSinnohContainer = document.getElementById("pokedex-content-sinnoh");
let pokedexUnovaContainer = document.getElementById("pokedex-content-unova");
let pokedexKalosContainer = document.getElementById("pokedex-content-kalos");
let pokedexAlolaContainer = document.getElementById("pokedex-content-alola");

//The total Pokémon on this API is 807
let kantoPokedexTotal = 151;
let johtoPodedexTotal = 251;
let hoennPokedexTotal = 386;
let sinnohPokedexTotal = 493;
let unovaPokedexTotal = 649;
let kalosPokedexTotal = 721;
let alolaPokedexTotal = 807;

const colors = {
	normal: '#F5F5F5',
	fire: '#ff6969',
	water: '#73d5ff',
	electric: '#f2ee66',
	grass: '#71d97f',
	ice: '#b0fbff',
	fighting: '#E6E0D4',
	poison: '#d7a3ff',
	ground: '#edc18c',
	flying: '#dcf1f5',
	psychic: '#ed7be4',
	bug: '#afb84f',
	rock: '#bf9262',
	ghost: '#998e9c',
	dragon: '#97b3e6',
	dark: '#737373',
	steel: '#b5b5b5',
	fairy: '#fceaff'
};
const main_types = Object.keys(colors);

let totalKantoPokemon = document.querySelector(".total-kanto-pokemon");
let totalJohtoPokemon = document.querySelector(".total-johto-pokemon");
let totalHoennPokemon = document.querySelector(".total-hoenn-pokemon");
let totalSinnohPokemon = document.querySelector(".total-sinnoh-pokemon");
let totalUnovaPokemon = document.querySelector(".total-unova-pokemon");
let totalKalosPokemon = document.querySelector(".total-kalos-pokemon");
let totalAlolaPokemon = document.querySelector(".total-alola-pokemon");

//loading status of each regions
let kantoStatus = document.querySelector(".kanto-loading-status");
let johtoStatus = document.querySelector(".johto-loading-status");
let hoennStatus = document.querySelector(".hoenn-loading-status");
let sinnohStatus = document.querySelector(".sinnoh-loading-status");
let unovaStatus = document.querySelector(".unova-loading-status");
let kalosStatus = document.querySelector(".kalos-loading-status");
let alolaStatus = document.querySelector(".alola-loading-status");

let kantoRemove = document.getElementById("kanto-remove");
let johtoRemove = document.getElementById("johto-remove");
let hoennRemove = document.getElementById("hoenn-remove");
let sinnohRemove = document.getElementById("sinnoh-remove");
let unovaRemove = document.getElementById("unova-remove");
let kalosRemove = document.getElementById("kalos-remove");
let alolaRemove = document.getElementById("alola-remove");

/*
function totalStateOfLoading(i, regionTotal, regionLoadingStatus){
	if(i === regionTotal){
		regionLoadingStatus.style.color = "green";
		regionLoadingStatus.innerHTML = "Complete";
	} else {
		regionLoadingStatus.style.color = "#666666";
		regionLoadingStatus.innerHTML = " Loading...";
	}
}
*/
function removeLoadingIndicator(i, regionTotal, regionToRemove){
	if (i === regionTotal){
		let showLoadingRegion = document.getElementById("show-loading-region");
		showLoadingRegion.removeChild(regionToRemove);
	}
}


let fetchKantoPokemons = async (i) => {
	for (let i = 1; i <= kantoPokedexTotal; i++) {
		await getKantoPokemon(i);
		totalKantoPokemon.innerHTML = i;
		//totalStateOfLoading(i, kantoPokedexTotal, kantoStatus);
		removeLoadingIndicator(i, kantoPokedexTotal, kantoRemove);
	}
};
let fetchJohtoPokemons = async (i) => {
	for (let i = 152; i <= johtoPodedexTotal; i++) {
		await getJohtoPokemon(i);
		totalJohtoPokemon.innerHTML = i - kantoPokedexTotal;
		//totalStateOfLoading(i, johtoPodedexTotal, johtoStatus);
		removeLoadingIndicator(i, johtoPodedexTotal, johtoRemove);
	}
};
let fetchHoennPokemons = async (i) => {
	for (let i = 252; i <= hoennPokedexTotal; i++) {
		await getHoennPokemon(i);
		totalHoennPokemon.innerHTML = i - johtoPodedexTotal;
		//totalStateOfLoading(i, hoennPokedexTotal, hoennStatus);
		removeLoadingIndicator(i, hoennPokedexTotal, hoennRemove);
	}
};
let fetchSinnohPokemons = async (i) => {
	for (let i = 387; i <= sinnohPokedexTotal; i++) {
		await getSinnohPokemon(i);
		totalSinnohPokemon.innerHTML = i - hoennPokedexTotal;
		//totalStateOfLoading(i, sinnohPokedexTotal, sinnohStatus);
		removeLoadingIndicator(i, sinnohPokedexTotal, sinnohRemove);
	}
};
let fetchUnovaPokemons = async (i) => {
	for (let i = 494; i <= unovaPokedexTotal; i++) {
		await getUnovaPokemon(i);
		totalUnovaPokemon.innerHTML = i - sinnohPokedexTotal;
		//totalStateOfLoading(i, unovaPokedexTotal, unovaStatus);
		removeLoadingIndicator(i, unovaPokedexTotal, unovaRemove);
	}
};
let fetchKalosPokemons = async (i) => {
	for (let i = 650; i <= kalosPokedexTotal; i++) {
		await getKalosPokemon(i);
		totalKalosPokemon.innerHTML = i - unovaPokedexTotal;
		//totalStateOfLoading(i, kalosPokedexTotal, kalosStatus);
		removeLoadingIndicator(i, kalosPokedexTotal, kalosRemove);
	}
};
let fetchAlolaPokemons = async (i) => {
	for (let i = 722; i <= alolaPokedexTotal; i++) {
		await getAlolaPokemon(i);
		totalAlolaPokemon.innerHTML = i - kalosPokedexTotal;
		//totalStateOfLoading(i, alolaPokedexTotal, alolaStatus);
		removeLoadingIndicator(i, alolaPokedexTotal, alolaRemove);
	}
};

const getKantoPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createKantoPokemonCard(pokemon);
};
const getJohtoPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createJohtoPokemonCard(pokemon);
};
const getHoennPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createHoennPokemonCard(pokemon);
};
const getSinnohPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createSinnohPokemonCard(pokemon);
};
const getUnovaPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createUnovaPokemonCard(pokemon);
};
const getKalosPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createKalosPokemonCard(pokemon);
};
const getAlolaPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createAlolaPokemonCard(pokemon);
};

//Kanto
function createKantoPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	
	//const poke_types = pokemon.types[0].type.name;
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	
	const color = colors[type];
	//const color = colors[poke_types];
	pokemonEl.style.backgroundColor = color;
	
	const KantoInnerHTML = `
	<div id="poke_container" class="poke-container" onclick="selectPokemon(${pokemon.id})">
		<span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <h3 class="name">${name}</h3>
            <small class="pokemon-type">Type: <span>${poke_types}</span></small>
        </div>
	</div>
    `;
	
	pokemonEl.innerHTML = KantoInnerHTML;

	pokedexContainer.appendChild(pokemonEl);
	
}

//Johto
function createJohtoPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;
	
	const johtoInnerHTML = `
	<div onclick="selectPokemon(${pokemon.id})">
		<span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <h3 class="name">${name}</h3>
            <small class="pokemon-type">Type: <span>${poke_types}</span></small>
        </div>
	</div>
    `;
	
	pokemonEl.innerHTML = johtoInnerHTML;

	pokedexJohtoContainer.appendChild(pokemonEl);
}

//Hoenn
function createHoennPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;
	
	const hoennInnerHTML = `
	<div onclick="selectPokemon(${pokemon.id})">
		<span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <h3 class="name">${name}</h3>
            <small class="pokemon-type">Type: <span>${poke_types}</span></small>
        </div>
	</div>
    `;
	
	pokemonEl.innerHTML = hoennInnerHTML;
	pokedexHoennContainer.appendChild(pokemonEl);
}

//Sinnoh
function createSinnohPokemonCard(pokemon) {
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	
	//div parent pokemon card
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	pokemonEl.style.backgroundColor = color;
	
	//div popup modal
	const pokemonPopupDiv = document.createElement('div');
	pokemonPopupDiv.setAttribute('onclick', `selectPokemon(${pokemon.id})`);
	
	//Creates div container for artwork img
	const pokemonElImgContainer = document.createElement('div');
	pokemonElImgContainer.classList.add("img-container");
	
	//Creates img for artwork src
	const pokemonImgArt = document.createElement('img');
	pokemonImgArt.classList.add(`artwork-${pokemon.id}`);
	pokemonImgArt.src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
	
	//Creates info container
	let displayInfoDiv = document.createElement('div');
	displayInfoDiv.classList.add('info');
	
	//Creates Pokédex number
	let infoNumber = document.createElement('span');
	infoNumber.classList.add('number');
	infoNumber.innerHTML = `${pokemon.id.toString().padStart(3, '0')}`;
	
	//Creates Pokémon name 
	let infoName = document.createElement('h3');
	infoName.classList.add('name');
	infoName.innerHTML = name;
	
	//Create Pokémon type container
	let infoTypeContainer = document.createElement('small');
	infoTypeContainer.classList.add('pokemon-type');
	infoTypeContainer.innerHTML = "Type: ";
	
	//Creates Pokémon type
	let infoType = document.createElement('span');
	infoType.innerHTML = poke_types;
	
	//appendChild list
	
	//Pokémon card
	pokedexSinnohContainer.appendChild(pokemonEl);
	
	//div used to add onclick 
	pokemonEl.appendChild(pokemonPopupDiv);
	
	//Pokedex number
	pokemonPopupDiv.appendChild(infoNumber);
	
	//Image container
	pokemonPopupDiv.appendChild(pokemonElImgContainer);
	
	//Artwork
	pokemonElImgContainer.appendChild(pokemonImgArt);
	
	//Info container
	pokemonPopupDiv.appendChild(displayInfoDiv);
	
	//Pokemom name
	displayInfoDiv.appendChild(infoName);
	
	//Pokémon type container
	displayInfoDiv.appendChild(infoTypeContainer);
	
	//Pokémon type
	infoTypeContainer.appendChild(infoType);
	
	//Add missing art using if statements
	if (pokemon.id === 412){
		let artworkBurmy = document.querySelector(".artwork-412");
        artworkBurmy.src = "https://pokeres.bastionbot.org/images/pokemon/412-plant-cloak.png";  	
	}
	if (pokemon.id === 413){
		let artworkWormandam = document.querySelector(".artwork-413");
        artworkWormandam.src = "https://pokeres.bastionbot.org/images/pokemon/413-plant-cloak.png";  	
	}
	if (pokemon.id === 421){
		let artworkCherrim = document.querySelector(".artwork-421");
        artworkCherrim.src = "https://pokeres.bastionbot.org/images/pokemon/421-overcast.png";  	
	}
	if (pokemon.id === 487){
		let artworkGiratina = document.querySelector(".artwork-487");
        artworkGiratina.src = "https://pokeres.bastionbot.org/images/pokemon/487-altered.png";  	
	}
	if (pokemon.id === 492){
		let artworkShayminLand = document.querySelector(".artwork-492");
        artworkShayminLand.src = "https://pokeres.bastionbot.org/images/pokemon/492-land.png";  	
	}
}
//Unova
function createUnovaPokemonCard(pokemon) {
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	
	//div parent pokemon card
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	pokemonEl.style.backgroundColor = color;
	
	//div popup modal
	const pokemonPopupDiv = document.createElement('div');
	pokemonPopupDiv.setAttribute('onclick', `selectPokemon(${pokemon.id})`);
	
	//Creates div container for artwork img
	const pokemonElImgContainer = document.createElement('div');
	pokemonElImgContainer.classList.add("img-container");
	
	//Creates img for artwork src
	const pokemonImgArt = document.createElement('img');
	pokemonImgArt.classList.add(`artwork-${pokemon.id}`);
	pokemonImgArt.src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
	
	//Creates info container
	let displayInfoDiv = document.createElement('div');
	displayInfoDiv.classList.add('info');
	
	//Creates Pokédex number
	let infoNumber = document.createElement('span');
	infoNumber.classList.add('number');
	infoNumber.innerHTML = `${pokemon.id.toString().padStart(3, '0')}`;
	
	//Creates Pokémon name 
	let infoName = document.createElement('h3');
	infoName.classList.add('name');
	infoName.innerHTML = name;
	
	//Create Pokémon type container
	let infoTypeContainer = document.createElement('small');
	infoTypeContainer.classList.add('pokemon-type');
	infoTypeContainer.innerHTML = "Type: ";
	
	//Creates Pokémon type
	let infoType = document.createElement('span');
	infoType.innerHTML = poke_types;
	
	//appendChild list
	
	//Pokémon card
	pokedexUnovaContainer.appendChild(pokemonEl);
	
	//div used to add onclick 
	pokemonEl.appendChild(pokemonPopupDiv);
	
	//Pokedex number
	pokemonPopupDiv.appendChild(infoNumber);
	
	//Image container
	pokemonPopupDiv.appendChild(pokemonElImgContainer);
	
	//Artwork
	pokemonElImgContainer.appendChild(pokemonImgArt);
	
	//Info container
	pokemonPopupDiv.appendChild(displayInfoDiv);
	
	//Pokemom name
	displayInfoDiv.appendChild(infoName);
	
	//Pokémon type container
	displayInfoDiv.appendChild(infoTypeContainer);
	
	//Pokémon type
	infoTypeContainer.appendChild(infoType);
	
	//Add missing art using if statements
	if (pokemon.id === 585){
		let artworkDeerling = document.querySelector(".artwork-585");
        artworkDeerling.src = "https://pokeres.bastionbot.org/images/pokemon/585-spring.png";  	
	}
	if (pokemon.id === 586){
		let artworkSawbucks = document.querySelector(".artwork-586");
        artworkSawbucks.src = "https://pokeres.bastionbot.org/images/pokemon/586-spring.png";  	
	}
	if (pokemon.id === 641){
		let artworkTornadus = document.querySelector(".artwork-641");
        artworkTornadus.src = "https://pokeres.bastionbot.org/images/pokemon/641-incarnate.png";  	
	}
	if (pokemon.id === 642){
		let artworkThunderus = document.querySelector(".artwork-642");
        artworkThunderus.src = "https://pokeres.bastionbot.org/images/pokemon/642-incarnate.png";  	
	}
	if (pokemon.id === 647){
		let artworkKeldeo = document.querySelector(".artwork-647");
        artworkKeldeo.src = "https://pokeres.bastionbot.org/images/pokemon/647-ordinary.png";  	
	}
	if (pokemon.id === 648){
		let artworkMeloetta = document.querySelector(".artwork-648");
        artworkMeloetta.src = "https://pokeres.bastionbot.org/images/pokemon/648-aria.png";  	
	}
}
//Kalos
function createKalosPokemonCard(pokemon) {
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	
	//div parent pokemon card
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	pokemonEl.style.backgroundColor = color;
	
	//div popup modal
	const pokemonPopupDiv = document.createElement('div');
	pokemonPopupDiv.setAttribute('onclick', `selectPokemon(${pokemon.id})`);
	
	//Creates div container for artwork img
	const pokemonElImgContainer = document.createElement('div');
	pokemonElImgContainer.classList.add("img-container");
	
	//Creates img for artwork src
	const pokemonImgArt = document.createElement('img');
	pokemonImgArt.classList.add(`artwork-${pokemon.id}`);
	pokemonImgArt.src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
	
	//Creates info container
	let displayInfoDiv = document.createElement('div');
	displayInfoDiv.classList.add('info');
	
	//Creates Pokédex number
	let infoNumber = document.createElement('span');
	infoNumber.classList.add('number');
	infoNumber.innerHTML = `#${pokemon.id.toString().padStart(3, '0')}`;
	
	//Creates Pokémon name 
	let infoName = document.createElement('h3');
	infoName.classList.add('name');
	infoName.innerHTML = name;
	
	//Create Pokémon type container
	let infoTypeContainer = document.createElement('small');
	infoTypeContainer.classList.add('pokemon-type');
	infoTypeContainer.innerHTML = "Type: ";
	
	//Creates Pokémon type
	let infoType = document.createElement('span');
	infoType.innerHTML = poke_types;
	
	//appendChild list
	
	//Pokémon card
	pokedexKalosContainer.appendChild(pokemonEl);
	
	//div used to add onclick 
	pokemonEl.appendChild(pokemonPopupDiv);
	
	//Pokedex number
	pokemonPopupDiv.appendChild(infoNumber);
	
	//Image container
	pokemonPopupDiv.appendChild(pokemonElImgContainer);
	
	//Artwork
	pokemonElImgContainer.appendChild(pokemonImgArt);
	
	//Info container
	pokemonPopupDiv.appendChild(displayInfoDiv);
	
	//Pokemom name
	displayInfoDiv.appendChild(infoName);
	
	//Pokémon type container
	displayInfoDiv.appendChild(infoTypeContainer);
	
	//Pokémon type
	infoTypeContainer.appendChild(infoType);
	
	//Add missing art using if statements
	if (pokemon.id === 718){
		let artworkZygarde = document.querySelector(".artwork-718");
        artworkZygarde.src = "https://pokeres.bastionbot.org/images/pokemon/718-50.png";  	
	}
	if (pokemon.id === 720){
		let artworkHoopa = document.querySelector(".artwork-720");
        artworkHoopa.src = "https://pokeres.bastionbot.org/images/pokemon/720-confined.png";  	
	}
}
//Alola
function createAlolaPokemonCard(pokemon) {
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	
	//div parent pokemon card
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	pokemonEl.style.backgroundColor = color;
	
	//div popup modal
	const pokemonPopupDiv = document.createElement('div');
	pokemonPopupDiv.setAttribute('onclick', `selectPokemon(${pokemon.id})`);
	
	//Creates div container for artwork img
	const pokemonElImgContainer = document.createElement('div');
	pokemonElImgContainer.classList.add("img-container");
	
	//Creates img for artwork src
	const pokemonImgArt = document.createElement('img');
	pokemonImgArt.classList.add(`artwork-${pokemon.id}`);
	pokemonImgArt.src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
	
	//Creates info container
	let displayInfoDiv = document.createElement('div');
	displayInfoDiv.classList.add('info');
	
	//Creates Pokédex number
	let infoNumber = document.createElement('span');
	infoNumber.classList.add('number');
	infoNumber.innerHTML = `#${pokemon.id.toString().padStart(3, '0')}`;
	
	//Creates Pokémon name 
	let infoName = document.createElement('h3');
	infoName.classList.add('name');
	infoName.innerHTML = name;
	
	//Create Pokémon type container
	let infoTypeContainer = document.createElement('small');
	infoTypeContainer.classList.add('pokemon-type');
	infoTypeContainer.innerHTML = "Type: ";
	
	//Creates Pokémon type
	let infoType = document.createElement('span');
	infoType.innerHTML = poke_types;
	
	//appendChild list
	
	//Pokémon card
	pokedexAlolaContainer.appendChild(pokemonEl);
	
	//div used to add onclick 
	pokemonEl.appendChild(pokemonPopupDiv);
	
	//Pokedex number
	pokemonPopupDiv.appendChild(infoNumber);
	
	//Image container
	pokemonPopupDiv.appendChild(pokemonElImgContainer);
	
	//Artwork
	pokemonElImgContainer.appendChild(pokemonImgArt);
	
	//Info container
	pokemonPopupDiv.appendChild(displayInfoDiv);
	
	//Pokemom name
	displayInfoDiv.appendChild(infoName);
	
	//Pokémon type container
	displayInfoDiv.appendChild(infoTypeContainer);
	
	//Pokémon type
	infoTypeContainer.appendChild(infoType);
	
	//Add missing art using if statements
	if (pokemon.id === 741){
		let artworkOricorio = document.querySelector(".artwork-741");
        artworkOricorio.src = "https://pokeres.bastionbot.org/images/pokemon/741-baile.png";  	
	}
	if (pokemon.id === 745){
		let artworkLyncanrocMidday = document.querySelector(".artwork-745");
        artworkLyncanrocMidday.src = "https://pokeres.bastionbot.org/images/pokemon/745-midday.png";  	
	}
	if (pokemon.id === 746){
		let artworkWishiwashiSolo = document.querySelector(".artwork-746");
        artworkWishiwashiSolo.src = "https://pokeres.bastionbot.org/images/pokemon/746-solo.png";  
	}
	if (pokemon.id === 774){
		let artworkMiniorMeteor = document.querySelector(".artwork-774");
        artworkMiniorMeteor.src = "https://pokeres.bastionbot.org/images/pokemon/774-meteor.png";  	
	}
	if (pokemon.id === 778){
		let artworkMimickyu = document.querySelector(".artwork-778");
        artworkMimickyu.src = "https://pokeres.bastionbot.org/images/pokemon/778-disguised.png";  	
	}
}

const selectPokemon = async (id) =>{
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	displayPopup(pokemon);
};
const displayPopup = (pokemon) => {
	const poke_types = pokemon.types.map(function(type){
		return type.type.name;
	}).join(", ");
	const baseHp = pokemon.stats[0].base_stat;
	const baseAttack = pokemon.stats[1].base_stat;
	const baseDefense = pokemon.stats[2].base_stat;
	const baseSpecialAttack = pokemon.stats[3].base_stat;
	const baseSpecialDefense = pokemon.stats[4].base_stat;
	const baseSpeed = pokemon.stats[5].base_stat;
	
	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>

        	<div class="popup-info">
			<h2 class="name">${pokemon.name}</h2>
				<div id="artwork-container" onclick="selectPokemon(${pokemon.id})">
            		<img class="artwork-popup" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
        		</div>
				<div class="pokemon-data-section-popup">
					<h3>Pokédex Data</h3>
            		<p>National Pokédex <span class="number">${pokemon.id.toString().padStart(3, '0')}</span></p>
            		<p class="pokemon-type">Type: <span>${poke_types}</span></p>
					<p class="sprites">Sprites:</p>
					<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" style="background-color: rgb(0, 0, 0, 0.1); width: 25%">
					<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png" style="background-color: rgb(0, 0, 0, 0.1); width: 25%">
				</div>
				
				<div class="pokemon-base-stat-section-popup">
				<h3>Base Stats</h3>
					<p>HP: <span>${baseHp}</span></p>
					<p>Attack: <span>${baseAttack}</span></p>
					<p>Defense: <span>${baseDefense}</span></p>
					<p>Special Attack: <span>${baseSpecialAttack}</span></p>
					<p>Special Defense: <span>${baseSpecialDefense}</span></p>
					<p>Speed: <span>${baseSpeed}</span></p>
				</div>
        	</div>
		</div>
	`;
	
	//Popup that displays extra information on the Pokémon you click
	const popupDisplayAll = document.getElementById("popup-display-all");
	popupDisplayAll.innerHTML = htmlString;
	
	const type = main_types.find(type => poke_types.indexOf(type) === 0);
	const color = colors[type];
	popupDisplayAll.style.backgroundColor = color;
	
	//Add missing art
	
	//Sinnoh
	if (pokemon.id === 412){
		let artworkBurmy = document.querySelector(".artwork-popup");
        artworkBurmy.src = "https://pokeres.bastionbot.org/images/pokemon/412-plant-cloak.png";  	
	}
	if (pokemon.id === 413){
		let artworkWormandam = document.querySelector(".artwork-popup");
        artworkWormandam.src = "https://pokeres.bastionbot.org/images/pokemon/413-plant-cloak.png";  	
	}
	if (pokemon.id === 421){
		let artworkCherrim = document.querySelector(".artwork-popup");
        artworkCherrim.src = "https://pokeres.bastionbot.org/images/pokemon/421-overcast.png";  	
	}
	if (pokemon.id === 487){
		let artworkGiratina = document.querySelector(".artwork-popup");
        artworkGiratina.src = "https://pokeres.bastionbot.org/images/pokemon/487-altered.png";  	
	}
	if (pokemon.id === 492){
		let artworkShayminLand = document.querySelector(".artwork-popup");
        artworkShayminLand.src = "https://pokeres.bastionbot.org/images/pokemon/492-land.png";  	
	}
	
	//Unova
	if (pokemon.id === 585){
		let artworkDeerling = document.querySelector(".artwork-popup");
        artworkDeerling.src = "https://pokeres.bastionbot.org/images/pokemon/585-spring.png";  	
	}
	if (pokemon.id === 586){
		let artworkSawbucks = document.querySelector(".artwork-popup");
        artworkSawbucks.src = "https://pokeres.bastionbot.org/images/pokemon/586-spring.png";  	
	}
	if (pokemon.id === 641){
		let artworkTornadus = document.querySelector(".artwork-popup");
        artworkTornadus.src = "https://pokeres.bastionbot.org/images/pokemon/641-incarnate.png";  	
	}
	if (pokemon.id === 642){
		let artworkThunderus = document.querySelector(".artwork-popup");
        artworkThunderus.src = "https://pokeres.bastionbot.org/images/pokemon/642-incarnate.png";
	}
	if (pokemon.id === 647){
		let artworkKeldeo = document.querySelector(".artwork-popup");
        artworkKeldeo.src = "https://pokeres.bastionbot.org/images/pokemon/647-ordinary.png";  	
	}
	if (pokemon.id === 648){
		let artworkMeloetta = document.querySelector(".artwork-popup");
        artworkMeloetta.src = "https://pokeres.bastionbot.org/images/pokemon/648-aria.png";  	
	}
	
	//Kalos
	if (pokemon.id === 718){
		let artworkZygarde = document.querySelector(".artwork-popup");
        artworkZygarde.src = "https://pokeres.bastionbot.org/images/pokemon/718-50.png";  	
	}
	if (pokemon.id === 720){
		let artworkHoopa = document.querySelector(".artwork-popup");
        artworkHoopa.src = "https://pokeres.bastionbot.org/images/pokemon/720-confined.png";  	
	}
	
	//Alola
	if (pokemon.id === 741){
		let artworkOricorio = document.querySelector(".artwork-popup");
        artworkOricorio.src = "https://pokeres.bastionbot.org/images/pokemon/741-baile.png";  	
	}
	if (pokemon.id === 745){
		let artworkLyncanrocMidday = document.querySelector(".artwork-popup");
        artworkLyncanrocMidday.src = "https://pokeres.bastionbot.org/images/pokemon/745-midday.png";  	
	}
	if (pokemon.id === 746){
		let artworkWishiwashiSolo = document.querySelector(".artwork-popup");
        artworkWishiwashiSolo.src = "https://pokeres.bastionbot.org/images/pokemon/746-solo.png";  	
	}
	if (pokemon.id === 774){
		let artworkMiniorMeteor = document.querySelector(".artwork-popup");
        artworkMiniorMeteor.src = "https://pokeres.bastionbot.org/images/pokemon/774-meteor.png";  	
	}
	if (pokemon.id === 778){
		let artworkMimickyu = document.querySelector(".artwork-popup");
        artworkMimickyu.src = "https://pokeres.bastionbot.org/images/pokemon/778-disguised.png";  	
	}
};

const closePopup = () =>{
	let popup = document.querySelector('.popup');
	popup.parentNode.removeChild(popup);
}
fetchKantoPokemons();
fetchJohtoPokemons();
fetchHoennPokemons();
fetchSinnohPokemons();
fetchUnovaPokemons();
fetchKalosPokemons();
fetchAlolaPokemons();
