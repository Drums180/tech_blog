const commentBtnHandler = async (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute("data-id");

  const commentDiv = document.querySelector(`#comment-${postId}`);
  const addCommentBtn = document.querySelector(`#add-comment-${postId}`);
  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");

  const commentInput = document.createElement("input");
  commentInput.setAttribute("type", "text");
  commentInput.setAttribute("name", "content");
  commentInput.setAttribute("placeholder", "Enter your comment");
  commentInput.classList.add("input", "is-small", "hidden");
  commentInput.required = true;

  const postIdInput = document.createElement("input");
  postIdInput.setAttribute("type", "hidden");
  postIdInput.setAttribute("name", "postId");
  postIdInput.setAttribute("value", postId);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add(
    "button",
    "is-small",
    "is-primary",
    "submit-comment-btn",
    "hidden"
  );
  submitBtn.textContent = "Submit Comment";

  commentForm.appendChild(commentInput);
  commentForm.appendChild(postIdInput);
  commentForm.appendChild(submitBtn);
  commentDiv.appendChild(commentForm);
  addCommentBtn.style.display = "none";

  commentInput.addEventListener("input", (event) => {
    if (event.target.value.trim() !== "") {
      submitBtn.classList.remove("hidden");
    } else {
      submitBtn.classList.add("hidden");
    }
  });

  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const content = commentInput.value.trim();
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({ content, postId }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create comment");
      }
    }
  });
};

document.querySelectorAll(".submit-comment-btn").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute("data-post-id");
    const content = document
      .querySelector(`input[data-post-id="${postId}"]`)
      .value.trim();

    if (content) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ content, post_id: postId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create comment");
      }
    }
  });
});
