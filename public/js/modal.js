import { getCookieDict, calculateNextDayExpiry } from "./cookie.js";
import { updateTimeTable } from "./timetable.js";

document.addEventListener("DOMContentLoaded", function () {
  const scheduleDjBtn = document.querySelector("#schedule-dj-btn");
  const modal = document.querySelector("#schedule-dj-modal");

  scheduleDjBtn.onclick = function () {
    modal.style.display = "block";
  };

  const modalCancel = document.querySelector("#modal-cancel");
  modalCancel.onclick = function () {
    modal.style.display = "none";
  };

  const modalSubmit = document.querySelector("#modal-submit");
  modalSubmit.onclick = function () {
    modal.style.display = "none";
  };

  const addModalCancel = document.querySelector("#add-dj-btn-cancel");
  addModalCancel.onclick = function () {
    addModal.style.display = "none";
  };
  // const addModalSubmit = document.querySelector("#add-dj-btn-submit");
  // addModalSubmit.onclick = function () {
  //   addModal.style.display = "none";
  // };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const modalForm = document.getElementById("modal-form");
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dj = document.getElementById("dj-select");
    const djColor = this.getElementById("dj-color");
    const djDate = this.getElementById("dj-date");
    const djTimeslot = this.getElementById("dj-timeslot");
    const data = {
      djs: dj.value,
      djColor: djColor.value,
      djDate: djDate.value,
      djTimeslot: djTimeslot.value,
    };

    await fetch("/manager/adddj", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const cookieDict = getCookieDict();
    const currentDayNumber = parseInt(cookieDict.currentDayCount);
    updateTimeTable(currentDayNumber);

    modal.style.display = "none";
    
  });
});
