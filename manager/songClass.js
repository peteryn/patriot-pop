class Song {
    constructor(name, artist, path) {
        this.name = name;
        this.artist = artist;
        this.path = path;
    }

    createDOMElement() {
        const d = document.createElement("div");
        d.className = "song";
        const img = document.createElement("img");
        img.src = `${this.path}`;
        d.appendChild(img);
        const d1 = document.createElement("div");
        d1.className = "song-text";
        const p = document.createElement("p");
        p.textContent = `${this.artist} - ${this.name}`;
        d1.appendChild(p);
        d.appendChild(d1);
        return d;
    }
}

function getNewSongs() {
    const newSongs = [];
    newSongs.push(new Song("Karma", "Ariadne", "../images/karma.png"));
    newSongs.push(new Song("pretty afternoon", "Andrah", "../images/pretty.png"));
    newSongs.push(new Song("Galactic", "Natty Lou", "../images/galactic.png"));
    newSongs.push(new Song("apart", "sumu", "../images/sumu.png"));
    return newSongs;
}

function capitalizeSongs(songs) {
    for (let song of songs) {
        song.name = capitalizeWords(song.name)
        song.artist = capitalizeWords(song.artist)
    }
}

function capitalizeWords(words) {
    words = words.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }
    return words.join(" ");
}

export {Song, getNewSongs, capitalizeSongs}