document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-post");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postId = event.target.getAttribute("data-id");
      const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirectTo) {
          document.location.replace(data.redirectTo);
        } else {
          alert("Post deleted successfully");
          document.location.reload();
        }
      } else {
        alert("Failed to delete the post");
      }
    });
  });
});
