document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-post");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postId = event.target.getAttribute("data-id");
      const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Post deleted successfully");
        document.location.reload();
      } else {
        alert("Failed to delete the post");
      }
    });
  });
});
