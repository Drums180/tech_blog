const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log("Login username:", username); // Add this line
  console.log("Login password:", password); // Add this line

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Successfully logged in.");
      document.location.replace("/");
    } else {
      alert("Incorrect username or password.");
    }
  }
};

const signinFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  console.log("Signup username:", username); // Add this line
  console.log("Signup password:", password); // Add this line

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Successfully signed up.");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to sign up.");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.querySelector("#login-tab");
  const signupTab = document.querySelector("#signup-tab");
  const loginForm = document.querySelector(".login-form");
  const signinForm = document.querySelector(".signup-form");

  console.log("loginTab:", loginTab);
  console.log("signupTab:", signupTab);
  console.log("loginForm:", loginForm);
  console.log("signinForm:", signinForm);

  loginTab.addEventListener("click", (event) => {
    event.preventDefault();
    loginTab.parentElement.classList.add("is-active");
    signupTab.parentElement.classList.remove("is-active");
    document.querySelector(".login-content").classList.remove("is-hidden");
    document.querySelector(".signup-content").classList.add("is-hidden");
  });

  signupTab.addEventListener("click", (event) => {
    event.preventDefault();
    signupTab.parentElement.classList.add("is-active");
    loginTab.parentElement.classList.remove("is-active");
    document.querySelector(".signup-content").classList.remove("is-hidden");
    document.querySelector(".login-content").classList.add("is-hidden");
  });

  if (loginForm) {
    loginForm.addEventListener("submit", loginFormHandler);
  } else {
    console.error("loginForm not found");
  }

  if (signinForm) {
    signinForm.addEventListener("submit", signinFormHandler);
  } else {
    console.error("signinForm not found");
  }
});
