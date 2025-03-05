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
        const { id, likes, title } = media;
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
        return (article);
    }
}

class ImageMedia extends MainMedia {

    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média de type video.
        * @constructor
        * @function super - Récupération des datas de la class Medias grâce à l'utilisation de super().
        * @param {string} `assets/photos/Sample Photos/${photographer.name}/${media.image}`- Le chemin de l'image correspondant au média.
    */
    constructor(media, photographer) {
        super(media, photographer)
        this.image = `assets/photos/Sample Photos/${photographer.name}/${media.image}`;
    }

    /**
        * Initialisation de la fonction createMedia, permettant de créer un média de type image dans le DOM à la suite du HTML de base d'un média.
        * @function [<createMedia>]
        * @override
        * @return {HTMLElement} - Retourne un élément HTML <article> spécifique qui représente le média de type image.
    */
    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <img src="${this.image}" alt="${this.title}" class="mediaImage" tabindex="0"/>
            `
        )

        let imageModal = article.querySelectorAll('.mediaImage')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une image permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une image permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }
}

class VideoMedia extends MainMedia {

    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média de type video.
        * @constructor
        * @function super - Récupération des datas de la class Medias grâce à l'utilisation de super().
        * @param {string} `assets/photos/Sample Photos/${photographer.name}/${media.video}` - Le chemin de la vidéo correspondant au média.
    */
    constructor(media, photographer) {
        super(media, photographer)
        this.film = `assets/photos/Sample Photos/${photographer.name}/${media.video}`;
    }

    /**
        * Initialisation de la fonction createMedia, permettant de créer un média de type video dans le DOM à la suite du HTML de base d'un média.
        * @function [<createMedia>]
        * @override
        * @return {HTMLElement} - Retourne un élément HTML <article> spécifique qui représente le média de type video.
    */
    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <video alt="${this.title}" class="mediaVideo" tabindex="0">
            <source src="${this.film}" type=video/mp4>
            </video>
            `
        )

        let imageModal = article.querySelectorAll('.mediaVideo')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une vidéo permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une vidéo permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }
    /**
        * Initialisation de la fonction createMediaModal, permettant de créer un média de type video dans le DOM à l'intérieur d'une div représentant une modale.
        * @function [<createMediaModal>]
        * @return {HTMLElement} - Retourne un élément HTML <div> spécifique qui représente le média de type video dans une modale.
    */
    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
            <video width="350" height="300" class="video" alt="${this.title}" tabindex="0" controls auto>
            <source src="${this.video}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        return (article)
    }
}