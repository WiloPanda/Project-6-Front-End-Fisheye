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

    const firstFocusable = modal.getElementById("firstname");
    if (firstFocusable) {
        firstFocusable.focus();
    }

    document.querySelector("main").setAttribute("aria-hidden", "true");
}

/**
 * Close the contact form.
 * @function [<closeModal>]
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    document.querySelector("main").removeAttribute("aria-hidden");

    const firstFocusable = document.querySelector(".contact_button");
    firstFocusable.focus();

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

//Management of the accessibility of the modal
const modal = document.getElementById("contact_modal");
const focusables = modal.querySelectorAll('[data-index]');
const first = focusables[0];
const last = focusables[focusables.length - 1];

modal.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        const activeElement = document.activeElement;
        const isShift = e.shiftKey;

        if (!isShift && activeElement === last) {
            e.preventDefault();
            first.focus();
        } else if (isShift && activeElement === first) {
            e.preventDefault();
            last.focus();
        }
    }
});
