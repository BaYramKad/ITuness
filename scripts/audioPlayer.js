"use strict";
import { addZero } from "./supScript.js";

export const audioPlayerInit = () => {
    const audio = document.querySelector(".audio"),
        audioImg = document.querySelector(".audio-img"),
        audioHeader = document.querySelector(".audio-header"),
        audioPlayer = document.querySelector(".audio-player"),
        audioNavigation = document.querySelector(".audio-navigation"),
        audioButtonPlay = document.querySelector(".audio-button__play"),
        audioTimePassed = document.querySelector(".audio-time__passed"),
        audioProgress = document.querySelector(".audio-progress"),
        audioTimeTotal = document.querySelector(".audio-time__total");

    let audioProgressTiming = document.querySelector(".audio-progress__timing");

    const playList = ["hello", "flow", "speed"];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused,
            track = playList[trackIndex];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadTrack();

    };

    const nextTrack = () => {
        if (trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    audioNavigation.addEventListener("click", event => {
        const target = event.target;

        if (target.matches(".audio-button__play")) {
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }

        if (target.matches(".audio-button__prev")) {
            prevTrack();
        }

        if (target.matches(".audio-button__next")) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener("ended", () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener("timeupdate", () => {
        const duration = audioPlayer.duration,
            currentTime = audioPlayer.currentTime;

        const progress = (currentTime / duration) * 100;
        audioProgressTiming.style.width = `${progress}%`;

        const minutesPassed = Math.floor(currentTime / 60) || "0",
            secondsPassed = Math.floor(currentTime % 60) || "0";

        const minutesTotal = Math.floor(duration / 60) || "0",
            secondsTotal = Math.floor(duration % 60) || "0";

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener("click", event => {
        const x = event.offsetX,
            allWidth = audioProgress.clientWidth,
            progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });
};