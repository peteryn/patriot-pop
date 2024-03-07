document.addEventListener("DOMContentLoaded", () => {
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
    dateRange.textContent = `${daysFormat[0]} - ${daysFormat[2]}`;
    nextDay.textContent = daysFormat[1];
    nextNextDay.textContent = daysFormat[2];

    // update modal
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

  let currentDayCount = setDates(0);
  const nextDayBtn = document.getElementById("next-day-btn");
  nextDayBtn.addEventListener("click", (e) => {
    currentDayCount = setDates(++currentDayCount);
  });
  const prevDayBtn = document.getElementById("prev-day-btn");
  prevDayBtn.addEventListener("click", (e) => {
    currentDayCount = setDates(--currentDayCount);
  });
});
