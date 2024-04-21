import { getCookieDict } from "./cookie.js";

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

function generateSongElement(song) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "song";
  const albumImg = document.createElement("img");
  albumImg.src = `/images/${song.albumPictureName}`;
  const innerDiv = document.createElement("div");
  innerDiv.className = "song-text";
  const p = document.createElement("p");
  p.innerText = `${song.artist} - ${song.songTitle}`;
  innerDiv.appendChild(p);
  wrapperDiv.appendChild(albumImg);
  wrapperDiv.appendChild(innerDiv);
  return wrapperDiv;
}

function populateReport(fieldId, listOfSongs) {
  const container = document.getElementById(fieldId);
  container.innerHTML = "";
  for (let song of listOfSongs) {
    container.appendChild(generateSongElement(song));
  }
}

function getIntersection(arr1, arr2) {
  // find out which array is bigger and set that to arr1
  if (arr1.length < arr2.length) {
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }

  // for every item in arr1, check if that item is also in arr2
  // if it is, add it to output arr
  const intersection = [];
  for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i].songTitle;
    for (let j = 0; j < arr2.length; j++) {
      if (item === arr2[j].songTitle) {
        intersection.push(arr1[i]);
      }
    }
  }

  return intersection;
}

function getNonIntersection(arr, intersection) {
  // return everything in arr that is not in intersection
  const nonIntersection = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].songTitle;
    let inIntersection = false;
    for (let j = 0; j < intersection.length; j++) {
      if (intersection[j].songTitle === item) {
        inIntersection = true;
        break;
      }
    }
    if (!inIntersection) {
      nonIntersection.push(arr[i]);
    }
  }

  return nonIntersection;
}

function generateReport(producerAssigned, djPlayed) {
  const intersection = getIntersection(producerAssigned, djPlayed);
  const producerAssignedDjNotPlayed = getNonIntersection(
    producerAssigned,
    intersection
  );
  const djPlayedNotAssigned = getNonIntersection(djPlayed, intersection);
  return [producerAssignedDjNotPlayed, intersection, djPlayedNotAssigned];
}

function getAllProducerAssigned(dayData) {
  const a1 = dayData.slot1.producerAssignedSongs;
  const a2 = dayData.slot2.producerAssignedSongs;
  const a3 = dayData.slot3.producerAssignedSongs;
  return concatNotNull(a1, a2, a3);
}

function getAllDjAssigned(dayData) {
  const a1 = dayData.slot1.djPlayedSongs;
  const a2 = dayData.slot2.djPlayedSongs;
  const a3 = dayData.slot3.djPlayedSongs;
  return concatNotNull(a1, a2, a3);
}

function concatNotNull(a1, a2, a3) {
  let result = [];
  if (a1 != null) {
    result = result.concat(a1);
  }
  if (a2 != null) {
    result = result.concat(a2);
  }
  if (a3 != null) {
    result = result.concat(a3);
  }
  // result = new Set(result);
  // result = new Array(result);
  return result;
}

function makeUnique(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let inResult = false;
    for (let j = 0; j < result.length; j++) {
      if (arr[i].songTitle === result[j].songTitle) {
        inResult = true;
        break;
      }
    }
    if (!inResult) {
      result.push(arr[i]);
    }
  }
  return result;
}

async function populateAll() {
  const cookieDict = getCookieDict();
  const dayNumber = parseInt(cookieDict.currentDayCount);
  console.log(`inside report ${dayNumber}`);
  // const dayNumber = 19839; // TODO use real time when in production
  const data = await fetchDayData(dayNumber);
  const producerAssignedSongs = getAllProducerAssigned(data);
  const djPlayedSongs = getAllDjAssigned(data);
  // console.log(producerAssignedSongs)
  // TODO: need to combine the song information from all three timeslots
  // then pass into generate report
  const report = generateReport(producerAssignedSongs, djPlayedSongs);
  let [producerAssignedNotPlayed, producerAndDjPlayed, djPlayedNotAssigned] =
    report;
  makeUnique(producerAndDjPlayed);
  producerAssignedNotPlayed = makeUnique(producerAssignedNotPlayed);
  producerAndDjPlayed = makeUnique(producerAndDjPlayed);
  djPlayedNotAssigned = makeUnique(djPlayedNotAssigned);

  // console.log(producerAssignedNotPlayed)
  // console.log(producerAndDjPlayed)
  // console.log(djPlayedNotAssigned)
  populateReport("pnp-song-box", producerAssignedNotPlayed);
  populateReport("dps-song-box", producerAndDjPlayed);
  populateReport("notdj-song-box", djPlayedNotAssigned);

  const reportTitle = document.getElementById("report-title");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayInSec = 24 * 60 * 60 * 1000;
  const estShift = 5 * 60 * 60 * 1000;
  const today = new Date(dayNumber * dayInSec + estShift);
  reportTitle.innerText = `${months[today.getMonth()]} ${today.getDate()}'s Report`
}

document.addEventListener("DOMContentLoaded", async () => {
  populateAll();
});

export { populateAll };
