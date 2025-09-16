const userId = localStorage.getItem('userId');
if (!userId || userId.length !== 24) {
  window.location.href = '/login.html';
}

document.getElementById('logoutLink').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('userId');
  window.location.href = '/login.html';
});

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])
  );
}

function showMessage(id, text, isError = false, autoHide = true) {
  const el = document.getElementById(id);
  if (!el) return;

  el.textContent = text;
  el.className = isError ? 'error' : 'success';

  if (autoHide) {
    setTimeout(() => {
      el.textContent = '';
      el.className = '';
    }, 4000);
  }
}

function confirmDelete() {
  return confirm('Are you sure you want to delete this complaint?');
}

async function loadMy() {
  const container = document.getElementById('myList');
  container.innerHTML = '<p class="small">Loading...</p>';
  try {
    const res = await fetch(`/complaints/user/${userId}`);
    const text = await res.text();
    let list;
    try {
      list = JSON.parse(text);
    } catch {
      list = [];
    }

    container.innerHTML = '';
    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = '<p>No complaints yet.</p>';
      return;
    }

    list.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = item.image ? `/uploads/${item.image}` : '/css/placeholder.png';
      img.alt = item.title || 'Complaint';
      img.loading = 'lazy';

      const info = document.createElement('div');
      info.innerHTML = `
        <strong>${escapeHtml(item.title || 'Untitled')}</strong>
        <p class="small">ID: ${escapeHtml(item.id)}</p>
        <p class="small">Location: ${escapeHtml(item.location || '')}</p>
        <p>${escapeHtml(item.description || '')}</p>
        <div class="actions">
          <span class="badge ${escapeHtml(item.status || 'Pending')}">
            ${escapeHtml(item.status || 'Pending')}
          </span>
          <button onclick="onDelete('${item.id}')">Delete</button>
        </div>
      `;
      card.appendChild(img);
      card.appendChild(info);
      container.appendChild(card);
    });
  } catch {
    container.innerHTML = '<p class="small error">Failed to load your complaints.</p>';
  }
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const location = document.getElementById('location').value.trim();
  const image = document.getElementById('image').files[0];
  const c_username = localStorage.getItem('c_username');

  if (!title || !image || !location) {
    showMessage('msg', 'Title, image, and location are required.', true);
    return;
  }

  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('location', location);
  formData.append('image', image);
  formData.append('c_username', c_username || '');

  try {
    const res = await fetch('/complaints/add', { method: 'POST', body: formData });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (res.ok) {
      showMessage('msg', 'Complaint added successfully.');
      document.getElementById('addForm').reset();
      loadMy();
    } else {
      showMessage('msg', 'Failed: ' + data, true);
    }
  } catch {
    showMessage('msg', 'Network error while adding complaint.', true);
  }
});

async function onDelete(id) {
  if (!confirmDelete()) return;
  try {
    const res = await fetch(
      `/complaints/delete/${encodeURIComponent(id)}?userId=${encodeURIComponent(userId)}`,
      { method: 'DELETE' }
    );
    const text = await res.text();

    if (res.ok && (text === 'OK' || text === 'Deleted' || text === '')) {
      showMessage('msg', 'Complaint deleted successfully.');
      loadMy();
    } else {
      showMessage('msg', 'Delete failed: ' + text, true);
    }
  } catch {
    showMessage('msg', 'Network error while deleting.', true);
  }
}

document.getElementById('refreshBtn').addEventListener('click', loadMy);

loadMy();
