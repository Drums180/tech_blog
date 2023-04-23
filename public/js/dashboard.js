document.addEventListener("DOMContentLoaded", () => {
  const deletePostHandler = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${postId}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Post deleted successfully.");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post.");
    }
  };

  document.querySelectorAll(".delete-post").forEach((btn) => {
    btn.addEventListener("click", deletePostHandler);
  });
});
