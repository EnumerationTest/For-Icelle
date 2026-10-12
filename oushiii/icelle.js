const letterButton = document.getElementById("letterButton");
const letterContent = document.getElementById("letterContent");

const surpriseButton = document.getElementById("surpriseButton");
const surpriseContent = document.getElementById("surpriseContent");

// OPEN AND CLOSE THE LOVE LETTER
letterButton.addEventListener("click", function () {
    letterContent.classList.toggle("hidden");

    if (letterContent.classList.contains("hidden")) {
        letterButton.textContent = "Open my letter";
    } else {
        letterButton.textContent = "Close my letter ♡";
    }
});

// REVEAL THE FINAL SURPRISE
surpriseButton.addEventListener("click", function () {
    surpriseContent.classList.toggle("hidden");

    if (surpriseContent.classList.contains("hidden")) {
        surpriseButton.textContent = "Click for your surprise ✨";
    } else {
        surpriseButton.textContent = "Hide surprise ♡";
    }
});
