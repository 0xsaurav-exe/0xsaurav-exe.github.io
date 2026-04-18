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

async function hackerLogs() {
const logs = [
"[] Initializing scan...",
"[] Target acquired: 192.168.0.1",
"[] Scanning open ports...",
"[+] Port 22 open (SSH)",
"[+] Port 80 open (HTTP)",
"[] Enumerating services...",
"[] Testing vulnerabilities...",
"[+] Possible SQL Injection found",
"[] Attempting privilege escalation...",
"[+] Access granted ✔"
];

for (let i = 0; i < logs.length; i++) {
await print(logs[i], 8);
}
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

await hackerLogs(); // 🔥 hacker animation

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
