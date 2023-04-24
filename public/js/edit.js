const updateForm = document.querySelector("#update-form");
const titleInput = document.querySelector("input[name='title']");
const contentInput = document.querySelector("textarea[name='content']");
const postId = document.querySelector("#post-id").value;
const submitButton = document.querySelector("#submit");

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleInput.value,
        content: contentInput.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to update post.");
    }
    location.href = "/";
  } catch (err) {
    console.log(err);
  }
});
