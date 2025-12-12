document.addEventListener("DOMContentLoaded", () => {
  let soundEnabled = false;
  let globalVolume = 0.6;

  const toggleBtn = document.getElementById("sound-toggle");
  const volumeSlider = document.getElementById("volume-slider");

  const preScreen = document.getElementById("pre-sound-screen");
  const btnYes = document.getElementById("sound-yes");
  const btnNo = document.getElementById("sound-no");

  // Controlla se l’utente ha già scelto
  const storedChoice = localStorage.getItem("soundEnabled");
  if (storedChoice !== null) {
    soundEnabled = storedChoice === "true";
    preScreen.style.display = "none";
  }

  // Funzione per riprodurre suoni
  const audioCache = {};
  document
    .querySelectorAll("[data-sfx-hover], [data-sfx-click]")
    .forEach((el) => {
      const hoverFile = el.dataset.sfxHover;
      const clickFile = el.dataset.sfxClick;

      if (hoverFile && !audioCache[hoverFile]) {
        audioCache[hoverFile] = new Audio(`js/sounds/${hoverFile}`);
      }
      if (clickFile && !audioCache[clickFile]) {
        audioCache[clickFile] = new Audio(`js/sounds/${clickFile}`);
      }
    });

  function playSFX(file) {
    if (!soundEnabled || !file) return;
    const audio = audioCache[file].cloneNode();
    audio.volume = globalVolume;
    audio.play().catch(() => {});
  }

  document.querySelectorAll("[data-sfx-click]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const file = el.dataset.sfxClick;
      if (file && soundEnabled) {
        const audio = new Audio(`js/sounds/${file}`);
        audio.volume = globalVolume;
        audio.play();
      }

      // Se il link ha href, aspetta che il suono inizi prima di navigare
      if (el.tagName === "A") {
        e.preventDefault(); // blocca la navigazione immediata
        const href = el.href;
        setTimeout(() => {
          window.location.href = href;
        }, 300); // 300ms danno tempo al suono di partire
      }
    });
  });

  // Hover / click
  document.querySelectorAll("[data-sfx-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => playSFX(el.dataset.sfxHover));
  });
  document.querySelectorAll("[data-sfx-click]").forEach((el) => {
    el.addEventListener("click", () => playSFX(el.dataset.sfxClick));
  });

  // Toggle button (eventuale)
  toggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    toggleBtn.textContent = soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF";
    localStorage.setItem("soundEnabled", soundEnabled);
  });

  // Slider volume
  volumeSlider.addEventListener("input", () => {
    globalVolume = parseFloat(volumeSlider.value);
  });

  // Gestione scelta pre-screen
  btnYes.addEventListener("click", () => {
    soundEnabled = true;
    localStorage.setItem("soundEnabled", "true");
    preScreen.style.display = "none";
  });

  btnNo.addEventListener("click", () => {
    soundEnabled = false;
    localStorage.setItem("soundEnabled", "false");
    preScreen.style.display = "none";
  });
});
