
import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// Get HTML elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const showSignup = document.getElementById("show-signup");
const switchText = document.getElementById("switch-text");

const formTitle = document.getElementById("form-title");
const formDescription = document.getElementById("form-description");

const message = document.getElementById("auth-message");
const logoutButton = document.getElementById("logout-button");

// Switch between login and signup

let isSignup = false;

switchText.addEventListener("click", function (event) {

    if (event.target.id !== "show-signup") {
        return;
    }

    isSignup = !isSignup;

    loginForm.hidden = isSignup;
    signupForm.hidden = !isSignup;

    formTitle.textContent = isSignup
        ? "Create Your Account"
        : "Login to Your Account";

    formDescription.textContent = isSignup
        ? "Join Astronomy Adventure by creating an account."
        : "Welcome back! Enter your email and password.";

    switchText.innerHTML = isSignup
        ? 'Already have an account? <button type="button" id="show-signup">Log In</button>'
        : 'Don\'t have an account? <button type="button" id="show-signup">Sign Up</button>';

    message.textContent = "";
});


// Display loading and feedback
function setLoading(button, loading) {
    button.disabled = loading;
    button.textContent = loading ? "Please wait..." :
        (button.id === "login-button" ? "Log In" : "Create Account");
}

// Register new user
signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const button = document.getElementById("signup-button");

    setLoading(button, true);
    message.textContent = "Creating your account...";

    try {

        await createUserWithEmailAndPassword(auth, email, password);

        message.textContent = "Your account was created successfully!";

        signupForm.reset();

    } catch (error) {

        message.textContent = error.message;
        console.error("Signup error:", error);

    } finally {

        setLoading(button, false);

    }

});

// Login existing user
loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const button = document.getElementById("login-button");

    setLoading(button, true);
    message.textContent = "Signing in...";

    try {

        await signInWithEmailAndPassword(auth, email, password);

        message.textContent = "You are successfully logged in!";

        loginForm.reset();

    } catch (error) {

        message.textContent = error.message;
        console.error("Login error:", error);

    } finally {

        setLoading(button, false);

    }

});

// Logout user
logoutButton.addEventListener("click", async function () {

    try {

        await signOut(auth);

        message.textContent = "You have successfully logged out.";

    } catch (error) {

        message.textContent = error.message;
        console.error("Logout error:", error);

    }

});

// Check login status
onAuthStateChanged(auth, function (user) {

    if (user) {

        message.textContent = "Logged in as " + user.email;

        loginForm.hidden = true;
        signupForm.hidden = true;
        switchText.hidden = true;

        formTitle.textContent = "Welcome to Astronomy Adventure!";

        logoutButton.hidden = false;

    } else {

        loginForm.hidden = false;
        signupForm.hidden = true;
        switchText.hidden = false;

        logoutButton.hidden = true;

    }

});

