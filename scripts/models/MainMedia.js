class MainMedia {
    /** 
        * Use a constructor to create a new media object.
        * @constructor
        * @param {Object} media - Data of the media.
        * @param {Object} photographer - Data of the photographer.
    */
    constructor(media, photographer) {
        const { date, price, id, likes, title } = media;
        this.photographer = photographer;
        this.title = title;
        this.likes = likes;
        this.id = id;
        this.date = date;
        this.price = price;
    }

    /**
        * Creates an HTML media element and adds it to the DOM.
        * @method [<createMedia>]
        * @returns {HTMLElement} - Returns an <article> element representing the media.
    */
    createMedia() {
        const article = document.createElement('article');
        article.classList.add("media");
        article.insertAdjacentHTML(
            "beforeend",
            `
                <div class="descriptionPicture">
                    <p tabindex="0">${this.title}</p>
                    <div class="likes"><p tabindex="0" aria-label="il y a ${this.likes} j'aime sur ce média">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/Heart.png" 
                    aria-label="îcone de coeur pour aimer un média" alt="Îcone de coeur pour aimer un média"/></div>
                </div>  
            `
        );

        if (!document.querySelector('aside')) {
            const sectionMedia = document.querySelector('.photographe_medias');
            sectionMedia.insertAdjacentHTML("afterend",
                `
        <aside>
            <p class="photographer_Likes">
                <span aria-label="nombre total de "j'aime" sur les médias de ${this.photographer.name}" tabindex="0" class="totalLikes">${this.likes}</span>
                <img class="fas fa-heart" src="assets/icons/Heart.png" aria-label="Îcone de coeur" tabindex="0" aria-hidden="true" alt="îcone de coeur"></span>
            </p>
            <span aria-label="le coût de la prestation de ${this.photographer.name} est de ${this.photographer.price}€ par jour" tabindex="0">${this.photographer.price}€ / day</span>
        </aside>
        `
            );
        }

        let likeHeart = article.getElementsByClassName('heart')[0];
        likeHeart.addEventListener('click', function incLike(e) {

            likeHeart.classList.add('heartliked');
            let likeValue = parseInt(e.target.parentElement.textContent);
            let intValue = e.target.parentElement.querySelector('p');
            let totalLikes = document.querySelector(".totalLikes");

            intValue.innerHTML = likeValue + 1;
            totalLikes.innerHTML = parseInt(totalLikes.textContent) + 1;

            likeHeart.removeEventListener('click', incLike); // Remove event after click to prevent multiple increments
        });

        likeHeart.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                likeHeart.click();
            }
        });
        return article;
    }
}