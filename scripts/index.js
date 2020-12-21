"use strict";

import { radioPlayerInit } from "./radioPlayer.js";
import { audioPlayerInit} from "./audioPlayer.js";
import { videoPlayerInit} from "./videoPlayer.js";

const playerBtn = document.querySelectorAll(".player-btn"),
    playerBlock = document.querySelectorAll(".player-block"),
    temp = document.querySelector(".temp");


const diActivationPlayer = () => {
    temp.style.display = "none";
    playerBtn.forEach(elem => elem.classList.remove("active"));
    playerBlock.forEach(elem => elem.classList.remove("active"));
};

playerBtn.forEach((elem, i) => elem.addEventListener("click", () => {
    diActivationPlayer();
    elem.classList.add("active");
    playerBlock[i].classList.add("active");
}));

radioPlayerInit();
audioPlayerInit();
videoPlayerInit();