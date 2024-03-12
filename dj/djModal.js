document.addEventListener('DOMContentLoaded', function() {
    let djProfile = {
        name: "DJ Yosh",
        genre: "Electronic/R&B",
        yearsExperience: 5
    };
    var modal = document.getElementById("djModal");
    var btn = document.getElementById("meet-dj-button");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        var djName = document.getElementById("dj-name");
        var djGenre = document.getElementById("dj-genre");
        var djExperience = document.getElementById("dj-experience");

        djName.textContent = `Name: ${djProfile.name}`;
        djGenre.textContent = `Genre: ${djProfile.genre}`;
        djExperience.textContent = `Experience: ${djProfile.yearsExperience} years`;

        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
  });
  