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

    const editButtons = document.querySelectorAll(".edit-post");

    editButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
        const postId = event.target.closest("button").getAttribute("data-id");
        document.location.replace(`api/post/${postId}/edit`); // Update the route here
      });
    });
  });
});
