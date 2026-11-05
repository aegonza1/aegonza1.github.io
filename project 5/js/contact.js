
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

// Get your existing form elements
const contactForm = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const questionsInput = document.getElementById("questions");

// Create a status message
const statusMessage = document.createElement("p");
statusMessage.id = "contact-status";
statusMessage.setAttribute("role", "status");
statusMessage.setAttribute("aria-live", "polite");
contactForm.appendChild(statusMessage);

const submitButton = contactForm.querySelector('button[type="submit"]');

// Submit contact form
contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const questions = questionsInput.value.trim();

    // Check that all fields have information
    if (!name || !email || !questions) {
        statusMessage.textContent = "Please complete all fields.";
        return;
    }

    // Show loading message
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    statusMessage.textContent = "Sending your message...";

    try {
        // Save contact information to Firebase
        await addDoc(collection(db, "contactMessages"), {
            name: name,
            email: email,
            questions: questions,
            submittedAt: serverTimestamp()
        });

        statusMessage.textContent =
            "Thank you! Your message has been submitted successfully.";

        contactForm.reset();

    } catch (error) {
        console.error("Error submitting contact form:", error);

        statusMessage.textContent =
            "Something went wrong. Please try again.";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
    }
});
