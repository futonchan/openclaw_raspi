const alarmTimeInput = document.getElementById('alarmTime');
const saveAlarmButton = document.getElementById('saveAlarmButton');
const clearAlarmButton = document.getElementById('clearAlarmButton');
const saveMessage = document.getElementById('saveMessage');
const clock = document.getElementById('clock');
const alarmDisplay = document.getElementById('alarmDisplay');
const alarmState = document.getElementById('alarmState');
const alarmBanner = document.getElementById('alarmBanner');
const slotMessage = document.getElementById('slotMessage');
const spinButton = document.getElementById('spinButton');
const slotPanel = document.getElementById('slotPanel');
const reels = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

let currentAlarm = null;
let alarmTriggered = false;
let spinLocked = false;

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
  document.body.classList.remove('alarm-cleared');
  slotPanel.classList.remove('success');
  saveMessage.textContent = `アラームを ${value} に保存しました。`;
}

function clearAlarm() {
  currentAlarm = null;
  alarmTriggered = false;
  localStorage.removeItem('slot-alarm-time');
  alarmTimeInput.value = '';
  alarmDisplay.textContent = '未設定';
  alarmState.textContent = '待機中';
  alarmBanner.hidden = true;
  document.body.classList.remove('alarm-active');
  document.body.classList.remove('alarm-cleared');
  slotPanel.classList.remove('success');
  spinButton.disabled = true;
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
    alarmState.textContent = '発火中';
    document.body.classList.add('alarm-active');
    alarmBanner.hidden = false;
    spinButton.disabled = false;
    slotMessage.textContent = 'アラーム発火中。スピンボタンで 3 リールを回せるようになった。';
    saveMessage.textContent = 'アラームが発火しました。';
  }
}

function rollWithSlip(targetNumber, slipCount) {
  const values = [];
  for (let i = slipCount; i >= 1; i -= 1) {
    values.push(String((targetNumber + i) % 10));
  }
  values.push(String(targetNumber));
  return values;
}

function stopAlarmAsWin() {
  alarmTriggered = false;
  currentAlarm = null;
  localStorage.removeItem('slot-alarm-time');
  alarmTimeInput.value = '';
  alarmDisplay.textContent = '未設定';
  alarmState.textContent = '解除成功';
  alarmBanner.hidden = true;
  document.body.classList.remove('alarm-active');
  document.body.classList.add('alarm-cleared');
  slotPanel.classList.add('success');
  spinButton.disabled = true;
  saveMessage.textContent = '777 が揃ったのでアラームを停止しました。';
  slotMessage.textContent = '777! アラーム解除成功。新しい時刻を設定すると再び使える。';
}

function previewSpin() {
  if (spinLocked) return;
  spinLocked = true;
  spinButton.disabled = true;

  const targets = reels.map(() => Math.floor(Math.random() * 10));

  reels.forEach((reel, index) => {
    reel.classList.add('spinning');
    const frames = rollWithSlip(targets[index], 3);

    frames.forEach((value, frameIndex) => {
      setTimeout(() => {
        reel.textContent = value;
      }, 120 * frameIndex + index * 90);
    });

    setTimeout(() => {
      reel.classList.remove('spinning');
      if (index === reels.length - 1) {
        const values = reels.map((item) => item.textContent);
        const isJackpot = values.every((value) => value === '7');

        if (isJackpot) {
          stopAlarmAsWin();
        } else {
          slotMessage.textContent = `結果: ${values.join(' ')}。777 が揃うまでアラームは止まらない。`;
          spinLocked = false;
          spinButton.disabled = false;
        }
      }
    }, 120 * frames.length + index * 90);
  });
}

saveAlarmButton.addEventListener('click', saveAlarm);
clearAlarmButton.addEventListener('click', clearAlarm);
spinButton.addEventListener('click', previewSpin);

loadAlarm();
renderClock();
setInterval(() => {
  renderClock();
  checkAlarm();
}, 1000);
