/* ---- Ce fichier comporte les éléments nécessaire à l'initialisation de la modale de carroussel et à son ouverture. ---- */

/**
 * Initialisation de la fonction initMediasModal avec en paramètre les différentes médias se trouvant sur la page d'un photographe.
 * @function [<initMediasModal>]
 * @param {Array} medias - Les différents médias à afficher dans la modale. 
 * @returns {HTMLElement} Retourne l'élément HTML de la modale.
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

    // Création des différents selecteurs pour viser la modale et ses différents boutons, close, previous et next.
    let closeButton = document.querySelector('.close-button');
    let previousButton = document.querySelector('.previous-button');
    let nextButton = document.querySelector('.next-button');
    let carousel = document.getElementById("carousel");

    // Création des médias dans la modale du carroussel en utilisant les deux classes de médias disponibles.
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

    // Ajout de l'écouteur d'événement pour piéger le focus
    modal.addEventListener("keydown", trapFocus);

    // Ajout d'un évènement au clique sur le bouton close, permettant d'ajouter du style à la modal pour ne plus l'afficher.
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
        document.querySelector("main").removeAttribute("aria-hidden");
    });

    // Ajout d'un évènement au clique sur sur le bouton 'previous', permettant de retirer au média affiché la classe 'active', et d'attribuer au média précédent la classe 'active'.
    previousButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.previousElementSibling) {
            m.previousElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:last-child').classList.add('active')
        }
    });

    // Ajout d'un évènement au clique sur sur le bouton 'previous', permettant de retirer au média affiché la classe 'active', et d'attribuer au média suivant la classe 'active'.
    nextButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.nextElementSibling) {
            m.nextElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:first-child').classList.add('active')
        }
    });

    // Ajout d'un évènement sur la page qui permets d'utiliser les évènements au clique grâce au clavier.
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
 * Initialisation d'une fonction permettant de display block la modale de carroussel qui est initialement display none.
 * @function [<openMediasModal>]
 * @param {Number} id - ID unique du média selectionné, permettant son affichage en premier. 
 */
function openMediasModal(id) {

    const modal = document.getElementById("medias_modal");
    const img = document.getElementById('mediaModal_' + id); // On récupère le média qui comporte l'id 'mediaModal_' + l'ID unique du média choisi.

    modal.style.display = 'block' // On display block la modale.
    modal.querySelectorAll('.mediaModal').forEach(m => {
        m.classList.remove('active') // On vient enlever la classe 'active' à tous les médias de la modale.
    })
    img.classList.add('active') // On vient ajouter la classe 'active' au média choisi pour pouvoir ouvrir la modale directement sur ce média.

    const previousButton = modal.querySelector('.previous-button');
    previousButton.focus();

    document.querySelector("main").setAttribute("aria-hidden", "true");
}