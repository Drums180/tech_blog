// Get the logout button
const logoutBtn = document.querySelector("#logout-btn");

// Add an event listener to the logout button
logoutBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    // Send a POST request to the server to destroy the user session
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Redirect the user to the home page
      document.location.replace("/");
    } else {
      alert("Failed to logout");
    }
  } catch (err) {
    console.log(err);
  }
});
