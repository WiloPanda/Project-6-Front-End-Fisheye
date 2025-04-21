/**
 * @function [<photographersTemplate>]
 * @param {Object} data - Data of the photographer.
 * @returns {Object} - Return the name, picture and the DOM element of the photographer.
 */
function photographersTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photos/sample_photos/Photographers ID Photos/${portrait}`;
    function getUserCardDOMHome() {
        const article = document.createElement('article');
        article.insertAdjacentHTML('beforeend', `
            <a href="./photographer.html?id=${id}" tabindex="0" aria-label="voir la page de ${name}">
            <img src="${picture}" alt="photo de profile de ${name}"/>   
            <h2 aria-label="${name}" tabindex="0">${name}</h2>
            </a>
            <h3 aria-label="${city}, ${country}" tabindex="0">${city}, ${country}</h3>
            <p class="tagline" aria-label="citaion de ${name} : ${tagline}" tabindex="0">${tagline}</p>
            <p class="price" tabindex="0" aria-label="le coût de la prestation de ${name} est de ${price}€ par jour">${price}€/jour</p>
        `);
        return article;
    }

    function getUserCardDOM() {
        const div = document.createElement('div');
        div.classList.add("profile");


        div.insertAdjacentHTML("beforeend", `
            <div class="presentation">
                <h1 aria-label="${name}" tabindex="0">${name}</h1>
                <h2 aria-label="${city}, ${country}" tabindex="0">${city}, ${country}</h2>
                <p aria-label="${tagline}" tabindex="0" class="tagline">${tagline}</p>
            </div>
            <button class="contact_button" aria-label="contactez-moi" onclick="displayModal()">Contactez-moi</button>
            <div class="profile_picture">
                <img src="${picture}" tabindex="0" arial-label="photo de profile de ${name}"  alt="photo de profile de ${name}"/>
            </div>
        `);
        const formName = document.querySelector(".modal_title");
        formName.insertAdjacentHTML("beforeend", `<br>${name}`);
        return div;
    }

    return { name, picture, getUserCardDOMHome, getUserCardDOM };
}