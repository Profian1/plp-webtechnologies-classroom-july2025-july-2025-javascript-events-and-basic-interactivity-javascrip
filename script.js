// This file handles event listeners, interactive features, and form validation

// Initialize variables and DOM elements when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Counter Game Variables
  let count = 0;
  const counterDisplay = document.getElementById("counter");
  const counterMessage = document.getElementById("counter-message");

  // Form Elements
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submit-btn");
  const formResult = document.getElementById("form-result");

  // PART 1: COUNTER GAME INTERACTIVE FEATURE

  // Event listeners for counter buttons
  document.getElementById("increase").addEventListener("click", function () {
    count++;
    updateCounter();
  });

  document.getElementById("decrease").addEventListener("click", function () {
    count--;
    updateCounter();
  });

  // Function to update counter display and message
  function updateCounter() {
    // Update counter display
    counterDisplay.textContent = count;

    // Update message based on count
    if (count > 10) {
      counterMessage.textContent = "Wow, that's a high number!";
      counterMessage.style.color = "green";
    } else if (count < 0) {
      counterMessage.textContent = "Negative numbers are fun too!";
      counterMessage.style.color = "orange";
    } else {
      counterMessage.textContent = "";
    }

    // Change counter color based on value
    if (count > 0) {
      counterDisplay.style.color = "green";
    } else if (count < 0) {
      counterDisplay.style.color = "red";
    } else {
      counterDisplay.style.color = "black";
    }
  }

  // PART 2: LIGHT/DARK MODE TOGGLE

  const themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    // Toggle dark mode class on body
    document.body.classList.toggle("dark-mode");

    // Update button text based on current theme
    if (document.body.classList.contains("dark-mode")) {
      themeToggleBtn.textContent = "Switch to Light Mode";
    } else {
      themeToggleBtn.textContent = "Switch to Dark Mode";
    }
  });

  // PART 3: COLLAPSIBLE FAQ SECTION

  // Add event listeners to all FAQ toggle buttons
  const faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      // Get the next sibling element (the content div)
      const content = this.nextElementSibling;

      // Toggle the content visibility
      if (content.style.display === "block") {
        content.style.display = "none";
        this.textContent = this.textContent.replace("▼ ", "");
      } else {
        content.style.display = "block";
        this.textContent = "▼ " + this.textContent;
      }
    });
  });

  // PART 4: FORM VALIDATION

  // Real-time validation on input blur
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);
  messageInput.addEventListener("blur", validateMessage);

  // Form submission validation
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isMessageValid = validateMessage();

    // If all validations pass, show success message
    if (isNameValid && isEmailValid && isPasswordValid && isMessageValid) {
      // Hide form and show success message
      contactForm.style.display = "none";
      formResult.className = "success";
      formResult.innerHTML = `
                <h3>Thank you for your message!</h3>
                <p>Name: ${nameInput.value}</p>
                <p>Email: ${emailInput.value}</p>
                <p>Message: ${messageInput.value}</p>
            `;

      // Reset form for next use
      contactForm.reset();
      clearAllErrors();
    } else {
      formResult.className = "error";
      formResult.innerHTML =
        "<p>Please correct the errors above and try again.</p>";
    }
  });

  // VALIDATION FUNCTIONS

  function validateName() {
    const name = nameInput.value.trim();
    const errorElement = document.getElementById("name-error");

    if (name === "") {
      errorElement.textContent = "Name is required";
      nameInput.classList.add("invalid");
      return false;
    } else if (name.length < 2) {
      errorElement.textContent = "Name must be at least 2 characters";
      nameInput.classList.add("invalid");
      return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errorElement.textContent = "Name can only contain letters and spaces";
      nameInput.classList.add("invalid");
      return false;
    } else {
      errorElement.textContent = "";
      nameInput.classList.remove("invalid");
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const errorElement = document.getElementById("email-error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      errorElement.textContent = "Email is required";
      emailInput.classList.add("invalid");
      return false;
    } else if (!emailRegex.test(email)) {
      errorElement.textContent = "Please enter a valid email address";
      emailInput.classList.add("invalid");
      return false;
    } else {
      errorElement.textContent = "";
      emailInput.classList.remove("invalid");
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;
    const errorElement = document.getElementById("password-error");

    if (password === "") {
      errorElement.textContent = "Password is required";
      passwordInput.classList.add("invalid");
      return false;
    } else if (password.length < 8) {
      errorElement.textContent = "Password must be at least 8 characters";
      passwordInput.classList.add("invalid");
      return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errorElement.textContent =
        "Password must contain uppercase, lowercase, and number";
      passwordInput.classList.add("invalid");
      return false;
    } else {
      errorElement.textContent = "";
      passwordInput.classList.remove("invalid");
      return true;
    }
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    const errorElement = document.getElementById("message-error");

    if (message === "") {
      errorElement.textContent = "Message is required";
      messageInput.classList.add("invalid");
      return false;
    } else if (message.length < 10) {
      errorElement.textContent = "Message must be at least 10 characters";
      messageInput.classList.add("invalid");
      return false;
    } else {
      errorElement.textContent = "";
      messageInput.classList.remove("invalid");
      return true;
    }
  }

  function clearAllErrors() {
    document
      .querySelectorAll(".error")
      .forEach((error) => (error.textContent = ""));
    document
      .querySelectorAll("input, textarea")
      .forEach((input) => input.classList.remove("invalid"));
  }
});
