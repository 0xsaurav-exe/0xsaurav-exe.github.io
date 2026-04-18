document.addEventListener("DOMContentLoaded", () => {

const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");

/* print command */
function printLine(text) {
const div = document.createElement("div");
div.className = "line";
div.innerText = text;
terminal.appendChild(div);
}

/* typing effect */
function typeOutput(text, speed = 15) {
return new Promise((resolve) => {
const div = document.createElement("div");
div.className = "output";
terminal.appendChild(div);

```
let i = 0;

function typing() {
  if (i < text.length) {
    div.innerText += text.charAt(i);
    i++;
    setTimeout(typing, speed);
  } else {
    resolve();
  }
}

typing();
```

});
}

/* spacing */
function space() {
const div = document.createElement("div");
div.innerHTML = "<br>";
terminal.appendChild(div);
}

/* loading animation */
function loading(text = "Scanning", duration = 1000) {
return new Promise((resolve) => {
const div = document.createElement("div");
div.className = "output";
terminal.appendChild(div);

```
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
```

});
}

/* command handler */
async function runCommand(cmd) {
printLine("root@0xsaurav-exe:~$ " + cmd);

switch (cmd) {

```
case "whoami":
  await typeOutput("0xsaurav-exe");
  space();
  break;

case "about":
  await typeOutput("Cybersecurity Trainee focused on VAPT and penetration testing.");
  space();
  break;

case "projects":
  await loading("Loading projects", 1200);
  await typeOutput("Projects:");
  await typeOutput("-------------------------");
  await typeOutput("• Network Enumeration Lab");
  await typeOutput("• Linux Privilege Escalation");
  await typeOutput("• Web Application Security Testing");
  await typeOutput("• Steganography Analysis");
  space();
  break;

case "contact":
  await loading("Fetching contact", 1000);
  await typeOutput("Contact:");
  await typeOutput("-------------------------");
  await typeOutput("LinkedIn: linkedin.com/in/saurav-saini-eh");
  await typeOutput("TryHackMe: tryhackme.com/p/KillerSourav");
  await typeOutput("GitHub: github.com/0xsaurav-exe");
  await typeOutput("Email: sauravsaini31609@gmail.com");
  space();
  break;

case "clear":
  terminal.innerHTML = "";
  break;

default:
  await typeOutput("Command not found");
  space();
```

}

window.scrollTo(0, document.body.scrollHeight);
}

/* ENTER key fix */
input.addEventListener("keydown", function (e) {
if (e.key === "Enter") {
e.preventDefault();   // IMPORTANT FIX
const cmd = input.value.trim();
runCommand(cmd);
input.value = "";
}
});

/* clickable commands */
document.querySelectorAll(".command-link").forEach(el => {
el.addEventListener("click", () => {
runCommand(el.innerText);
});
});

});
