document.addEventListener("DOMContentLoaded", function () {
    let speedSlider = document.getElementById("speedSlider");
    let speedValue = document.getElementById("speedValue");

    speedSlider.addEventListener("input", function () {
        let speed = speedSlider.value;
        speedValue.textContent = speed + "x";

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setPlaybackSpeed,
                args: [speed]
            });
        });
    });

    function setPlaybackSpeed(speed) {
        let video = document.querySelector("video");
        if (video) {
            video.playbackRate = parseFloat(speed);
        }
    }
});