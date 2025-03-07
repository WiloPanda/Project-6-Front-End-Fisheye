function likes() {
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
}
