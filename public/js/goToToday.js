document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("today");
  btn.addEventListener("click", (e) => {
    // demonstration purposes
    // e.preventDefault();
    document.cookie = `currentDayCount=0; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  });
});
