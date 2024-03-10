document.addEventListener("DOMContentLoaded", () => {
  const producerNotPlayed = document.getElementById("pnp-song-box");
  let ncsSong = {
    artist: "T & Sugah x Primate",
  };
  ncsSong.path = "../images/ncs.jpg";
  ncsSong.name = "Set Me Free";

  const createSongElement = (song) => {
    const d = document.createElement("div");
    d.className = "song";
    const img = document.createElement("img");
    img.src = `${song.path}`;
    d.appendChild(img);
    const d2 = document.createElement("div");
    d2.className = "song-text";
    const p = document.createElement("p");
    p.textContent = `${song.artist} - ${song.name}`;
    d2.appendChild(p);
    d.appendChild(d2);
    return d
  }
  for (i = 0; i < 23; i++) {
    producerNotPlayed.appendChild(createSongElement(ncsSong));
  }
});
