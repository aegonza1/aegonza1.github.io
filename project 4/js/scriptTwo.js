
"use strict";

const DATA_URL = "js/data.json";

// Load the astronomy information from the JSON file.
async function loadAstronomyData() {
    const factGrid = document.querySelector("#fact-grid");

    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error("Unable to load astronomy data.");
        }

        const data = await response.json();

        if (!Array.isArray(data.categories)) {
            throw new Error("The JSON file needs a categories array.");
        }

        // Display the first choices: Stars and Planets.
        renderChoices({
            title: "EXPLORE THE UNIVERSE.",
            description: "Choose a category to explore!",
            items: data.categories
        });

    } catch (error) {
        console.error("Error loading astronomy data:", error);
        factGrid.textContent =
            "Unable to load astronomy information. Please try again.";
    }
}

// Display a screen of choices.
// This function works for categories and any number of nested options.
function renderChoices(screen, history = []) {
    const factGrid = document.querySelector("#fact-grid");
    const title = document.querySelector("#space-title");
    const details = document.querySelector("#details");

    title.replaceChildren();
    factGrid.replaceChildren();
    details.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = screen.title.toUpperCase();
    title.appendChild(heading);

    if (screen.description) {
        const description = document.createElement("p");
        description.textContent = screen.description;
        title.appendChild(description);
    }

    screen.items.forEach(function (item) {
        const button = document.createElement("button");
        button.className = "fact";
        button.type = "button";

        // Add an image when this choice has one.
        if (item.image) {
            const image = document.createElement("img");
            image.src = item.image;
            image.alt = item.alt || item.name;
            button.appendChild(image);
        }

        const label = document.createElement("p");
        label.textContent = item.name;
        button.appendChild(label);

        button.addEventListener("click", function () {
            // A choice may contain either "items" or "options".
            const children = item.items || item.options;

            if (Array.isArray(children) && children.length > 0) {
                // Save this screen so Back returns to it.
                const nextScreen = {
                    title: item.name,
                    description: item.description,
                    items: children
                };

                renderChoices(nextScreen, [...history, screen]);
            } else {
                // No more choices: display the final information.
                renderDetails(item, [...history, screen]);
            }
        });

        factGrid.appendChild(button);
    });

    // Add a Back button on every screen except the first.
    if (history.length > 0) {
        addBackButton(function () {
            const previousScreen = history[history.length - 1];
            const previousHistory = history.slice(0, -1);

            renderChoices(previousScreen, previousHistory);
        }, factGrid);
    }
}

// Display the selected object's image and description.
function renderDetails(item, history) {
    const factGrid = document.querySelector("#fact-grid");
    const title = document.querySelector("#space-title");
    const details = document.querySelector("#details");

    factGrid.replaceChildren();
    title.replaceChildren();
    details.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = item.name;
    details.appendChild(heading);

    if (item.image) {
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.alt || item.name;
        image.className = "detail-image";

        details.appendChild(image);
    }

    const description = document.createElement("p");
    description.textContent =
        item.description || "No description is available yet.";

    details.appendChild(description);

    addBackButton(function () {
        const previousScreen = history[history.length - 1];
        const previousHistory = history.slice(0, -1);

        renderChoices(previousScreen, previousHistory);
    }, details);
}

// Create a reusable Back button.
function addBackButton(callback, container) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "back-button";
    button.textContent = "Back";
    button.addEventListener("click", callback);

    container.appendChild(button);
}

// Start loading after the HTML has been parsed.
document.addEventListener("DOMContentLoaded", loadAstronomyData);
