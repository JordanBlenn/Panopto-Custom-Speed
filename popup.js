// popup.js
document.addEventListener("DOMContentLoaded", function () {
    let speedSlider = document.getElementById("speedSlider");
    let speedValue = document.getElementById("speedValue");
    let speedInput = document.getElementById("speedInput");

    chrome.storage.sync.get(["videoSpeed"], function (result) {
        if (result.videoSpeed) {
            speedSlider.value = result.videoSpeed;
            speedInput.value = result.videoSpeed;
            speedValue.textContent = result.videoSpeed + "x";
        }
    });

    function updateSpeed(speed) {
        speed = Math.max(0.1, Math.min(10, Math.round(speed * 10) / 10));
        speedSlider.value = speed;
        speedInput.value = speed;
        speedValue.textContent = speed + "x";

        chrome.storage.sync.set({ videoSpeed: speed });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setPlaybackSpeed,
                args: [speed]
            });
        });
    }

    speedSlider.addEventListener("input", function () {
        updateSpeed(parseFloat(speedSlider.value));
    });

    speedInput.addEventListener("change", function () {
        let inputSpeed = parseFloat(speedInput.value);
        if (!isNaN(inputSpeed)) {
            updateSpeed(inputSpeed);
        }
    });

    function setPlaybackSpeed(speed) {
        let video = document.querySelector("video");
        if (video) {
            video.playbackRate = parseFloat(speed);
        }
    }
});