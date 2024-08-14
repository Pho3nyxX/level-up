// import { VideoPlayer } from "./modules/videoplayer.js";

// export { VideoPlayer };

// let vid;
let scrollToTopBtn;


document.addEventListener("DOMContentLoaded", (event) => {

    setUpEvents();
    // vid = new VideoPlayer("videoContainer");

});


function setUpEvents() {
    // vid.videoElement.addEventListener("videonearend", (e) => {
    //     console.log(e);
    //     markVideoAsWatched();
    // });
    scrollToTopBtn = document.querySelector(".scrollToTop");

    document.addEventListener("scroll", toggleScrollBtn);
    scrollToTopBtn.addEventListener("click", scrollToTop);
}


// show/hide the scroll button
function toggleScrollBtn(event) {
    if (window.scrollY > 20) {
        scrollToTopBtn.classList.remove("hide");
    } else {
        scrollToTopBtn.classList.add("hide");
    }
}

// scroll back to the top of the page
function scrollToTop(event) {
    window.scrollTo(0, 0);
}

// function markVideoAsWatched() {
//     fetch('https://localhost:/uploads/lesson1.mp4', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             watched: 'true'
//         })
//             .then(response => {
//                 if (response.ok) {
//                     console.log('Video marked as watched successfully');
//                 } else {
//                     console.error('Failed to mark video as watched');
//                 }
//             })
//             .catch(error => console.log('Error marking video as watched.'))
//     })
// }

