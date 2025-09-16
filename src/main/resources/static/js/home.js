async function loadAll() {
  const container = document.getElementById('identitiesContainer');
  container.innerHTML = '<p class="small">Loading...</p>';

  try {
    const res = await fetch('/complaints/all');
    const list = await res.json();

    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = '<p>No identities found.</p>';
      return;
    }

    container.innerHTML = '';

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = item.image ? `/uploads/${item.image}` : '/css/placeholder.png';
      img.alt = item.title || 'Identity';
      img.loading = 'lazy';

      const info = document.createElement('div');
      const statusClass = (item.status || 'Pending').toLowerCase();
      info.innerHTML = `
        <strong>${escapeHtml(item.title || 'Untitled')}</strong>
        <p class="small">User ID: <b>${escapeHtml(item.id || 'Unknown')}</b></p>
        <p class="small">Location: ${escapeHtml(item.location || 'N/A')}</p>
        <p class="small">
          Status:
          <span class="badge status-${statusClass}">
            ${escapeHtml(item.status || 'Pending')}
          </span>
        </p>
        <p>${escapeHtml(item.description || '')}</p>
      `;

      card.appendChild(img);
      card.appendChild(info);
      container.appendChild(card);
    });
  } catch {
    container.innerHTML = '<p class="small">Failed to load identities.</p>';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])
  );
}

loadAll();
