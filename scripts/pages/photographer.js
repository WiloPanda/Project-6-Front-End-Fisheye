document.addEventListener("DOMContentLoaded", function () {

    /**
     * Main function calling all the other functions.
     * @function [<init>]
     */
    async function init() {
        const id = getId();
        const datas = await getData();
        const photographer = sortPhotographer(id, datas.photographers);
        const media = sortMedia(id, datas.media);
        displayData(photographer);
        displayMedia(media, photographer)
        sortFilter(media, photographer);
    }

    init();

    /**
     * Get the ID of the photographer from the URL.
     * @function [<getId>]
     * @returns {string} - Value of "id".
     */
    function getId() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        return id;
    }

    /**
     * Get data from the JSON file.
     * @function [<getData>]
     * @returns {object} Data of the photographers.
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
     * @function [<sortPhotographer>]
     * @param {string} id - The ID of the photographer.
     * @param {object} photographers - The list of photographers.
     * @returns {object} The data of the photographer.
     */
    function sortPhotographer(id, photographers) {
        return photographers.find(photographer => photographer.id == id);
    }

    /**
     * Sort the medias by the photographe ID.
     * @function [<sortMedia>]
     * @param {string} id - The ID of the photographer.
     * @param {object} media - The list of media.
     * @returns {object} The medias of the photographer.
     */
    function sortMedia(photographerId, media) {
        return media.filter(media => media.photographerId == photographerId);
    }

    /**
     * Display the photographer's data in the header section.
     * @function [<displayData>]
     * @param {object} photographer - The data of the photographer.
     */
    async function displayData(photographer) {
        const photographersSection = document.querySelector(".photographe_header");
        const photographerModel = photographerProfileTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }

    /**
     * Display the Images and Videos of the photographer in the section photographe_medias
     * Call the fonction calculateTotalLikes.
     * @function [<displayMedia>]
     * @param {object} media - The data of the medias of the photographer.
     * @param {object} photographer - The data of the photographer.
     */
    async function displayMedia(media, photographer) {

        const mediaContainer = document.querySelector(".photographe_medias");

        media.forEach(media => {

            if (media.image) {
                let imageMedia = new ImageMedia(media, photographer);
                let article = imageMedia.createMedia();
                console.log(article);
                mediaContainer.appendChild(article);
            } else {
                let videoMedia = new VideoMedia(media, photographer);
                let article = videoMedia.createMedia();
                console.log(article);
                mediaContainer.appendChild(article);
            }
        });

        let totalLikes = calculateTotalLikes(media);
        document.querySelector(".totalLikes").textContent = totalLikes;
    }


    /**
     * Calculate the total of likes of the medias.
     * @function [<calculateTotalLikes>]
     * @param {object} media - The data of the medias of the photographer.
     * @returns {string} The total of likes of the medias.
     */
    function calculateTotalLikes(media) {
        let totalLikes = 0;
        media.forEach(media => {
            totalLikes += media.likes;
        });
        return totalLikes;
    }

    /**
     * Sort the medias by popularity, date or title.
     * @function [<sortFilter>]
     * @param {object} media - The data of the medias of the photographer.
     * @param {object} photographer - The data of the photographer.
     * @returns {object} The medias sorted
     */
    function sortFilter(mediaOrdonnees, photographer) {
        const options = document.querySelectorAll(".dropdown_options");

        options.forEach(option => {
            option.addEventListener("click", (e) => {
                console.log("Clicked option:", e.target.textContent);

                mediaOrdonnees.sort((a, b) => {
                    switch (e.target.textContent.trim()) {
                        case "Popularité":
                            return b.likes - a.likes;
                        case "Date":
                            return new Date(b.date) - new Date(a.date);
                        case "Titre":
                            return a.title.localeCompare(b.title);
                        default:
                            return 0;
                    }
                });

                document.querySelector(".photographe_medias").innerHTML = "";
                console.log("Médias triés :", mediaOrdonnees);
                displayMedia(mediaOrdonnees, photographer);
            });
        });
    }


});


