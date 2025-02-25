function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photos/Sample Photos/Photographers ID Photos/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.insertAdjacentHTML('beforeend', `
            <a href="./photographer.html?id=${id}" tabindex="0" aria-label="voir la page de ${name}">
            <img src="${picture}" alt="photo de profile de ${name}"/>   
            <h2>${name}</h2>
            </a>
            <h3>${city}, ${country}</h3>
            <p class="tagline">${tagline}</p>
            <p class="price" aria-label="le coût de la prestation de ${name} est de ${price}€ par jour">${price}€/jour</p>
        `);
        return article;
    }
    return { name, picture, getUserCardDOM }
}