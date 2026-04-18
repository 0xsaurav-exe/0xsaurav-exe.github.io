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

function runCommand(cmd) {
print("root@0xsaurav-exe:~$ " + cmd);

if (cmd === "whoami") {
  print("0xsaurav-exe");

} else if (cmd === "about") {
  print("Cybersecurity Trainee focused on VAPT and penetration testing.");

} else if (cmd === "projects") {
  print("Projects:");
  print("- Network Enumeration Lab");
  print("- Linux Privilege Escalation");
  print("- Web Application Security Testing");

} else if (cmd === "contact") {
  print("Contact:");
  print("LinkedIn: linkedin.com/in/saurav-saini-eh");
  print("TryHackMe: tryhackme.com/p/KillerSourav");
  print("GitHub: github.com/0xsaurav-exe");
  print("Email: sauravsaini31609@gmail.com");

} else if (cmd === "clear") {
  const header = document.getElementById("terminalHeader");
  terminal.innerHTML = "";
  terminal.appendChild(header);
  return;

} else {
  print("Command not found");
}

}

form.addEventListener("submit", function (e) {
e.preventDefault();

const cmd = input.value.trim();
if (cmd === "") return;

runCommand(cmd);
input.value = "";

});

});
