class VideoPlayer {

    constructor(videoContainerId) {
        this._videoContainer = document.getElementById(videoContainerId);
        this.videoElement = ".video";
        this.playBtn = ".play-pause-btn";
        this.fullScreenBtn = ".full-screen-btn";
        this.volumeBtn = ".volumn-btn";

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
            console.error("Cannot enter full screen.");
        }
    }

    get volumeBtn(){
        return this._volumnBtn;
    }

    set volumeBtn(selector){
        let btn = this.videoContainer.querySelector(selector);
        if(btn){
            this._volumnBtn = btn;
        }else{
            console.log("Cannot mute video");
        }
    }

    // methods
    setUpEvents() {
        this.playBtn.addEventListener("click", this.playPause);
        this.fullScreenBtn.addEventListener("click", this.FullExit);
        this.volumeBtn.addEventListener("click", this.MuteUnmute);
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
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.exitFullscreen) {
            this.videoContainer.requestFullscreen();
        }

    }

    MuteUnmute = (e) => {
        if (this.videoElement.muted) {
            this.unmute();
        } else {
            this.mute();
        }
    }

    mute() {
        let volumeBtnIcon = this.volumeBtn.querySelector("i");
        volumeBtnIcon.classList.remove("bi-volume-up-fill");
        volumeBtnIcon.classList.add("bi-volume-mute-fill");
        this.videoElement.muted = true;
    }

    unmute() {
        let volumeBtnIcon = this.volumeBtn.querySelector("i");
        volumeBtnIcon.classList.remove("bi-volume-mute-fill");
        volumeBtnIcon.classList.add("bi-volume-up-fill");
        this.videoElement.muted = false;
    }

}
export { VideoPlayer };