document.addEventListener("DOMContentLoaded", () => {
  const hoverSound = document.getElementById("hover-sound");
  const clickSound = document.getElementById("click-sound");

  const soundToggle = document.getElementById("sound-toggle");
  const volumeSlider = document.getElementById("volume-slider");

  // ALZA IL VOLUME DEFAULT
  hoverSound.volume = 0.6;
  clickSound.volume = 0.6;

  // SBLOCCA AUDIO ALLA PRIMA INTERAZIONE
  const unlockAudio = () => {
    hoverSound.muted = false;
    clickSound.muted = false;

    window.removeEventListener("mousemove", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("scroll", unlockAudio);
  };

  window.addEventListener("mousemove", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
  window.addEventListener("scroll", unlockAudio);

  // HOVER SOUND (NAVBAR, SOCIAL ICONS, POKEBALL, ECC.)
  document
    .querySelectorAll("[data-sfx-hover], [data-hover-sound]")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
      });
    });

  // CLICK SOUND + REDIRECT
  document.querySelectorAll("[data-sfx-click]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault(); // blocca default per poter suonare il click prima del redirect
      clickSound.currentTime = 0;
      clickSound.play();

      const url = el.getAttribute("href");
      if (url) {
        // redirect leggermente ritardato per far sentire il click
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }
    });
  });

  // SOUND TOGGLE BUTTON
  soundToggle.addEventListener("click", () => {
    const isMuted = hoverSound.muted;

    hoverSound.muted = !isMuted;
    clickSound.muted = !isMuted;

    soundToggle.textContent = isMuted ? "🔈 Sound ON" : "🔇 Sound OFF";
  });

  // VOLUME SLIDER
  volumeSlider.addEventListener("input", () => {
    const v = volumeSlider.value;
    hoverSound.volume = v;
    clickSound.volume = v;
  });
});
