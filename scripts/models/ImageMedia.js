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