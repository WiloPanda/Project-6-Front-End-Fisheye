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
    return { name, picture, getUserCardDOM }
}