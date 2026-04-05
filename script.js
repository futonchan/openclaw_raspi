const clock = document.getElementById('clock');
const themeToggle = document.getElementById('themeToggle');

function renderClock() {
  const now = new Date();
  clock.textContent = now.toLocaleString('ja-JP', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });
}

function loadTheme() {
  const saved = localStorage.getItem('sample-theme');
  if (saved === 'light') {
    document.body.classList.add('light');
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');
  const mode = document.body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('sample-theme', mode);
}

loadTheme();
renderClock();
setInterval(renderClock, 1000);
themeToggle.addEventListener('click', toggleTheme);
