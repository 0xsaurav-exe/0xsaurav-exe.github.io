document.addEventListener("DOMContentLoaded", function () {

const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const form = document.getElementById("terminalForm");

input.value = "";

// typing effect
function print(text, speed = 15) {
return new Promise((resolve) => {
const div = document.createElement("div");
div.style.marginTop = "6px";
terminal.appendChild(div);

  let i = 0;

  function typing() {
    if (i < text.length) {
      div.textContent = text.slice(0, i + 1);
      i++;
      setTimeout(typing, speed);
    } else {
      resolve();
    }
  }

  typing();
});

}

// loading animation
function loading(text = "Scanning", duration = 1000) {
return new Promise((resolve) => {
const div = document.createElement("div");
terminal.appendChild(div);

  let dots = 0;

  const interval = setInterval(() => {
    div.innerText = text + ".".repeat(dots % 4);
    dots++;
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
    div.innerText = text + "... done";
    resolve();
  }, duration);
});

}

async function liveScan() {
const div = document.createElement("div");
terminal.appendChild(div);

const spinner = ["|", "/", "-", "\"];
let spinIndex = 0;
let progress = 0;

return new Promise((resolve) => {

const interval = setInterval(() => {
  spinIndex = (spinIndex + 1) % spinner.length;

  div.textContent =
    `[${spinner[spinIndex]}] Scanning system... ${progress}%`;

}, 100);

function advance() {
  if (progress >= 100) {
    clearInterval(interval);
    div.textContent = "[+] Scan complete ✔";
    resolve();
    return;
  }

  // random progress jump
  progress += Math.floor(Math.random() * 8) + 1;

  // random delay (realistic)
  const delay = Math.random() * 200 + 100;
  setTimeout(advance, delay);
}

advance();

});
}

  
// command handler
async function runCommand(cmd) {
await print("root@0xsaurav-exe:~$ " + cmd);

if (cmd === "whoami") {
await print("0xsaurav-exe");

} else if (cmd === "about") {
await print("Cybersecurity Trainee focused on VAPT and penetration testing.");

} else if (cmd === "projects") {
await loading("[+] Scanning projects", 800);

await liveScan(); // 🔥 hacker animation

await print(" ");
await print("=== Projects ===");

await print("• Network Enumeration Lab");
await print("• Linux Privilege Escalation");
await print("• Web Application Security Testing");

await print(" ");

} else if (cmd === "contact") {
await loading("[+] Fetching contact", 1000);

await print(" ");
await print("=== Contact ===");

await print("LinkedIn: linkedin.com/in/saurav-saini-eh");
await print("TryHackMe: tryhackme.com/p/KillerSourav");
await print("GitHub: github.com/0xsaurav-exe");
await print("Email: sauravsaini31609@gmail.com");

await print(" ");

} else if (cmd === "clear") {
const header = document.getElementById("terminalHeader");
terminal.innerHTML = "";
terminal.appendChild(header);
return;

} else {
await print("Command not found");
}
}

// form submit (ENTER)
form.addEventListener("submit", function (e) {
e.preventDefault();

const cmd = input.value.trim();
if (cmd === "") return;

runCommand(cmd);
input.value = "";

});

// clickable commands
document.querySelectorAll(".command-link").forEach(function (el) {
el.addEventListener("click", function () {
runCommand(el.innerText);
});
});

});
