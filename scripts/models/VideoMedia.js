class VideoMedia extends MainMedia {
    /** 
        * Constructor for creating a new video media.
        * @constructor
        * @param {Object} media - Data of the media.
        * @param {Object} photographer - Data of the photographer.
    */
    constructor(media, photographer) {
        super(media, photographer);
        this.film = `assets/photos/sample_photos/${photographer.name}/${media.video}`;
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
            <video alt="${this.title}" aria-label="${this.title}" class="mediaVideo" tabindex="0" controls>
            <source src="${this.film}" type=video/mp4>
            </video>
            `
        );

        let imageModal = article.querySelectorAll('.mediaVideo')
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
            <video class="video" alt="${this.title}" tabindex="0" aria-label="${this.title}" controls auto>
            <source src="${this.film}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        return (article)
    }

}