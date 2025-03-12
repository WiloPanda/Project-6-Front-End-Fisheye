
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

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function sendForm(event) {
    event.preventDefault();
    let inputForm = document.querySelectorAll("input");
    inputForm.forEach(input => {
        console.log(input.value)
    })
}