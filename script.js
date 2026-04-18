document.addEventListener("DOMContentLoaded", function () {

const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const form = document.getElementById("terminalForm");

input.value = "";

function printLine(text) {
const div = document.createElement("div");
div.className = "line";
div.innerText = text;
terminal.appendChild(div);
}

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
});
```

}

function space() {
const div = document.createElement("div");
div.innerHTML = "<br>";
terminal.appendChild(div);
}

function loading(text, duration) {
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
});
```

}

async function runCommand(cmd) {
printLine("root@0xsaurav-exe:~$ " + cmd);

```
if (cmd === "whoami") {
  await typeOutput("0xsaurav-exe");

} else if (cmd === "about") {
  await typeOutput("Cybersecurity Trainee focused on VAPT and penetration testing.");

} else if (cmd === "projects") {
  await loading("Loading projects", 1200);
  await typeOutput("Projects:");
  await typeOutput("-------------------------");
  await typeOutput("• Network Enumeration Lab");
  await typeOutput("• Linux Privilege Escalation");
  await typeOutput("• Web Application Security Testing");
  await typeOutput("• Steganography Analysis");

} else if (cmd === "contact") {
  await loading("Fetching contact", 1000);
  await typeOutput("Contact:");
  await typeOutput("-------------------------");
  await typeOutput("LinkedIn: linkedin.com/in/saurav-saini-eh");
  await typeOutput("TryHackMe: tryhackme.com/p/KillerSourav");
  await typeOutput("GitHub: github.com/0xsaurav-exe");
  await typeOutput("Email: sauravsaini31609@gmail.com");

} else if (cmd === "clear") {
  terminal.innerHTML = "";
  return;

} else {
  await typeOutput("Command not found");
}

space();
window.scrollTo(0, document.body.scrollHeight);
```

}

/* ✅ FIXED ENTER HANDLING (FORM BASED) */
form.addEventListener("submit", function (e) {
e.preventDefault();

```
const cmd = input.value.trim();

if (cmd === "") return;

runCommand(cmd);

input.value = "";
```

});

/* clickable commands */
document.querySelectorAll(".command-link").forEach(function (el) {
el.addEventListener("click", function () {
runCommand(el.innerText);
});
});

});
