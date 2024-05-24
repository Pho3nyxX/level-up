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
        // console.log(playbackMenu);

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
        // console.log(quality);

        if (quality) {
            this._qualityMenu = quality;
        } else {
            console.error("Cannot open quality menu");
        }
    }


    // methods
    setUpEvents() {
        this.playBtn.addEventListener("click", this.playPause);
        this.fullScreenBtn.addEventListener("click", this.FullExit);
        this.volumeBtn.addEventListener("click", this.MuteUnmute);
        this.settingsBtn.addEventListener("click", this.toggleSettingBtn);
        this.settingsMenu.addEventListener("click", this.toggleMenuItem);
        this.playbackSpeedMenu.addEventListener("click", this.clickedSpeed);
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

    full() {
        this.videoContainer.classList.toggle("fullscreen");
        this.videoContainer.requestFullscreen();
        let fullscreenBtnIcon = this.fullScreenBtn.querySelector("i");
        fullscreenBtnIcon.classList.add("bi-fullscreen-exit");
        fullscreenBtnIcon.classList.remove("bi-arrows-fullscreen");
    }

    exit() {
        this.videoContainer.classList.toggle("fullscreen");
        document.exitFullscreen()
        let fullscreenBtnIcon = this.fullScreenBtn.querySelector("i");
        fullscreenBtnIcon.classList.add("bi-arrows-fullscreen");
        fullscreenBtnIcon.classList.remove("bi-fullscreen-exit");
    }

    FullExit = (e) => {
        this.toggleFullScreen();
        // let fullscreenBtnIcon = this.fullScreenBtn.querySelector("i");
        // fullscreenBtnIcon.classList.remove("bi-arrows-fullscreen");
        // fullscreenBtnIcon.classList.add("bi-fullscreen-exit");
    }

    toggleFullScreen() {
        if (document.fullscreenElement) {
            this.exit();
        } else {
            this.full();
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
    };

    playbackSpeedClick = (e) => {
        let newSpeed = e.target.dataset.value;
        this.playbackSpeed = newSpeed;
    }

    updatePlaybackSpeed() {
        this.videoElement.playbackRate = parseFloat(this.playbackSpeed);
    }

    updatedPlaybackSpeedMenu(newSpeed) {
        // check if speed changed
        if (this.playbackSpeed !== newSpeed) {
            // find menu item for current speed
            let currentSpeedEl = this.videoContainer.querySelector("a[data-value='" + this.playbackSpeed + "']");
            // remove tick from it
            currentSpeedEl.innerHTML = this.playbackSpeed;
            // find menu item for new speed
            let newSpeedEl = this.videoContainer.querySelector("a[data-value='" + newSpeed + "']")
            // console.log(newSpeedEl);
            // add tick to it    
            newSpeedEl.innerHTML = "<i class='bi bi-check-lg'></i>" + newSpeed;
        }
        // this.videoElement.playbackRate = this.playbackSpeed; 
    }

    clickedSpeed = (e) => {
        // load the a
        if (e.target.tagName.toLowerCase() == "a") {
            // take the speed from the a
            let newSpeed = e.target.dataset.value;
            // change the video speed to newSpeed
            // update the ui
            this.playbackSpeed = newSpeed;
        }
    }

}
export { VideoPlayer };

