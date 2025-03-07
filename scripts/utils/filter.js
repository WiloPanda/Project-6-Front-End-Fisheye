const filterPopularity = document.querySelector(".filter_popularity");
filterPopularity.addEventListener("click", function () {
    const mediaOrdonnees = Array.from(media);
    mediaOrdonnees.sort(function (a, b) {
        return a.likes - b.likes;
    });
    console.log(mediaOrdonnees);
    document.querySelector(".media").innerHTML = "";
    displayMedia(media, photographer);
});

const filterDate = document.querySelector(".filter_date");
filterDate.addEventListener("click", function () {
    const mediaOrdonnees = Array.from(media);
    mediaOrdonnees.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });
    console.log(mediaOrdonnees);
    document.querySelector(".media").innerHTML = "";
    displayMedia(media, photographer);
});

const filterTitle = document.querySelector(".filter_title");
filterTitle.addEventListener("click", function () {
    const mediaOrdonnees = Array.from(media);
    mediaOrdonnees.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    console.log(mediaOrdonnees);
    document.querySelector(".media").innerHTML = "";
    displayMedia(media, photographer);
});