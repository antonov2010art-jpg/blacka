let audioUnlocked = false;
document.addEventListener("click", () => {
  if (audioUnlocked) return;
  ["soundClick", "soundSubmit", "soundError"].forEach(id => {
    const a = document.getElementById(id);
    if (a) {
      a.muted = true;
      a.play().catch(() => {});
      a.pause();
      a.muted = false;
    }
  });
  audioUnlocked = true;
}, { once: true });
const ADMIN_KEY = "blackkinggg";

const form = document.getElementById("voteForm");
const adminBtn = document.getElementById("adminReset");

const soundClick = document.getElementById("soundClick");
const soundSubmit = document.getElementById("soundSubmit");
const soundError = document.getElementById("soundError");

// безопасный запуск звука
function play(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

// выбор кнопки
function select(btn) {
  play(soundClick);

  const parent = btn.parentElement;
  const buttons = parent.querySelectorAll("button");

  buttons.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

// если уже голосовал
if (localStorage.getItem("blackAwardsVoted")) {
  play(soundError);
  disableVoting("Ты уже голосовал 🛑");
}

// админ-режим (Shift + A)
document.addEventListener("keydown", function (e) {
  if (e.shiftKey && e.key.toLowerCase() === "a") {
    const key = prompt("Админ-ключ:");
    if (key === ADMIN_KEY) {
      localStorage.setItem("admin", "true");
      alert("Админ-режим включён 👑");
      showAdminButton();
    } else {
      play(soundError);
      alert("Неверный ключ");
    }
  }
});

// показать админ-кнопку
function showAdminButton() {
  if (adminBtn) adminBtn.style.display = "inline-block";
}

// сброс голоса
adminBtn?.addEventListener("click", function () {
  localStorage.removeItem("blackAwardsVoted");
  alert("Голос сброшен 👑");
  location.reload();
});

// отправка формы
form?.addEventListener("submit", function (e) {
  e.preventDefault();

  play(soundSubmit);
  localStorage.setItem("blackAwardsVoted", "true");
  disableVoting("Голос принят 👑");
});

// отключение формы
function disableVoting(message) {
  if (!form) return;

  const msg = document.createElement("h2");
  msg.innerText = message;
  msg.style.marginTop = "30px";

  form.querySelectorAll("button").forEach(b => b.disabled = true);
  form.appendChild(msg);
}

// если админ уже включён
if (localStorage.getItem("admin") === "true") {
  showAdminButton();
}