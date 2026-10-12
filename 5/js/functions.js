function getData() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => changeContent(data));
}

function changeContent(data) {
    document.title = data.title;
    document.getElementById("styleName").textContent = data.header;
    document.getElementById("heroTitle").textContent = data.hero.headline;
    document.getElementById("heroDesc").textContent = data.hero.description;

    document.getElementById("heroSection").style.setProperty(
        "--hero-img",
        `url("${data.hero.image}")`
    );

    document.getElementById("sec1Title").textContent = data.sections.overview.title;
    document.getElementById("sec1Subtitle").textContent = data.sections.overview.subtitle;

    let cards = document.querySelectorAll("#sec1Grid .card");

    data.sections.overview.cards.forEach((card, i) => {
        cards[i].querySelector("h3").textContent = card.title;
        cards[i].querySelector("p").textContent = card.description;
    });

    document.getElementById("sec2Title").textContent = data.sections.equipment.title;
    document.getElementById("sec2Subtitle").textContent = data.sections.equipment.subtitle;

    cards = document.querySelectorAll("#sec2Grid .card");

    data.sections.equipment.cards.forEach((card, i) => {
        cards[i].querySelector("h3").textContent = card.title;
        cards[i].querySelector("p").textContent = card.description;
    });
}

//document.getElementById("changeThemeBtn").addEventListener("click", getData);
document.getElementById("changeThemeBtn").addEventListener("click", function() {
    console.log("Button clicked!");
    getData();
});
