/**
 * Create a template for the photographer profile.
 * @function [<photographerProfileTemplate>]
 * @param {object} data - Data of the photographer.
 * @returns {object} An object containing the photographer's name, profile picture, and a method to generate the profile DOM.
 */
function photographerProfileTemplate(data) {
    const { name, portrait, city, country, tagline } = data;

    const picture = `assets/photos/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const div = document.createElement('div');
        div.classList.add("profile");


        div.insertAdjacentHTML("beforeend", `
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
        const formName = document.querySelector(".modal_title");
        formName.insertAdjacentHTML("beforeend", `<br>${name}`);
        return div;
    }

    return { name, picture, getUserCardDOM };
}

/**
 * Display the contact form.
 * @function [<displayModal>]
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

/**
 * Close the contact form.
 * @function [<closeModal>]
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");

    modal.style.display = "none";
}

/**
 * Send the form.
 * @function [<sendForm>]
 * @param {object} event - The event.
 */
function sendForm(event) {
    event.preventDefault();
    let inputForm = document.querySelectorAll("form");
    let objectcontacform = {
        firstName: inputForm[0].elements[0].value,
        name: inputForm[0].elements[1].value,
        email: inputForm[0].elements[2].value,
        message: inputForm[0].elements[3].value,
    };
    console.log(objectcontacform);
}