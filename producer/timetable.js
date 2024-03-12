document.addEventListener("DOMContentLoaded", () => {
    const dayInMs = 86400000; //day in milli
    let currentDayIndex = Math.floor((Date.now() + 18000000) / dayInMs);

    function updateUI() {
        const baseDate = new Date(currentDayIndex * dayInMs);
        const formatDate = (date) => `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()]} ${date.getDate()}`;

        document.getElementById("date-range").textContent = `${formatDate(baseDate)} - ${formatDate(new Date(baseDate.getTime() + 2 * dayInMs))}`;
        document.getElementById("current-day").textContent = formatDate(new Date(baseDate.getTime() + dayInMs));
        document.getElementById("next-day").textContent = formatDate(new Date(baseDate.getTime() + 2 * dayInMs));
    }

    function adjustDayCount(offset) {
        currentDayIndex += offset;
        updateUI();
    }

    updateUI(); 
    
    document.getElementById("next-day-btn").addEventListener("click", () => adjustDayCount(1));
    document.getElementById("prev-day-btn").addEventListener("click", () => adjustDayCount(-1));

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") adjustDayCount(-1);
        else if (e.key === "ArrowRight") adjustDayCount(1);
    });

   
    // let DJ_gary = {
    //     name: "Gray Boots",
    //     showName: "gray ocean",
    //     yearsExperience: 10,
    //     color: "##808080" //gray in hex
    // };

    // let DJ_blue = {
    //     name: "Blue Shoes",
    //     showName: "blue sky",
    //     yearsExperience: 10,
    //     color: "#008000" //blue in hex
    // };
 
  

document.querySelectorAll(".dj-info h4").forEach(dj => {
    dj.addEventListener("dblclick", () => {
        const currentColor = window.getComputedStyle(dj).color;
        const rgbToHex = (rgb) => '#' + rgb.match(/\d+/g).map(x=>(+x).toString(16).padStart(2,0)).join('');
        const colorHex = rgbToHex(currentColor);

        if (colorHex === "#ff0000" || "") { 
            dj.style.color = "green"; 
        } else if (colorHex === "#008000") { 
            dj.style.color = "blue"; 
        } else { 
            dj.style.color = "red";
        }
    });
});

});