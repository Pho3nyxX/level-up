import { VideoPlayer } from "./modules/videoplayer.js"
 let vid;

 document.addEventListener("DOMContentLoaded", (event) => {

     vid = new VideoPlayer("videoContainer");
     setUpEvents();

 });


 function setUpEvents() {
      vid.videoElement.addEventListener("videonearend", (e) => {
          console.log(e);
          markVideoAsWatched();
      });
 }


function markVideoAsWatched() {
    let spliturl = window.location.pathname.split("/")

    fetch('/Courses/MarkLessonAsWatched/' + spliturl[spliturl.length - 1], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            watched: 'true'
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Video marked as watched successfully');
        } else {
            console.error('Failed to mark video as watched');
        }
    })
    .catch(error => console.log('Error marking video as watched.'))
}