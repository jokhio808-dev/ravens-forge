// app.js

document.addEventListener("DOMContentLoaded", () => {
  loadVideos();
});

async function loadVideos() {
  const apiKey = "AIzaSyBja4lxCJkn8uxYXI7XXVn5ceEyeEnN-ec";
  const channelId = "UCokuQOkrloT8rqVHbkquUqg";
  const maxResults = 6;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
    );

    const data = await response.json();
    const items = data.items.filter(item => item.id.videoId);

    const grid = document.querySelector('#video-grid');
    if (grid) {
      grid.innerHTML = items.map(video => {
        const v = video.snippet;
        const id = video.id.videoId;
        return `
          <article class="video-card">
            <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
              <img loading="lazy" src="${v.thumbnails.high.url}" alt="${v.title}">
            </a>
            <div class="meta">
              <h3>${v.title}</h3>
              <a class="card-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Watch on YouTube</a>
            </div>
          </article>
        `;
      }).join('');
    }
  } catch (error) {
    console.error("Failed to load videos:", error);
  }
}
// Add any additional JavaScript functionality here if needed
// For example, you could add event listeners or other interactive features.