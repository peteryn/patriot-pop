document.addEventListener("DOMContentLoaded", () => {
  const repeatSongs = true;
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
    return d;
  };

  const djPlayed = document.getElementById("dps-song-box");

  if (repeatSongs != false) {
    let i = 0;
    for (i = 0; i < 23; i++) {
      producerNotPlayed.appendChild(createSongElement(ncsSong));
    }

    i = 0;
    while (i < 10) {
      djPlayed.appendChild(createSongElement(ncsSong));
      i++;
    }
  }

  function Song(name, artist, path) {
    this.artist = artist;
    this.name = name;
    this.path = path;
  }

  Song.prototype.createDOMElement = () => {
    const d = document.createElement("div");
    d.className = "song";
    const img = document.createElement("img");
    img.src = `${this.path}`;
    d.appendChild(img);
    const d2 = document.createElement("div");
    d2.className = "song-text";
    const p = document.createElement("p");
    p.textContent = `${this.artist} - ${this.name}`;
    d2.appendChild(p);
    d.appendChild(d2);
    return d;
  }

  const newSongs = [];
  newSongs.push(new Song("Karma", "Ariadne", "../images/ncs.jpg"))
  console.log(newSongs);


});
