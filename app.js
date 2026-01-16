const content = document.getElementById("content");

content.innerHTML = `
  <iframe 
    src="${MEDIA_SERVER_URL}" 
    style="width:100%; height:90vh; border:none; border-radius:12px; background:#000;">
  </iframe>
`;
