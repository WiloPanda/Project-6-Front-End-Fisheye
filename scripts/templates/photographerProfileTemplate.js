function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.innerHTML = ` 
            <div class="modal">
                <header>
                    <h2>Contactez-moi <br>${name}</h2>
                    <img src="assets/icons/close.svg" onclick="closeModal()" />
                </header>
                <form onsubmit="sendForm(event)">
                    <div>
                        <label>Prenom</label>
                        <input type="text" name="firstname" required />
                        <label>Nom</label>
                        <input type="text" name="lastname" required />
                        <label>Email</label>
                        <input type="email" name="email" required />
                        <label>Message</label>
                        <textarea name="message" required cols="70" rows="10"></textarea>
                    </div>
                    <button type="submit" class="contact_button">Envoyer</button>
                </form>
            </div>
        `;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function sendForm(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form);
}

function photographerProfileTemplate(data) {
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
    return { name, picture, getUserCardDOM };
}
