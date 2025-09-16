function isNotEmpty(value) {
  return value && value.trim().length > 0;
}

function showMessage(id, text, isError = false) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.style.color = isError ? 'red' : 'green';
}

document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!isNotEmpty(username) || !isNotEmpty(password)) {
    showMessage('message', 'All fields are required', true);
    return;
  }

  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  try {
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });

    const text = await res.text();

    if (text === 'OK') {
      showMessage('message', 'Registration successful! Redirecting to login...');
      setTimeout(() => window.location.href = '/login.html', 1000);
    } else {
      showMessage('message', text, true);
    }
  } catch {
    showMessage('message', 'Network error', true);
  }
});
