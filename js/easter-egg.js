console.log("Easter Egg JS loaded");

// ================================
// Pokémon Pool
// ================================
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
  { name: "Mew", img: "img/pokemon/mew.png", chance: 3, catchRate: 0.06 },
  {
    name: "Shiny Mew",
    img: "img/pokemon/mew-shiny.png",
    chance: 1,
    catchRate: 0.03,
  },
];

// ================================
// DOM Elements
// ================================
const catchButton = document.getElementById("catch-button");
const pokemonContainer = document.getElementById("pokemon-container");
const surpriseText = document.querySelector(".surprise-text");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const clickSound = document.getElementById("click-sound");

// ================================
// Funzioni
// ================================
function spawnPokemon() {
  const totalChance = pokemonPool.reduce((sum, p) => sum + p.chance, 0);
  const rand = Math.random() * totalChance;
  let cumulative = 0;
  for (const p of pokemonPool) {
    cumulative += p.chance;
    if (rand <= cumulative) return p;
  }
  return pokemonPool[0];
}

function renderPokemon(pokemon) {
  pokemonContainer.innerHTML = `
    <img src="${pokemon.img}" alt="${pokemon.name}" class="pokemon-sprite" />
    <h3 class="pixelify-sans">${pokemon.name}</h3>
  `;
}

// ================================
// Gestione Spawn e Click
// ================================
let currentPokemon = spawnPokemon();
renderPokemon(currentPokemon);

function screenFlash() {
  const flash = document.getElementById("screen-flash");
  if (!flash) return;

  flash.classList.add("flash-active");
  flash.addEventListener(
    "animationend",
    () => flash.classList.remove("flash-active"),
    { once: true }
  );
}

function shakeCard(card) {
  card.classList.add("shake");
  card.addEventListener("animationend", () => card.classList.remove("shake"), {
    once: true,
  });
}

function specialMewEffect(card) {
  card.classList.add("mew-effect");
  card.addEventListener(
    "animationend",
    () => card.classList.remove("mew-effect"),
    { once: true }
  );
}

catchButton.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  const img = document.querySelector(".pokemon-sprite");
  const rand = Math.random();

  if (rand <= currentPokemon.catchRate) {
    // SUCCESSO
    surpriseText.innerText = `You caught ${currentPokemon.name}!`;
    surpriseText.style.color = "green";
    winSound.currentTime = 0;
    winSound.play();

    screenFlash();

    if (currentPokemon.name === "Mew" || currentPokemon.name === "Shiny Mew") {
      specialMewEffect(img); // ✨ combo rara
    }

    img.style.animation = "spawn 1.2s ease-out forwards";
  } else {
    // FALLIMENTO
    surpriseText.innerText = `${currentPokemon.name} escaped!`;
    surpriseText.style.color = "red";
    loseSound.currentTime = 0;
    loseSound.play();

    shakeCard(pokemonContainer);
  }

  setTimeout(() => {
    currentPokemon = spawnPokemon();
    renderPokemon(currentPokemon);
  }, 3500);
});
