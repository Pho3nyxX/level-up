import { VideoPlayer } from "./modules/videoplayer.js";

document.addEventListener("DOMContentLoaded", (event) => {
    
    setUpEvents();
    let vid = new VideoPlayer("videoContainer");
    console.log(vid)
});


function setUpEvents(){

}