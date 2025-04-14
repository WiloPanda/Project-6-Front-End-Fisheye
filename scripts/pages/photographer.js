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
     * @param {Array} media - The data of the medias of the photographer.
     * @param {object} photographer - The data of the photographer.
     */
    async function displayMedia(media, photographer) {

        const mediaContainer = document.querySelector(".photographe_medias");

        media.forEach(media => {

            if (media.image) {
                let imageMedia = new ImageMedia(media, photographer);
                let article = imageMedia.createMedia();
                mediaContainer.appendChild(article);
            } else {
                let videoMedia = new VideoMedia(media, photographer);
                let article = videoMedia.createMedia();
                mediaContainer.appendChild(article);
            }
        });

        let totalLikes = calculateTotalLikes(media);
        document.querySelector(".totalLikes").textContent = totalLikes;

        initMediasModal(media, photographer);
    }


    /**
     * Calculate the total of likes of the medias.
     * @function [<calculateTotalLikes>]
     * @param {Array} media - The data of the medias of the photographer.
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
     * @param {array} media - The data of the medias of the photographer.
     * @param {object} photographer - The data of the photographer.
     * @returns {object} The medias sorted
     */
    function sortFilter(mediaOrdonnees, photographer) {
        const options = document.querySelectorAll(".dropdown_options");

        options.forEach(option => {
            option.addEventListener("click", (e) => {

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
                displayMedia(mediaOrdonnees, photographer);
            });

            option.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
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
                }

                document.querySelector(".photographe_medias").innerHTML = "";
                displayMedia(mediaOrdonnees, photographer);
            });
        });
    }


    //Management of the dropdown menu for the filter selection
    const currentFilter = document.getElementById('current_filter');
    const allFilters = Array.from(document.querySelectorAll('.dropdown_options'));
    const dropdownButton = document.getElementById('dropdown_button');
    const dropdownMenu = document.getElementById('dropdown_menu');

    let filterAlreadySelected = allFilters.find(filter => filter.textContent.trim() === currentFilter.textContent);
    if (filterAlreadySelected) {
        filterAlreadySelected.style.display = 'none';
    }

    //Open/close dropdown menu
    dropdownButton.addEventListener("click", function () {
        const isExpanded = dropdownButton.getAttribute("aria-expanded") === "true";
        dropdownButton.setAttribute("aria-expanded", !isExpanded);
        dropdownMenu.style.display = isExpanded ? "none" : "block";
    });

    //Close dropdown menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownButton.setAttribute("aria-expanded", "false");
            dropdownMenu.style.display = "none";
        }
    });

    //Event listener for filter selection
    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            updateFilter(filter);
        });
    });

    /**
     * Update the filter displayed in the dropdown menu.
     * @function [<updateFilter>] 
     * @param {object} filter - The filter selected by the user.
     */
    function updateFilter(filter) {
        //Update the current filter
        currentFilter.textContent = filter.textContent;

        //Display the previously selected filter
        if (filterAlreadySelected) {
            filterAlreadySelected.style.display = 'block';
        }

        //Hide the current filter
        filter.style.display = 'none';

        //Update the previously selected filter
        filterAlreadySelected = filter;

        //Close the dropdown menu after selecting a filter
        dropdownButton.setAttribute("aria-expanded", "false");
        dropdownMenu.style.display = "none";
    }

    //Changing of the filter with the keyboard
    allFilters.forEach(filter => {
        filter.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); //Prevent default action of Enter key
                updateFilter(filter);
            }
        });
    });

    //Close the dropdown menu when focus is lost
    dropdownMenu.addEventListener('focusout', (e) => {
        // Check if the focus is lost to an element outside the dropdown menu
        if (!dropdownMenu.contains(e.relatedTarget)) {
            // Close the dropdown menu
            if (!dropdownMenu.contains(document.activeElement)) {
                dropdownButton.setAttribute("aria-expanded", "false");
                dropdownMenu.style.display = "none";
            }

        }
    });


});
