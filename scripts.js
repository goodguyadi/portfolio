document.addEventListener('DOMContentLoaded', () => {
  const blogList = document.getElementById('blog-list');

  fetch('posts.json')                // same folder, no path tricks
    .then(res => res.json())
    .then(posts => {
      posts.forEach(p => {
        // build a Bootstrap-style card
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <div class="card-body">
            <h3 class="card-title">${p.title}</h3>
            <p class="text-muted mb-1">${p.date}</p>
            <p class="card-text">${p.excerpt}</p>
            <button class="btn btn-sm btn-outline-primary" data-full="${p.content}">
              Read more
            </button>
          </div>
        `;

        // when user clicks "Read more", reveal full content
       card.querySelector('button').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  const cardBody = btn.parentElement;

  // If full text is already showing, collapse it
  const existing = cardBody.querySelector('.full-post');
  if (existing) {
    existing.remove();
    btn.textContent = 'View more';
    return;
  }

  // Otherwise, expand the post
  const fullDiv = document.createElement('div');
  fullDiv.className = 'full-post mt-3';
  fullDiv.innerHTML = btn.dataset.full;   // HTML already stored in data-full
  cardBody.appendChild(fullDiv);
  btn.textContent = 'Show less';
});


        blogList.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading blog posts:', err));
});
