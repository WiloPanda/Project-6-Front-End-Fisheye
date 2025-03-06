class MainMedia {

    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média.
        * @constructor
        * @param {Object} media - Object contenant les informations du média.
        * @param {string} data.title - Le titre du média.
        * @param {number} data.likes - Le nombre de likes du média.
        * @param {number} data.id - l'ID unique du média.
    */
    constructor(media) {
        const { date, price, id, likes, title } = media;
        this.title = title;
        this.likes = likes;
        this.id = id;
    }

    /**
        * Initialisation de la fonction createMedia, permettant de créer un média dans le DOM HTML.
        * @function [<createMedia>]
        * @return {HTMLElement} - Retourne un élément HTML <article> qui représente le média.
    */
    createMedia() {
        const article = document.createElement('article');
        article.classList.add("media");
        article.insertAdjacentHTML(
            "beforeend",
            `
                <div class ="descriptionPicture">
                    <p tabindex="0">${this.title}</p>
                    <div class="likes"><p tabindex="0">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/Heart.png" alt="icône coeur permettant de liker un média"/></div>
                </div>  
            `
        )

        let likeHeart = article.getElementsByClassName('heart')[0]
        likeHeart.addEventListener('click', function incLike(e) { // Ajout de l'évènement au clique sur un coeur permettant de liker un média.

            likeHeart.classList.add('heartliked');
            let likeValue = parseInt(e.target.parentElement.textContent)
            let intValue = e.target.parentElement.querySelector('p')
            let totalLikes = document.getElementById("totalLikes")

            intValue.innerHTML = likeValue + 1;
            totalLikes.innerHTML = parseInt(totalLikes.textContent) + 1;

            likeHeart.removeEventListener('click', incLike) // Retrait de l'évènement une fois un like effectué.
        })

        likeHeart.addEventListener('keydown', (e) => { // Ajout de l'évènement à l'appui sur la touche "entrée" sur un coeur permettant de liker un média.
            if (e.key === 'Enter') {
                likeHeart.click();
            }
        })

        return (article);
    }
}