export const setMute = (mute, player) => {
    mute.addEventListener("click", () => {
    if (player.muted) {
      mute.innerHTML = "Mute";
      player.muted = false;
      player.play();
    } else {
      mute.innerHTML = "Unmute";
      player.muted = true;
      player.pause();
    }
  });
};
