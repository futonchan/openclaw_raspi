const clock = document.getElementById('clock');
const themeToggle = document.getElementById('themeToggle');
const installButton = document.getElementById('installButton');
const installStatus = document.getElementById('installStatus');
const connectionStatus = document.getElementById('connectionStatus');
const saveStatus = document.getElementById('saveStatus');
const memoInput = document.getElementById('memoInput');
const saveMemoButton = document.getElementById('saveMemoButton');
const clearMemoButton = document.getElementById('clearMemoButton');

let deferredPrompt = null;

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

function loadMemo() {
  const saved = localStorage.getItem('sample-memo');
  if (saved) {
    memoInput.value = saved;
    saveStatus.textContent = '保存済み';
  }
}

function saveMemo() {
  localStorage.setItem('sample-memo', memoInput.value);
  saveStatus.textContent = `保存済み (${new Date().toLocaleTimeString('ja-JP')})`;
}

function clearMemo() {
  memoInput.value = '';
  localStorage.removeItem('sample-memo');
  saveStatus.textContent = 'クリア済み';
}

function updateConnectionStatus() {
  connectionStatus.textContent = navigator.onLine ? 'オンライン' : 'オフライン';
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    installStatus.textContent = 'このブラウザでは Service Worker 非対応です。';
    return;
  }

  try {
    await navigator.serviceWorker.register('./sw.js');
    installStatus.textContent = 'Service Worker を登録しました。';
  } catch (error) {
    installStatus.textContent = 'Service Worker の登録に失敗しました。';
    console.error(error);
  }
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.hidden = false;
  installStatus.textContent = 'ホーム画面に追加できる状態です。';
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installButton.hidden = true;
  installStatus.textContent = 'インストール操作を実行しました。';
});

window.addEventListener('appinstalled', () => {
  installButton.hidden = true;
  installStatus.textContent = 'アプリとしてインストールされました。';
});

window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

themeToggle.addEventListener('click', toggleTheme);
saveMemoButton.addEventListener('click', saveMemo);
clearMemoButton.addEventListener('click', clearMemo);

loadTheme();
loadMemo();
renderClock();
updateConnectionStatus();
registerServiceWorker();
setInterval(renderClock, 1000);
