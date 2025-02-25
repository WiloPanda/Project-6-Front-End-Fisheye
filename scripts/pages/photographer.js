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
        displayData(photographer);
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

    function photographerTemplate(data) {
        const { name, portrait, city, country, tagline } = data;

        const picture = `assets/photos/Sample Photos/Photographers ID Photos/${portrait}`;
        function getUserCardDOM() {
            const section = document.createElement('section');
            section.insertAdjacentHTML("beforeend", `
            <div class="presentation">
                <h1>${name}</h1>
                <h2>${city}, ${country}</h2>
                <p class="tagline">${tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <div class="profile_picture">
                <img src="${picture}" alt="photo de profile de ${name}"/>
            </div>
        `);
            return section;
        }
        return { name, picture, getUserCardDOM }
    }


    async function displayData(photographer) {
        const photographersSection = document.querySelector(".photograph-header");

        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }
});

