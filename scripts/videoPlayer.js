"use strict";
export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector(".video-player"),
        videoButtonPlay = document.querySelector(".video-button__play"),
        videoButtonStop = document.querySelector(".video-button__stop"),
        videoProgress = document.querySelector(".video-progress"),
        videoTimePassed = document.querySelector(".video-time__passed"),
        videoTimeTotal = document.querySelector(".video-time__total"),
        videoFullScreen = document.querySelector(".video_full-screen"),
        videoVolume = document.querySelector(".video-volume");

    const toggleIcon = () => {

        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove("fa-pause");
            videoButtonPlay.classList.add("fa-play");
        } else {
            videoButtonPlay.classList.add("fa-pause");
            videoButtonPlay.classList.remove("fa-play");
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlayer = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        toggleIcon()
    };

    const addZero = n => n < 10 ? `0${n}` : n;

    videoFullScreen.addEventListener("click", () => {
        videoPlayer.requestFullscreen();
    });

    videoPlayer.addEventListener("click", togglePlay);
    videoButtonPlay.addEventListener("click", togglePlay);

    videoPlayer.addEventListener("play", toggleIcon);
    videoPlayer.addEventListener("pause", toggleIcon);
    videoButtonStop.addEventListener("click", stopPlayer);

    videoPlayer.addEventListener("timeupdate", () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60),
            secondsPassed = Math.floor(currentTime % 60);
        
        let minuteTotal = Math.floor(duration / 60),
            secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener("input", () => {
        const duration = videoPlayer.duration,
            value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener("input", () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayer.volume = 0.5;
    videoVolume.value = videoPlayer.volume * 100;
};