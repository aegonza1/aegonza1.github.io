import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

// Get the form elements
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const messageInput = document.getElementById("contact-text");
const statusMessage = document.getElementById("contact-status");
const submitButton = contactForm.querySelector('button[type="submit"]');

// Submit contact form
contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get information entered by the visitor
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Show loading feedback
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    statusMessage.textContent = "Submitting your message...";

    try {
        // Upload information to Firestore
        await addDoc(collection(db, "contactMessages"), {
            name: name,
            email: email,
            message: message,
            submittedAt: serverTimestamp()
        });

        // Show success message
        statusMessage.textContent = "Thank you! Your message was sent successfully.";

        // Clear the form
        contactForm.reset();

    } catch (error) {
        console.error("Error submitting contact form:", error);
        statusMessage.textContent =
            "Sorry, your message could not be sent. Please try again.";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});
