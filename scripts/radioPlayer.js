"use strict";
export const radioPlayerInit = () => {
    const radio = document.querySelector(".radio"),
        radioCoverImg = document.querySelector(".radio-cover__img"),
        radioHeaderBig = document.querySelector(".radio-header__big"),
        radioNavigation = document.querySelector(".radio-navigation"),
        radioItem = document.querySelectorAll(".radio-item"),
        radioStop = document.querySelector(".radio-stop");

    const audio = new Audio();
    audio.type = "audio/aac";
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove("play");
            radioStop.classList.add("fa-play");
            radioStop.classList.remove("fa-pause");
        } else {
            radio.classList.add("play");
            radioStop.classList.add("fa-pause");
            radioStop.classList.remove("fa-play");
        }
    };

    const selectItem = elem => {
        radioItem.forEach(elem => elem.classList.remove("select"));
        elem.classList.add("select");
    };

    radioNavigation.addEventListener("change", event => {
        const target = event.target,
            parent = target.closest(".radio-item");

        const redioName = parent.querySelector(".radio-name").textContent,
            urlImg = parent.querySelector(".radio-img").src;
            
        radioCoverImg.src = urlImg;
        radioHeaderBig.textContent = redioName;

        selectItem(parent);
        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    }); 
};