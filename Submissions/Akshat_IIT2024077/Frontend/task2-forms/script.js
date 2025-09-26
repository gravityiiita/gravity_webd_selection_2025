const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpasswd = document.getElementById("confirm");
const form = document.querySelector(".Form");
const button = document.querySelector(".Submit");
const message = document.querySelector(".message");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const setmessage = (text, type) => {
  message.textContent = text || "";
  message.classList.toggle("red", type === "error");
  message.classList.toggle("green", type === "success");
};

const getmailErr = () => {
  const v = email.value.trim();
  if (!v) return "Email is required";
  if (!emailPattern.test(v)) return "Invalid email format";
  return null;
};

const getPasswdErr = () => {
  const v = password.value;
  if (!v) return "Password is required";
  if (v.length < 6) return "Password should be at least 6 characters long";
  return null;
};

const getConfirmError = () => {
  const v = confirmpasswd.value;
  if (!v) return "Please confirm password";
  if (v !== password.value) return "Passwords do not match";
  return null;
};

const validateAll = () => {
  return getmailErr() || getPasswdErr() || getConfirmError() || null;
};

email.addEventListener("input", () => {
  const err = getmailErr();

  if (err) {
    setmessage(err, "error");
  } else {
    setmessage("Email seems good", "success");
  }

  if (!getPasswdErr() && !getConfirmError() && !err) {
    setmessage("All fields are valid — ready to submit", "success");
  }
});

password.addEventListener("input", () => {
  const err = getPasswdErr();

  if (err) {
    setmessage(err, "error");
  } else {
    setmessage("Password length is OK", "success");
  }

  const confirmErr = getConfirmError();
  if (confirmErr && confirmpasswd.value) setmessage(confirmErr, "error");

  if (!getmailErr() && !err && !confirmErr) {
    setmessage("All fields valid — ready to submit", "success");
  }
});

confirmpasswd.addEventListener("input", () => {
  const err = getConfirmError();

  if (err) {
    setmessage(err, "error");
  } else {
    setmessage("Passwords match", "success");
  }

  if (!getmailErr() && !getPasswdErr() && !err) {
    setmessage("All fields valid — ready to submit", "success");
  }
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  const errorMessage = validateAll();
  console.log(email, password, confirmpasswd);
  if (errorMessage) {
    setmessage(errorMessage, "error");
  } else {
    setmessage("Form submitted successfully!", "success");
    console.log(email.value, password.value, confirmpasswd.value);
  }
});
