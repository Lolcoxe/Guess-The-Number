let currentPlayer = null;

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("guessBtn").addEventListener("click", playGame);
document.getElementById("toggleBtn").addEventListener("click", toggleDarkMode);
document.getElementById("logoutBtn").addEventListener("click", logout);

function login() {
  const name = document.getElementById("playerName").value.trim();
  const pass = document.getElementById("playerPass").value.trim();

  if (!name || !pass) {
    alert("Please enter both name and password!");
    return;
  }

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  let player = accounts.find(p => p.name === name);

  if (player) {
    if (player.password === pass) {
      currentPlayer = player;
      alert(`Welcome back, ${name}!`);
    } else {
      alert("Wrong password!");
      return;
    }
  } else {
    player = { name, password: pass, score: 0 };
    accounts.push(player);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    currentPlayer = player;
    alert(`New account created for ${name}.`);
  }

  document.getElementById("loginSection").style.display = "none";
  document.getElementById("gameSection").style.display = "block";
  document.getElementById("profileInfo").textContent = `Logged in as: ${currentPlayer.name} | Score: ${currentPlayer.score}`;
  updateLeaderboard();
}

function playGame() {
  const randomNum = Math.floor(Math.random() * 10) + 1;
  const userGuess = parseInt(document.getElementById("guess").value);
  const resultDiv = document.getElementById("result");

  if (userGuess === randomNum) {
    currentPlayer.score++;
    resultDiv.textContent = `🎉 Correct! The number was ${randomNum}. Your score: ${currentPlayer.score}`;
    resultDiv.style.color = "limegreen";
  } else {
    resultDiv.textContent = `❌ Wrong! The number was ${randomNum}. Your score: ${currentPlayer.score}`;
    resultDiv.style.color = "red";
  }

  saveAccount();
  document.getElementById("profileInfo").textContent = `Logged in as: ${currentPlayer.name} | Score: ${currentPlayer.score}`;
  updateLeaderboard();
}

function logout() {
  currentPlayer = null;
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("gameSection").style.display = "none";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function saveAccount() {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const index = accounts.findIndex(p => p.name === currentPlayer.name);
  if (index !== -1) {
    accounts[index] = currentPlayer;
  }
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function updateLeaderboard() {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  accounts.sort((a, b) => b.score - a.score);

  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  accounts.slice(0, 5).forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.name}: ${player.score}`;
    list.appendChild(li);
  });
}
