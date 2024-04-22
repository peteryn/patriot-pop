const DEBUG = true;

function getCookieDict() {
  const data = document.cookie;
  const cookies = data.split(";");
  const cookieDict = {};
  for (let cookie of cookies) {
    const temp = cookie.split("=");
    cookieDict[temp[0].trim()] = temp[1].trim();
  }
  return cookieDict;
}

function calculateNextDayExpiry() {
  const dayInSec = 24 * 60 * 60 * 1000;
  const estShift = 5 * 60 * 60 * 1000;

  let currentDayCount = 19839;
  if (!DEBUG) {
    currentDayCount = Math.floor(Date.now() / dayInSec);
  }

  const today = new Date(currentDayCount * dayInSec + estShift);
  const expiresDate = new Date(today.getTime() + 1 * dayInSec);
  return expiresDate;
}

document.addEventListener("DOMContentLoaded", () => {
  const dayInSec = 24 * 60 * 60 * 1000;
  const estShift = 5 * 60 * 60 * 1000;
  let currentDayCount = 19839;
  if (!DEBUG) {
    currentDayCount = Math.floor(Date.now() / dayInSec);
  }

  const today = new Date(currentDayCount * dayInSec + estShift);
  const expiresDate = new Date(today.getTime() + 1 * dayInSec);
  if (document.cookie === "") {
    document.cookie = `currentDayCount=${currentDayCount};expires=${expiresDate}`;
  }
  const cookieDict = getCookieDict();
  if (!cookieDict.hasOwnProperty("currentDayCount")) {
    console.log("hello");
    document.cookie = `currentDayCount=${currentDayCount};expires=${expiresDate}`;
  }
});

export { getCookieDict, calculateNextDayExpiry };
