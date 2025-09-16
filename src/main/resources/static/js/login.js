function isNotEmpty(value) {
  return value && value.trim().length > 0;
}

function showMessage(id, text, isError = false) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.style.color = isError ? 'red' : 'green';
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!isNotEmpty(username) || !isNotEmpty(password)) {
    showMessage('message', 'All fields required', true);
    return;
  }

  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });

    const text = await res.text();

    if (text && text.length === 24) {
      localStorage.setItem('userId', text);
      showMessage('message', 'Login successful. Redirecting...');
      setTimeout(() => window.location.href = '/dashboard.html', 800);
    } else {
      showMessage('message', text || 'Invalid credentials', true);
    }
  } catch {
    showMessage('message', 'Network error', true);
  }
});
