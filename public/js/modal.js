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

  const addDjBtn = document.querySelector("#add-dj-btn");
  const addModal = document.querySelector("#add-dj-modal");
  addDjBtn.onclick = function () {
    addModal.style.display = "block";
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
    if (event.target == addModal) {
      addModal.style.display = "none";
    }
  };

  const addDjForm = document.getElementById("add-dj-modal-form");
  addDjForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fname = document.getElementById("dj-fname");
    const lname = document.getElementById("dj-lname");
    if (fname.value.length >= 20 || lname.value.length >= 20) {
      const errorBanner = document.getElementById("dj-form-error");
      errorBanner.style.display = "block";
    } else {
      addDjForm.submit();
    }
  });
});
