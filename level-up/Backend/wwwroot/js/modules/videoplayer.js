class VideoPlayer {

    constructor(videoContainerId) {
        this._videoContainer = document.getElementById(videoContainerId);
        this.videoElement = ".video";
        this.playBtn = ".play-pause-btn";
        this.fullScreenBtn = ".full-screen-btn";
        this.volumeBtn = ".volume-btn";
        this.muteIcon = ".mute-icon";
        this.settingsBtn = ".settings-btn";
        this.settingsMenu = ".settings-menu";
        this.playbackSpeedMenu = "#playbackSpeedMenu";
        this.qualityMenu = "#qualityMenu";
        this._playbackSpeed = 1;
        this.currentTimeElement = ".video-current-time";
        this.videoDurationElement = ".video-duration";
        this.scrubBar = ".scrub-bar";
        this.progressBar = ".scrub-progress";
        this.progressHandle = ".scrub-circle";
        this.volumeScrubBar = ".volume-scrub-bar";
        this.volumeProgressBar = ".volume-scrub-progress";
        this.volumeProgressHandle = ".volume-scrub-circle";
        this.volumeScrubContainer = ".volume-scrub-container";

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
        return this._volumeBtn;
    }

    set volumeBtn(selector) {
        let btn = this.videoContainer.querySelector(selector);
        if (btn) {
            this._volumeBtn = btn;
        } else {
            console.error("Cannot mute video");
        }
    }

    get muteIcon() {
        return this._muteIcon;
    }

    set muteIcon(selector) {
        let btn = this.videoContainer.querySelector(selector);
        if (btn) {
            this._muteIcon = btn;
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

    get scrubBar() {
        return this._scrubBar;
    }

    set scrubBar(selector) {
        let scrubBarLine = this.videoContainer.querySelector(selector);
        if (scrubBarLine) {
            this._scrubBar = scrubBarLine;
        } else {
            console.error("Cannot load scrub bar");
        }
    }

    get volumeScrubContainer() {
        return this._volumeScrubContainer;
    }

    set volumeScrubContainer(selector) {
        let volScrubContainer = this.videoContainer.querySelector(selector);
        if (volScrubContainer) {
            this._volumeScrubContainer = volScrubContainer;
        } else {
            console.error("Cannot view container");
        }
    }

    get volumeProgressBar() {
        return this._volumeProgressBar;
    }

    set volumeProgressBar(selector) {
        let volumeProBar = this.videoContainer.querySelector(selector);
        if (volumeProBar) {
            this._volumeProgressBar = volumeProBar;
        } else {
            console.error("Cannot view volume progress bar");
        }
    }

    get volumeProgressHandle() {
        return this._volumeProgressHandle;
    }

    set volumeProgressHandle(selector) {
        let volumeProHandle = this.videoContainer.querySelector(selector);
        if (volumeProHandle) {
            this._volumeProgressHandle = volumeProHandle;
        } else {
            console.error("Cannot view volume progress handle");
        }
    }

    get volumeScrubBar() {
        return this._volumeScrubBar;
    }

    set volumeScrubBar(selector) {
        let volumeScrubBarLine = this.videoContainer.querySelector(selector);
        if (volumeScrubBarLine) {
            this._volumeScrubBar = volumeScrubBarLine;
        } else {
            console.error("Cannot load volume scrub bar");
        }
    }

    setUpEvents() {
        this.playBtn.addEventListener("click", this.playPause);
        this.fullScreenBtn.addEventListener("click", this.FullExitScreen);
        this.muteIcon.addEventListener("click", this.MuteUnmute);
        this.settingsBtn.addEventListener("click", this.toggleSettingBtn);
        this.settingsMenu.addEventListener("click", this.toggleMenuItem);
        this.playbackSpeedMenu.addEventListener("click", this.clickedSpeed);
        this.videoElement.addEventListener("play", this.videoPlay);
        this.videoElement.addEventListener("pause", this.videoPause);
        this.videoElement.addEventListener("click", this.playPause);
        document.addEventListener("keydown", this.keyboardShortcuts);
        this.progressHandle.addEventListener("mousedown", this.progressHandleDownMousePress);
        this.videoElement.addEventListener("seeked", this.seekEventListener);
        this.videoElement.addEventListener("loadedmetadata", this.metaDataLoaded);
        
        this.scrubBar.addEventListener("click", this.scrubBarPress);

        this.volumeProgressHandle.addEventListener("mousedown", this.volumeProgressHandleDownMousePress);

     
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
        let muteBtnIcon = this.muteIcon.querySelector("i");
        muteBtnIcon.classList.remove("bi-volume-up-fill");
        muteBtnIcon.classList.add("bi-volume-mute-fill");
        this.videoElement.muted = true;
    }

    unmute() {
        let muteBtnIcon = this.muteIcon.querySelector("i");
        muteBtnIcon.classList.remove("bi-volume-mute-fill");
        muteBtnIcon.classList.add("bi-volume-up-fill");
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

    // throw out a custom event/notification when the video is near the end
    checkVideoNearEnd(self) {
        // TODO:: check if the video is actually near the end
        let event = new Event("videonearend", { bubbles: false, cancelable: false }); // custom event
        self.videoElement.dispatchEvent(event); // tying the custom event to the video element

        clearTimeout(self.videoEndTimer); // get rid of the timeout
        return true;
    }

    // set a timer when the video ends
    setVideoEndTimer() {
        let timeOut = parseInt((this.videoElement.duration - this.videoElement.currentTime) - 12) * 1000;
        this.videoEndTimer = setTimeout(this.checkVideoNearEnd, timeOut, this);
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

    seekEventListener = (e) => {
        this.updateCurrentTime(this);
    }

    updateCurrentTime(self) {
        if (!self) {
            self = this;
        };
        self.currentTimeElement.innerHTML = self.convertSecondsToString(self.videoElement.currentTime);
    }

    videoPlay = (e) => {
        this.currentTimeInterval = setInterval(this.updateCurrentTime, 1000, this);
        this.progressBarTimer = setInterval(this.updateProgressBar, 16, this);
        this.setVideoEndTimer();
    }

    videoPause = (e) => {
        clearInterval(this.currentTimeInterval);
        clearInterval(this.progressBarTimer);
        clearTimeout(this.videoEndTimer);
    }

    updateProgressBar(self) {
        let currentVideoTime = self.videoElement.currentTime;
        let videoDuration = self.videoElement.duration;
        let percentageTime = (currentVideoTime / videoDuration) * 100;

        self.progressBar.style.width = percentageTime + "%";
        self.progressHandle.style.left = percentageTime + "%";
    }

    keyboardShortcuts = (e) => {
        if (e.code == 'Space') {
            e.preventDefault();
            this.playPause(e);
        }
        if (e.code == 'KeyK') {
            e.preventDefault();
            this.playPause(e);
        }
        if (e.code == 'KeyF') {
            e.preventDefault();
            this.FullExitScreen(e);
        }
        if (e.code == 'KeyM') {
            e.preventDefault();
            this.MuteUnmute(e);
        }
        if (e.code == 'ArrowRight') {
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime + 5;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if (e.code == 'ArrowLeft') {
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime - 5;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if (e.code == 'KeyJ') {
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime + 10;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if (e.code == 'KeyL') {
            e.preventDefault();
            this.videoElement.currentTime = this.videoElement.currentTime - 10;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if (e.code == 'Numpad0') {
            e.preventDefault();
            this.videoElement.currentTime = 0;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
        if (e.code == 'Digit0') {
            e.preventDefault();
            this.videoElement.currentTime = 0;
            this.currentTimeElement.innerHTML = this.convertSecondsToString(this.videoElement.currentTime);
            this.updateProgressBar(this);
        }
    }

    progressHandleDownMousePress = (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", this.scrubVideo);
        document.addEventListener("mouseup", this.endScrub);
    }

    scrubVideo = (e) => {
        e.preventDefault();

        let containerWidth = this.videoContainer.getBoundingClientRect().width;
        let progressBarWidth = this.progressBar.getBoundingClientRect().width;

        let movementFractional = (e.movementX / containerWidth);
        let progressBarWidthFractional = (progressBarWidth / containerWidth);

        let newVideoTime = this.videoElement.duration * (movementFractional + progressBarWidthFractional);

        let totalPercent = ((movementFractional + progressBarWidthFractional) * 100).toFixed(2);

        this.progressBar.style.width = totalPercent + "%";
        this.progressHandle.style.left = totalPercent + "%";

        this.videoElement.currentTime = newVideoTime;
    }

    endScrub = (e) => {
        document.removeEventListener("mousemove", this.scrubVideo);
        if (!(this.videoElement.paused || this.videoElement.ended)) {
            clearTimeout(this.videoEndTimer);
            this.setVideoEndTimer();
        }
    }

    // TODO:: figure this out for delayed loading and video loading before code
    metaDataLoaded = (e) => {
        // console.log("something");
    }

    scrubBarPress = (e) => {
        let containerWidth = this.videoContainer.getBoundingClientRect().width;

        let offsetFractional = (e.offsetX / containerWidth);

        let newVideoTime = this.videoElement.duration * offsetFractional;

        let totalPercent = (offsetFractional * 100).toFixed(2);

        this.progressBar.style.width = totalPercent + "%";
        this.progressHandle.style.left = totalPercent + "%";

        this.videoElement.currentTime = newVideoTime;
    }

    volumeProgressHandleDownMousePress = (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", this.scrubVolume);
        document.addEventListener("mouseup", this.endScrubVolume);
    }

    scrubVolume = (e) => {
        e.preventDefault();

        let volumeScrubContainerWidth = this.volumeScrubContainer.getBoundingClientRect().width;
        let volumeProgressBarWidth = this.volumeProgressBar.getBoundingClientRect().width;

        let movementFractional = (e.movementX / volumeScrubContainerWidth);
        let volumeProgressBarWidthFractional = (volumeProgressBarWidth / volumeScrubContainerWidth);

        console.log(volumeProgressBarWidthFractional);
        let newVolume = this.videoElement.volume * (movementFractional + volumeProgressBarWidthFractional);

        let totalPercent = ((movementFractional + volumeProgressBarWidthFractional) * 100).toFixed(2);

        this.volumeProgressBar.style.width = totalPercent + "%";
        this.volumeProgressHandle.style.left = totalPercent + "%";

        this.videoElement.volume = newVolume;
        console.log(this.videoElement.volume);
    }

    endScrubVolume = (e) => {
        document.removeEventListener("mousemove", this.scrubVolume);
    }

}
export { VideoPlayer };
