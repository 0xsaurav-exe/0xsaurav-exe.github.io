document.addEventListener("DOMContentLoaded", function () {

const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const form = document.getElementById("terminalForm");

function print(text) {
const div = document.createElement("div");
div.style.marginTop = "6px";
div.innerText = text;
terminal.appendChild(div);
}

  
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
  
async function runCommand(cmd) {
print("root@0xsaurav-exe:~$ " + cmd);

if (cmd === "whoami") {
print("0xsaurav-exe");

} else if (cmd === "about") {
print("Cybersecurity Trainee focused on VAPT and penetration testing.");

} else if (cmd === "projects") {
loading("[+] Scanning projects", 1200);

print(" ");
print("=== Projects ===");

print("• Network Enumeration Lab");
print("• Linux Privilege Escalation");
print("• Web Application Security Testing");

print(" ");

} else if (cmd === "contact") {
loading("[+] Fetching contact", 1000);

print(" ");
print("=== Contact ===");

print("LinkedIn: linkedin.com/in/saurav-saini-eh");
print("TryHackMe: tryhackme.com/p/KillerSourav");
print("GitHub: github.com/0xsaurav-exe");
print("Email: sauravsaini31609@gmail.com");

print(" ");
  
} else if (cmd === "clear") {
const header = document.getElementById("terminalHeader");
terminal.innerHTML = "";
terminal.appendChild(header);
return;

} else {
print("Command not found");
}
}form.addEventListener("submit", function (e) {
e.preventDefault();

const cmd = input.value.trim();
if (cmd === "") return;

runCommand(cmd);
input.value = "";

});

});
