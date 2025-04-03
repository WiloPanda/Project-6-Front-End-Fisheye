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
                    <div class="likes"><p tabindex="0">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/Heart.png" alt="heart icon to like a media"/></div>
                </div>  
            `
        );

        if (!document.querySelector('aside')) {
            const sectionMedia = document.querySelector('.photographe_medias');
            sectionMedia.insertAdjacentHTML("afterend",
                `
        <aside>
            <p class="photographer_Likes">
                <span class="totalLikes">${this.likes}</span>
                <img class="fas fa-heart" src="assets/icons/Heart.png" aria-hidden="true" alt="heart icon showing total likes count"></span>
            </p>
            <span>${this.photographer.price}€ / day</span>
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

class ImageMedia extends MainMedia {
    /** 
        * Constructor for creating a new image media.
        * @constructor
        * @param {Object} media - Data of the media.
        * @param {Object} photographer - Data of the photographer.
    */
    constructor(media, photographer) {
        super(media, photographer);
        this.image = `assets/photos/Sample Photos/${photographer.name}/${media.image}`;
    }

    /**
        * Creates an image media element and adds it to the DOM.
        * @method [<createMedia>]
        * @override
        * @returns {HTMLElement} - Returns an <article> element representing the image media.
    */
    createMedia() {
        const article = super.createMedia();
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <img src="${this.image}" alt="${this.title}" class="mediaImage" tabindex="0"/>
            `
        );

        let imageModal = article.querySelectorAll('.mediaImage')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une vidéo permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une vidéo permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        });

        return article;
    }

    /**
       * Creates a video media element for the modal.
       * @method [<createMediaModal>]
       * @returns {HTMLElement} - Returns a <div> element representing the video media in the modal.
   */
    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
                <p>${this.title}</p> 
            `
        )

        return (article)
    }
}

class VideoMedia extends MainMedia {
    /** 
        * Constructor for creating a new video media.
        * @constructor
        * @param {Object} media - Data of the media.
        * @param {Object} photographer - Data of the photographer.
    */
    constructor(media, photographer) {
        super(media, photographer);
        this.film = `assets/photos/Sample Photos/${photographer.name}/${media.video}`;
    }

    /**
        * Creates a video media element and adds it to the DOM.
        * @method [<createMedia>]
        * @override
        * @returns {HTMLElement} - Returns an <article> element representing the video media.
    */
    createMedia() {
        const article = super.createMedia();
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <video alt="${this.title}" class="mediaVideo" tabindex="0">
            <source src="${this.film}" type=video/mp4>
            </video>
            `
        );

        let imageModal = article.querySelectorAll('.mediaVideo')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une vidéo permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une vidéo permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        });

        return article;
    }

    /**
        * Creates a video media element for the modal.
        * @method [<createMediaModal>]
        * @returns {HTMLElement} - Returns a <div> element representing the video media in the modal.
    */
    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
            <video class="video" alt="${this.title}" tabindex="0" controls auto>
            <source src="${this.video}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        return (article)
    }

}
