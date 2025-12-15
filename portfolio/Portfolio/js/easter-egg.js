console.log("Easter Egg JS loaded");

// Lista Pokémon con probabilità e chance di cattura
const pokemonPool = [
  {
    name: "Pikachu",
    img: "img/pokemon/pikachu.png",
    chance: 30,
    catchRate: 0.8,
  },
  {
    name: "Shiny Pikachu",
    img: "img/pokemon/pikachu-shiny.png",
    chance: 15,
    catchRate: 0.5,
  },
  {
    name: "Bulbasaur",
    img: "img/pokemon/bulbasaur.png",
    chance: 30,
    catchRate: 0.75,
  },
  {
    name: "Charmander",
    img: "img/pokemon/charmander.png",
    chance: 30,
    catchRate: 0.7,
  },
  {
    name: "Squirtle",
    img: "img/pokemon/squirtle.png",
    chance: 18,
    catchRate: 0.7,
  },
  {
    name: "Alakazam",
    img: "img/pokemon/alakazam.png",
    chance: 20,
    catchRate: 0.5,
  },
  {
    name: "Gengar Shiny",
    img: "img/pokemon/gengar-shiny.png",
    chance: 8,
    catchRate: 0.2,
  },
  {
    name: "Shiny Gyarados",
    img: "img/pokemon/gyarados-shiny.png",
    chance: 10,
    catchRate: 0.25,
  },
  {
    name: "Psyduck",
    img: "img/pokemon/psyduck.png",
    chance: 25,
    catchRate: 0.6,
  },
  {
    name: "Shiny Psyduck",
    img: "img/pokemon/psyduck-shiny.png",
    chance: 12,
    catchRate: 0.3,
  },
  { name: "Mew", img: "img/pokemon/mew.png", chance: 3, catchRate: 0.06 }, // Easter Egg raro
  {
    name: "Shiny Mew",
    img: "img/pokemon/mew-shiny.png",
    chance: 1,
    catchRate: 0.03,
  }, // Super raro
];

// Selezione elementi DOM
const catchButton = document.getElementById("catch-button");
const pokemonContainer = document.getElementById("pokemon-container");
const surpriseText = document.querySelector(".surprise-text");

let currentPokemon = spawnPokemon();
renderPokemon(currentPokemon);

// Funzione per spawn casuale con probabilità
function spawnPokemon() {
  const totalChance = pokemonPool.reduce((sum, p) => sum + p.chance, 0);
  const rand = Math.random() * totalChance;

  let cumulative = 0;
  for (const pokemon of pokemonPool) {
    cumulative += pokemon.chance;
    if (rand <= cumulative) return pokemon;
  }

  return pokemonPool[0]; // fallback
}

// Funzione per renderizzare Pokémon nel DOM
function renderPokemon(pokemon) {
  pokemonContainer.innerHTML = `
    <img src="${pokemon.img}" alt="${pokemon.name}" class="pokemon-sprite" />
    <h3 class="pixelify-sans">${pokemon.name}</h3>
  `;
}

// Event listener per il click
catchButton.addEventListener("click", () => {
  const rand = Math.random();
  if (rand <= currentPokemon.catchRate) {
    surpriseText.innerText = `You caught ${currentPokemon.name}!`;
    surpriseText.style.color = "green";
  } else {
    surpriseText.innerText = `${currentPokemon.name} escaped!`;
    surpriseText.style.color = "red";
  }

  // Spawn un nuovo Pokémon dopo ogni click
  currentPokemon = spawnPokemon();
  renderPokemon(currentPokemon);
});
