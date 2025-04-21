class ImageMedia extends MainMedia {
    /** 
        * Constructor for creating a new image media.
        * @constructor
        * @param {Object} media - Data of the media.
        * @param {Object} photographer - Data of the photographer.
    */
    constructor(media, photographer) {
        super(media, photographer);
        this.image = `assets/photos/sample_photos/${photographer.name}/${media.image}`;
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
            <img src="${this.image}" alt="${this.title}" aria-label="${this.title}" class="mediaImage" tabindex="0"/>
            `
        );

        let imageModal = article.querySelectorAll('.mediaImage')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id))
            element.addEventListener('keydown', (e) => {
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
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" aria-label="${this.title}" tabindex="0"/>
                <p>${this.title}</p> 
            `
        )

        return (article)
    }
}