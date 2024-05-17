class VideoPlayer {

    constructor(videoContainerId) {
        this._videoContainer = document.getElementById(videoContainerId);
        this.videoElement = ".video";
        this.playBtn = ".play-pause-btn";
        this.fullScreenBtn = ".full-screen-btn";

        this.setUpEvents();
    }

    // getters/setters
    get videoContainer() {
        return this._videoContainer;
    }

    get videoElement() {
        return this._videoElement;
    }

    set videoElement(selector) {
        let vidElement = this.videoContainer.querySelector(selector);
        if (vidElement) {
            this._videoElement = vidElement;
            this._videoElement.removeAttribute("controls");
        } else {
            console.error("Video element not found.");
        }
    }

    get playBtn() {
        return this._playBtn;
    }

    set playBtn(selector) {
        let btn = this.videoContainer.querySelector(selector);
        if (btn) {
            this._playBtn = btn;
        } else {
            console.error("Play button not found.");
        }
    }

    get fullScreenBtn() {
        return this._fullScreenBtn;
    }

    set fullScreenBtn(selector) {
        let btn = this.videoContainer.querySelector(selector);
        if (btn) {
            this._fullScreenBtn = btn;
        } else {
            console.error("Full screen not found");
        }
    }

    // methods
    setUpEvents() {
        this.playBtn.addEventListener("click", this.playPause);

        this.fullScreenBtn.addEventListener("click", this.FullExit);
    }

    playPause = (e) => {
        if (this.videoElement.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    play() {
        this.videoElement.play();
        let playBtnIcon = this.playBtn.querySelector("i");
        playBtnIcon.classList.remove("bi-play-fill");
        playBtnIcon.classList.add("bi-pause-fill");
    }

    pause() {
        this.videoElement.pause();
        let playBtnIcon = this.playBtn.querySelector("i");
        playBtnIcon.classList.remove("bi-pause-fill");
        playBtnIcon.classList.add("bi-play-fill");
    }

    FullExit = (e) => {
        this.toggleFullScreen();
    }

    toggleFullScreen() {
        if (!this.videoContainer.fullscreenElement) {
            this.videoContainer.requestFullscreen();
        } else if (this.videoContainer.fullscreenElement) {
            document.exitFullscreen();
        }
    }

}
export { VideoPlayer };