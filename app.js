const content = document.getElementById("content");

// Example: server se data load karna
fetch(MEDIA_SERVER_URL)
  .then(res => res.text())
  .then(data => {
    content.innerHTML = data;
  })
  .catch(() => {
    content.innerHTML = "Server offline hai ya link galat hai.";
  });
