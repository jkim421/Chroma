export const setMute = () => {
  const player = document.getElementById("music-player");
  const musicToggle = document.getElementById("music-btn");
  const musicOn = document.getElementById("music-on");
  const musicOff = document.getElementById("music-off");

  musicOn.style.visibility = "hidden";

  musicToggle.addEventListener("click", () => {
    if (player.muted) {
      musicOn.style.visibility = "visible";
      musicOff.style.visibility = "hidden";
      player.muted = false;
      player.play();
    } else {
      musicOn.style.visibility = "hidden";
      musicOff.style.visibility = "visible";
      player.muted = true;
      player.pause();
    }
  });
};
