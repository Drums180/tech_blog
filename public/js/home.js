document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".comment-form form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const postId = form
        .querySelector("button[type='submit']")
        .getAttribute("data-post-id");
      const content = form
        .querySelector(`input[data-post-id="${postId}"]`)
        .value.trim();

      if (content) {
        const response = await fetch("/api/comment", {
          method: "POST",
          body: JSON.stringify({ content, post_id: postId }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          document.location.reload();
        } else {
          alert("Please login");
        }
      }
    });
  });
});
