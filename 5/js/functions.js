async function getData() {
    try {
        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Failed to fetch JSON file");
        }

        const data = await response.json();
        changeContent(data);

    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function changeContent(data) {
    document.title = data.title;

    document.getElementById("styleName").textContent = data.header;

    document.getElementById("heroTitle").textContent =
        data.hero.headline;

    document.getElementById("heroDesc").textContent =
        data.hero.description;

    document.getElementById("heroSection").style.setProperty(
        "--hero-img",
        `url("${data.hero.image}")`
    );

    document.getElementById("sec1Title").textContent =
        data.sections.overview.title;

    document.getElementById("sec1Subtitle").textContent =
        data.sections.overview.subtitle;

    const overviewCards = document.querySelectorAll("#sec1Grid .card");

    data.sections.overview.cards.forEach((card, index) => {
        overviewCards[index].querySelector("h3").textContent =
            card.title;

        overviewCards[index].querySelector("p").textContent =
            card.description;
    });

    document.getElementById("sec2Title").textContent =
        data.sections.equipment.title;

    document.getElementById("sec2Subtitle").textContent =
        data.sections.equipment.subtitle;

    const equipmentCards = document.querySelectorAll("#sec2Grid .card");

    data.sections.equipment.cards.forEach((card, index) => {
        equipmentCards[index].querySelector("h3").textContent =
            card.title;

        equipmentCards[index].querySelector("p").textContent =
            card.description;
    });
}

getData();
