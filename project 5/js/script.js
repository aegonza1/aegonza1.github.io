"use strict";

// Connect the Join button to the sign-up section.
function setupLearnMoreButton() {
    const learnMoreButton = document.querySelector("#learnMoreBtn");
    const signupSection = document.querySelector("#signup");

    if (learnMoreButton && signupSection) {
        learnMoreButton.addEventListener("click", function () {
            signupSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    }
}

// Validate the sign-up form before showing a confirmation.
function setupSignupForm() {
    const signupForm = document.querySelector("#signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!signupForm.checkValidity()) {
                signupForm.reportValidity();
                return;
            }

            alert("Your form is ready to submit!");
        });
    }
}

// Set up the interactive features on the current page.
function initializeApp() {
    setupLearnMoreButton();
    setupSignupForm();
}

document.addEventListener("DOMContentLoaded", initializeApp);