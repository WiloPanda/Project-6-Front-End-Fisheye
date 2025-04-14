/* ---- This file contains the necessary elements to initialize the carousel modal and to open it. ---- */

/**
 * Initialization of the initMediasModal function with the different media on a photographer's page as parameter.
 * @function [<initMediasModal>]
 * @param {Array} medias - The different media to display in the modal.
 * @returns {HTMLElement} Returns the HTML element of the modal.
 */
function initMediasModal(media, photographer) {

    const modal = document.getElementById("medias_modal");
    modal.style.display = "none";

    const modalHtml = `
    <div class="modal_childrens">
        <div class="modal-content">
            <div id="left-side">
                <button class="previous-button" data-index="0"><img src="assets/icons/left_arrow.png" alt="Previous media" aria-label="Previous media"></button>
            </div>
            <div id="carousel"></div>
            <div id="right-side">
                <button class="close-button" data-index="2"><img src="assets/icons/close_red.png" alt="Close modal" aria-label="Close dialog"></button>
                <button class="next-button" data-index="1"><img src="assets/icons/right_arrow.png" alt="Next media" aria-label="Next media"></button>
            </div>
        </div>
    </div>
    `

    modal.innerHTML = modalHtml;

    // Creation of different selectors to target the modal and its various buttons: close, previous and next.
    let closeButton = document.querySelector('.close-button');
    let previousButton = document.querySelector('.previous-button');
    let nextButton = document.querySelector('.next-button');
    let carousel = document.getElementById("carousel");

    // Creation of media in the carousel modal using the two available media classes.
    for (let i = 0; i < media.length; i++) {
        if (media[i].image) {
            let imageMedia = new ImageMedia(media[i], photographer)
            let article = imageMedia.createMediaModal();

            carousel.appendChild(article);

        } else {
            let videoMedia = new VideoMedia(media[i], photographer)
            let article = videoMedia.createMediaModal();

            carousel.appendChild(article);
        }
    }

    const trapFocus = function (e) {
        if (e.key === "Tab") {
            const focusablesLightbox = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusablesLightbox[0];
            const lastFocusable = focusablesLightbox[focusablesLightbox.length - 1];

            const isShift = e.shiftKey;
            const activeElement = document.activeElement;

            if (!isShift && activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            } else if (isShift && activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        }
    };

    // Adding event listener to trap focus
    modal.addEventListener("keydown", trapFocus);

    // Adding a click event on the close button to add style to the modal to hide it.
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
        document.querySelector("main").removeAttribute("aria-hidden");
    });

    // Adding a click event on the 'previous' button to remove the 'active' class from the displayed media and assign the 'active' class to the previous media.
    previousButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.previousElementSibling) {
            m.previousElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:last-child').classList.add('active')
        }
    });

    // Adding a click event on the 'next' button to remove the 'active' class from the displayed media and assign the 'active' class to the next media.
    nextButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.nextElementSibling) {
            m.nextElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:first-child').classList.add('active')
        }
    });

    // Adding an event listener to the page that allows click events to be triggered using the keyboard.
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            previousButton.click();
        } else if (e.key === "ArrowRight") {
            nextButton.click();
        } else if (e.key === "Escape") {
            closeButton.click();
        }
    });

    return modal;
}

/**
 * Initialization of a function to display the carousel modal which is initially display none.
 * @function [<openMediasModal>]
 * @param {Number} id - Unique ID of the selected media, allowing it to be displayed first.
 */
function openMediasModal(id) {

    const modal = document.getElementById("medias_modal");
    const img = document.getElementById('mediaModal_' + id); // We get the media that has the id 'mediaModal_' + the unique ID of the chosen media.

    modal.style.display = 'block' // We display the modal.
    modal.querySelectorAll('.mediaModal').forEach(m => {
        m.classList.remove('active') // We remove the 'active' class from all media in the modal.
    })
    img.classList.add('active') // We add the 'active' class to the chosen media to be able to open the modal directly on this media.

    const previousButton = modal.querySelector('.previous-button');
    previousButton.focus();

    document.querySelector("main").setAttribute("aria-hidden", "true");
}