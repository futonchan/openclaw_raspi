const alarmTimeInput = document.getElementById('alarmTime');
const saveAlarmButton = document.getElementById('saveAlarmButton');
const clearAlarmButton = document.getElementById('clearAlarmButton');
const saveMessage = document.getElementById('saveMessage');
const clock = document.getElementById('clock');
const alarmDisplay = document.getElementById('alarmDisplay');
const alarmState = document.getElementById('alarmState');

let currentAlarm = null;
let alarmTriggered = false;

function nowLabel() {
  return new Date().toLocaleString('ja-JP', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });
}

function renderClock() {
  clock.textContent = nowLabel();
}

function loadAlarm() {
  const saved = localStorage.getItem('slot-alarm-time');
  if (!saved) return;
  currentAlarm = saved;
  alarmTimeInput.value = saved;
  alarmDisplay.textContent = saved;
  saveMessage.textContent = '保存済みのアラームを読み込みました。';
}

function saveAlarm() {
  const value = alarmTimeInput.value;
  if (!value) {
    saveMessage.textContent = '時刻を入力してから保存してください。';
    return;
  }

  currentAlarm = value;
  localStorage.setItem('slot-alarm-time', value);
  alarmDisplay.textContent = value;
  alarmTriggered = false;
  alarmState.textContent = '待機中';
  saveMessage.textContent = `アラームを ${value} に保存しました。`;
}

function clearAlarm() {
  currentAlarm = null;
  alarmTriggered = false;
  localStorage.removeItem('slot-alarm-time');
  alarmTimeInput.value = '';
  alarmDisplay.textContent = '未設定';
  alarmState.textContent = '待機中';
  saveMessage.textContent = 'アラームをクリアしました。';
}

function checkAlarm() {
  if (!currentAlarm || alarmTriggered) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const current = `${hh}:${mm}`;

  if (current === currentAlarm) {
    alarmTriggered = true;
    alarmState.textContent = '発火中（次の段階で777解除を実装）';
    document.body.classList.add('alarm-active');
    saveMessage.textContent = 'アラームが発火しました。';
  }
}

saveAlarmButton.addEventListener('click', saveAlarm);
clearAlarmButton.addEventListener('click', clearAlarm);

loadAlarm();
renderClock();
setInterval(() => {
  renderClock();
  checkAlarm();
}, 1000);
