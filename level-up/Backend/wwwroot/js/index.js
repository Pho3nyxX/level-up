import { VideoPlayer } from "./lib.js"
let vid;
let scrollToTopBtn;
let bookmarkIcon, bookmarkLink;

document.addEventListener("DOMContentLoaded", (event) => {

    setUpEvents();

    let page = getPageName();

    switch (page) {
        case "Lesson":
            lessonPage();
            break;

    }
});

function getPageName() {
    return document.body.dataset.pagename;
}

function lessonPage() {
    vid = new VideoPlayer("videoContainer");
    bookmarkLink = document.querySelector(".bookmark");
    bookmarkIcon = document.querySelector(".bookmark i");

    bookmarkLink.addEventListener("click", toggleBookmark);

    vid.videoElement.addEventListener("videonearend", (e) => {
        console.log(e);
        markVideoAsWatched();
    });
}

function setUpEvents() {
    scrollToTopBtn = document.querySelector(".scrollToTop");


    document.addEventListener("scroll", toggleScrollBtn);
    // scrollToTopBtn.addEventListener("click", scrollToTop);

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
        .catch(error => console.error('Error marking video as watched.'))
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

function toggleBookmark(e) {
    e.preventDefault();
    if (bookmarkIcon.classList.contains('bi-bookmark')) {
        saveBookmark();
    } else {
        removeBookmark();
    }
}

function removeBookmark() {
    bookmarkIcon.classList.remove('bi-bookmark-fill');
    bookmarkIcon.classList.add('bi-bookmark');
}

function saveBookmark() {
    let spliturl = window.location.pathname.split("/")

    let lessonId = spliturl[spliturl.length - 1];

    const formData = new FormData();

    formData.append("lessonId", lessonId);

    fetch(('/Courses/SaveBookmark/' + lessonId), {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                console.log("Bookmark saved.")
                bookmarkIcon.classList.remove('bi-bookmark');
                bookmarkIcon.classList.add('bi-bookmark-fill');
            } else {
                console.error("Bookmark failed to save.")
            }
        })
        .catch(error => console.error(error))
}

// TODO: complete delete book
function deleteBookmark() {
    fetch('/Courses/Lesson/SaveBookmark/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookmarked: false
        }),
    })
        .then(response => {
            if (response.ok) {
                console.log("Bookmark removed.")
            } else {
                console.error("Bookmark failed to remove.")

            }
        })
        .catch(error => console.log('Error deleting bookmark.'))
}