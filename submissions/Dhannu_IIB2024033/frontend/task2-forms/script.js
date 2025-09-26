const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const toggleLink = document.getElementById("toggle-link");
const confirmPasswordGroup = document.querySelector(".signup-only");
const button = document.querySelector(".btn");

let isSignup = true;

// Toggle between signup and login
toggleLink.addEventListener("click", () => {
  isSignup = !isSignup;
  if (isSignup) {
    formTitle.textContent = "Create Account ✨";
    confirmPasswordGroup.style.display = "block";
    button.textContent = "Sign Up";
    toggleLink.textContent = "Login";
  } else {
    formTitle.textContent = "Welcome Back 👋";
    confirmPasswordGroup.style.display = "none";
    button.textContent = "Login";
    toggleLink.textContent = "Sign Up";
  }
  form.reset();
  clearErrors();
});

// Validation function
function validateForm() {
  let valid = true;

  // Email validation
  const email = document.getElementById("email");
  const emailError = email.nextElementSibling.nextElementSibling;
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.textContent = "Enter a valid email";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  // Password validation
  const password = document.getElementById("password");
  const passError = password.nextElementSibling.nextElementSibling;
  if (password.value.length < 6) {
    passError.textContent = "At least 6 characters required";
    valid = false;
  } else {
    passError.textContent = "";
  }

  // Confirm password (only in signup)
  if (isSignup) {
    const confirmPassword = document.getElementById("confirmPassword");
    const confirmError = confirmPassword.nextElementSibling.nextElementSibling;
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
      confirmError.textContent = "Passwords don’t match";
      valid = false;
    } else {
      confirmError.textContent = "";
    }
  }
  return valid;
}

// Clear errors
function clearErrors() {
  document.querySelectorAll(".error").forEach(err => err.textContent = "");
}

// Handle form submit
form.addEventListener("submit", e => {
  e.preventDefault();
  if (validateForm()) {
    alert(isSignup ? "✅ Signup successful!" : "✅ Login successful!");
    form.reset();
  }
});
