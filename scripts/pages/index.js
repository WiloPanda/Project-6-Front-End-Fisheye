/**
 * Get data from the JSON file.
 * @function [<getPhotographers>]
 * @returns {object} Data of the photographers.
 */
async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();
    return photographers;
}

/**
 * Display the photographers in the photographers section.
 * @function [<displayData>]
 * @param {Object} photographers - Data of the photographers.
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographersTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

/**
 * Main function calling all the other functions.
 * @function [<init>]
 */
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

