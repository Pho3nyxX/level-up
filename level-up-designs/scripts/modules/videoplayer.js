class VideoPlayer {

    constructor(videoContainerId) {
        this._videoContainer = document.getElementById(videoContainerId);
        this.videoElement = ".video";
        this.playBtn = ".play-pause-btn";
        this.fullScreenBtn = ".full-screen-btn";
        this.volumeBtn = ".volumn-btn";
        this.settingsBtn = ".settings-btn";
        this.settingsMenu = ".settings-menu";
        this.playbackSpeedMenu = "#playbackSpeedMenu";
        this.qualityMenu = "#qualityMenu";
        this._playbackSpeed = 1;
        this.currentTimeElement = ".video-current-time";
        this.videoDurationElement = ".video-duration";
        this.progressBar = ".scrub-progress";
        this.progressHandle = ".scrub-circle";


        this.videoDurationElement.innerHTML = this.convertSecondsToString(this.videoElement.duration);

        this.setUpEvents();
    }

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
            console.error("Video not found.");
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

    get volumeBtn() {
        return this._volumnBtn;
    }

    set volumeBtn(selector) {
        let btn = this.videoContainer.querySelector(selector);
        if (btn) {
            this._volumnBtn = btn;
        } else {
            console.error("Cannot mute video");
        }
    }

    get settingsBtn() {
        return this._settingsBtn;
    }

    set settingsBtn(selector) {
        let btn = this.videoContainer.querySelector(selector);

        if (btn) {
            this._settingsBtn = btn;
        } else {
            console.error("Cannot open settings");
        }
    }

    get settingsMenu() {
        return this._settingsMenu;
    }

    set settingsMenu(selector) {
        let btn = this.videoContainer.querySelector(selector);

        if (btn) {
            this._settingsMenu = btn;
        } else {
            console.error("Cannot open settings menu");
        }
    }

    get playbackSpeed() {
        return this._playbackSpeed;
    }

    set playbackSpeed(value) {
        this.updatedPlaybackSpeedMenu(value)
        this._playbackSpeed = value;
        this.updatePlaybackSpeed();
    }

    get playbackSpeedMenu() {
        return this._playbackSpeedMenu;
    }

    set playbackSpeedMenu(selector) {
        let playbackMenu = this.videoContainer.querySelector(selector);

        if (playbackMenu) {
            this._playbackSpeedMenu = playbackMenu;
        } else {
            console.error("Cannot open playback speed menu");
        }
    }

    get qualityMenu() {
        return this._qualityMenu;
    }

    set qualityMenu(selector) {
        let quality = this.videoContainer.querySelector(selector);

        if (quality) {
            this._qualityMenu = quality;
        } else {
            console.error("Cannot open quality menu");
        }
    }

    get videoDurationElement() {
        return this._videoDurationElement;
    }

    set videoDurationElement(selector) {
        let vidTime = this.videoContainer.querySelector(selector);

        if (vidTime) {
            this._videoDurationElement = vidTime;
        } else {
            console.error("Cannot view video time");
        }
    }

    get currentTimeElement() {
        return this._currentTimeElement;
    }

    set currentTimeElement(selector) {
        let vidTime = this.videoContainer.querySelector(selector);

        if (vidTime) {
            this._currentTimeElement = vidTime;
        } else {
            console.error("Cannot view video current time");
        }
    }

    get progressBar() {
        return this._progressBar;
    }

    set progressBar(selector) {
        let proBar = this.videoContainer.querySelector(selector);

        if (proBar) {
            this._progressBar = proBar;
        } else {
            console.error("Cannot view progress bar");
        }
    }

    get progressHandle() {
        return this._progressHandle;
    }

    set progressHandle(selector) {
        let proHandle = this.videoContainer.querySelector(selector);

        if (proHandle) {
            this._progressHandle = proHandle;
        } else {
            console.error("Cannot view progress handle");
        }
    }


    setUpEvents() {
        this.playBtn.addEventListener("click", this.playPause);
        this.fullScreenBtn.addEventListener("click", this.FullExitScreen);
        this.volumeBtn.addEventListener("click", this.MuteUnmute);
        this.settingsBtn.addEventListener("click", this.toggleSettingBtn);
        this.settingsMenu.addEventListener("click", this.toggleMenuItem);
        this.playbackSpeedMenu.addEventListener("click", this.clickedSpeed);
        this.videoElement.addEventListener("play", this.videoPlay);
        this.videoElement.addEventListener("pause", this.videoPause);
        this.videoElement.addEventListener("click", this.playPause);
        document .addEventListener("keydown", this.keyboardShortcuts);

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

    fullsreen() {
        this.videoContainer.classList.add("fullscreen");
        this.videoContainer.requestFullscreen();
        let fullscreenBtnIcon = this.fullScreenBtn.querySelector("i");
        fullscreenBtnIcon.classList.add("bi-fullscreen-exit");
        fullscreenBtnIcon.classList.remove("bi-arrows-fullscreen");
    }

    exitFullscreen() {
        this.videoContainer.classList.remove("fullscreen");
        document.exitFullscreen()
        let fullscreenBtnIcon = this.fullScreenBtn.querySelector("i");
        fullscreenBtnIcon.classList.add("bi-arrows-fullscreen");
        fullscreenBtnIcon.classList.remove("bi-fullscreen-exit");
    }

    FullExitScreen = (e) => {
        this.toggleFullScreen();
    }

    toggleFullScreen() {
        if (document.fullscreenElement) {
            this.exitFullscreen();
        } else {
            this.fullsreen();
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

    toggleSettingBtn = (e) => {
        this.settingsMenu.classList.toggle("active");
    }

    toggleMenuItem = (e) => {
        if (e.target.closest('.menu-item-link')) {
            let menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                menuItem.classList.toggle("active");

                let menuItems = this.videoContainer.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                    if (item !== menuItem) {
                        item.classList.toggle("hide");
                    }
                })
            }
        }
    }

    playbackSpeedClick = (e) => {
        let newSpeed = e.target.dataset.value;
        this.playbackSpeed = newSpeed;
    }

    updatePlaybackSpeed() {
        this.videoElement.playbackRate = parseFloat(this.playbackSpeed);
    }

    updatedPlaybackSpeedMenu(newSpeed) {
        if (this.playbackSpeed !== newSpeed) {
            let currentSpeedEl = this.videoContainer.querySelector("a[data-value='" + this.playbackSpeed + "']");
            currentSpeedEl.innerHTML = this.playbackSpeed;
            let newSpeedEl = this.videoContainer.querySelector("a[data-value='" + newSpeed + "']")

            newSpeedEl.innerHTML = "<i class='bi bi-check-lg'></i>" + newSpeed;
        }
    }

    clickedSpeed = (e) => {
        if (e.target.tagName.toLowerCase() == "a") {
            let newSpeed = e.target.dataset.value;
            this.playbackSpeed = newSpeed;
        }
    }

    convertSecondsToString(givenSeconds) {
        let date = new Date(parseInt(givenSeconds * 1000));
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getSeconds();
        let timeString = "";
        if (hours > 0) {
            timeString = hours.toString().padStart(2, '0') + ':';
        }

        timeString = minutes.toString().padStart(2, '0') + ':' +
            seconds.toString().padStart(2, '0');

        return timeString;
    }

    updateCurrentTime(self) {
        if (!self) {
            self = this;
        };
        self.currentTimeElement.innerHTML = self.convertSecondsToString(self.videoElement.currentTime);
    }

    videoPlay = (e) => {
        this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000, this);
        let scrollBarTimer = setInterval(this.updateProgressBar, 16, this);
    }

    videoPause = (e) => {
        clearInterval(this.currentTimeInterval);
        clearInterval(this.scrollBarTimer);
    }

    updateProgressBar(self) {
        let currentVideoTime = self.videoElement.currentTime;
        let videoDuration = self.videoElement.duration;
        let percentageTime = (currentVideoTime / videoDuration) * 100;

        self.progressBar.style.width = percentageTime + "%";
        self.progressHandle.style.left = percentageTime + "%";
    }

    keyboardShortcuts = (e) => {
        if(e.code == 'Space'){
            e.preventDefault();
            this.playPause(e);
        }
        if(e.code == 'KeyK'){
            e.preventDefault();
            this.playPause(e);
        }
        if(e.code == 'KeyF'){
            e.preventDefault();
            this.FullExitScreen(e);
        }
        if(e.code == 'KeyM'){
            e.preventDefault();
            this.MuteUnmute(e);
        }
        if(e.code == 'ArrowRight'){
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime + 5;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if(e.code == 'ArrowLeft'){
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime - 5;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if(e.code == 'KeyJ'){
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime + 10;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if(e.code == 'KeyL'){
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime - 10;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if(e.code == 'Numpad0'){
            e.preventDefault();
            this.videoElement.currentTime = 0;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if(e.code == 'Digit0'){
            e.preventDefault();
            this.videoElement.currentTime = 0;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
    }

}
export { VideoPlayer };
