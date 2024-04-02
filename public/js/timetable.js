document.addEventListener("DOMContentLoaded", () => {
  async function fetchDayData(dayNumber) {
    try {
      const response = await fetch(`/api/day/${dayNumber}`);
      if (!response.ok) {
        throw new Error("timetable.js line_6. Error fetching timetable");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "timetable.js line_11. Error fetching DATA from timetable",
        error
      );
    }
  }

  function generateTimeslotCard(timeslot) {
    const card = document.createElement("article");
    card.className = "dj-card";

    const songList = document.createElement("div");
    songList.className = "dj-card-song-list scroll-style";

    timeslot.producerAssignedSongs.forEach((song) => {
      const songDiv = document.createElement("div");
      songDiv.className = "song-alt";

      const img = document.createElement("img");
      img.src = `../images/${song.albumPictureName}`;
      img.alt = song.songTitle;

      const songTextDiv = document.createElement("div");
      songTextDiv.className = "song-text";

      const songP = document.createElement("p");
      songP.textContent = `${song.artist} - ${song.songTitle}`;

      //Only for producer will integrate better later >>
      const removeBtn = document.createElement("img");
      removeBtn.src = "../images/delete_button.png";
      removeBtn.alt = "Remove song";
      removeBtn.className = "right-of-text";
      removeBtn.onclick = function() { removeSong(songDiv); };

      songDiv.appendChild(removeBtn);
      songList.appendChild(songDiv);

      //Only for producer will integrate better later ^^

      songTextDiv.appendChild(songP);
      songDiv.appendChild(img);
      songDiv.appendChild(songTextDiv);

      songList.appendChild(songDiv);
    });

    const djInfo = document.createElement("div");
    djInfo.className = "dj-info";

    const djName = document.createElement("h4");
    djName.textContent = timeslot.dj;

    djInfo.appendChild(djName);

    card.appendChild(songList);
    card.appendChild(djInfo);

    return card;
  }

  async function updateTimetableForDay(dayNumber) {
    const dayData = await fetchDayData(dayNumber);

    if (!dayData || dayData.length === 0) {
      console.error("No data found for day", dayNumber);
      return;
    }

    const slots = ["slot1", "slot2", "slot3"]; //our 3-fixed slots format from days.json
    slots.forEach((slot, index) => {
      const containerId = `slot-${index + 1}`; // IDK if this is pulling container_ID this way actully will work; We will prob need to make changes to html to accomodate for 3: slot-1, slot-2, slot-3
      const container = document.getElementById(containerId);

      if (container && dayData[slot]) {
        if (dayData[slot].dj != null) {
          container.innerHTML = "";
          const timeslotCard = generateTimeslotCard(dayData[slot]);
          container.appendChild(timeslotCard);
        }
      }
    });
  }

  const currentDayNumber = 19814;
  updateTimetableForDay(currentDayNumber); //do I need to initialize here?? imma do it anyways

  function setDates(currentDayCount) {
    const dayInSec = 24 * 60 * 60 * 1000;
    const estShift = 5 * 60 * 60 * 1000;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (currentDayCount == 0) {
      currentDayCount = Math.floor(Date.now() / dayInSec);
    }
    console.log(currentDayCount);

    const dateRange = document.getElementById("date-range");
    const currentDay = document.getElementById("current-day");
    const nextDay = document.getElementById("next-day");
    const nextNextDay = document.getElementById("next-next-day");

    const today = new Date(currentDayCount * dayInSec + estShift);
    const todayp1 = new Date(today.getTime() + 1 * dayInSec);
    const todayp2 = new Date(today.getTime() + 2 * dayInSec);

    const days = [today, todayp1, todayp2];
    const daysFormat = days.map(
      (d) => `${months[d.getMonth()]} ${d.getDate()}`
    );

    currentDay.textContent = daysFormat[0];
    dateRange.textContent = `${daysFormat[0]} - ${daysFormat[2]}`;
    nextDay.textContent = daysFormat[1];
    nextNextDay.textContent = daysFormat[2];

    updateTimetableForDay(currentDayCount);

    // // update modal
    const dateFormSelect = document.getElementById("dj-date");
    const daysOptions = days.map(
      (d) =>
        `<option value="${d.getTime()}">${
          months[d.getMonth()]
        } ${d.getDate()}</option>`
    );
    dateFormSelect.innerHTML = daysOptions.join("");

    return currentDayCount;
  }

  // let user click on arrows to navigate days
  let currentDayCount = setDates(currentDayNumber);
  const nextDayBtn = document.getElementById("next-day-btn");
  nextDayBtn.addEventListener("click", (e) => {
    console.log("line 147")
    currentDayCount = setDates(++currentDayCount);
  });
  const prevDayBtn = document.getElementById("prev-day-btn");
  prevDayBtn.addEventListener("click", (e) => {
    currentDayCount = setDates(--currentDayCount);
  });

  // let user use arrow keys to navigate days
  document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowLeft") {
      currentDayCount = setDates(--currentDayCount);
    }
    if (e.key == "ArrowRight") {
      currentDayCount = setDates(++currentDayCount);
    }
  });

  // let user enlarge dj names
  const djNames = document.querySelectorAll(".dj-info h4");
  for (let dj of djNames) {
    dj.addEventListener("dblclick", (e) => {
      let fontSize = dj.style.fontSize;
      fontSize = fontSize.slice(0, -2);

      if (fontSize == 16 || "") {
        dj.style.fontSize = "24px";
      } else if (fontSize == 24) {
        dj.style.fontSize = "32px";
      } else {
        dj.style.fontSize = "16px";
      }
    });
  }
});
