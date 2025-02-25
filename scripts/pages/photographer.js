//Mettre le code JavaScript lié à la page photographer.html
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


    function sortMedia(photographerId, media) {
        return media.filter(media => media.photographerId == photographerId);
    }














});

