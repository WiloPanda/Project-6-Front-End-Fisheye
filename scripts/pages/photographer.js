document.addEventListener("DOMContentLoaded", function () {

    async function init() {
        const id = getId();
        console.log(id);
        const datas = await getData();
        console.log(datas);
        const photographer = sortPhotographer(id, datas.photographers);
        console.log(photographer);
        const media = sortMedia(id, datas.media);
        console.log(media);
        displayData(photographer);
        displayMedia(media, photographer)
    }

    init();

    /**
     * Get the ID of the photographer from the URL.
     * @returns {string} La valeur du paramètre "id".
     */
    function getId() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        return id;
    }

    /**
     * Get data from the JSON file.
     * @returns {object} Les données des photographes.
     */
    function getData() {
        return fetch("data/photographers.json")
            .then(function (response) {
                return response.json();
            })
            .catch(error => console.error(error));
    }

    /**
     * Sort the photographer by ID.
     * @param {string} id - The ID of the photographer.
     * @param {object} photographers - The list of photographers.
     * @returns {object} The photographer.
     */
    function sortPhotographer(id, photographers) {
        return photographers.find(photographer => photographer.id == id);
    }

    /**
     * Sort the photographer by ID.
     * @param {string} id - The ID of the photographer.
     * @param {object} media - The list of media.
     * @returns {object} The medias of the photographer.
     */
    function sortMedia(photographerId, media) {
        return media.filter(media => media.photographerId == photographerId);
    }

    async function displayData(photographer) {
        const photographersSection = document.querySelector(".photograph-header");
        const photographerModel = photographerProfileTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }

    async function displayMedia(media, photographer) {

        const mediaContainer = document.querySelector(".photograph-medias");

        media.forEach(media => {

            if (media.image) {
                let imageMedia = new ImageMedia(media, photographer);
                let article = imageMedia.createMedia(); // createMedia
                console.log(article);
                mediaContainer.appendChild(article);
            } else {
                let videoMedia = new VideoMedia(media, photographer);
                let article = videoMedia.createMedia();
                console.log(article);
                mediaContainer.appendChild(article);
            }
        });
    }

    async function openMediasModal(id) {

    }
});


