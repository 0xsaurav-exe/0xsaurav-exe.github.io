document.addEventListener("DOMContentLoaded", function () {

const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const form = document.getElementById("terminalForm");

function print(text) {
const div = document.createElement("div");
div.innerText = text;
terminal.appendChild(div);
}

function runCommand(cmd) {
print("root@0xsaurav-exe:~$ " + cmd);

```
if (cmd === "whoami") {
  print("0xsaurav-exe");

} else if (cmd === "about") {
  print("Cybersecurity Trainee");

} else if (cmd === "projects") {
  print("Projects:");
  print("- Network Enumeration Lab");
  print("- Linux Privilege Escalation");

} else {
  print("Command not found");
}
```

}

form.addEventListener("submit", function (e) {
e.preventDefault();

```
const cmd = input.value.trim();
if (cmd === "") return;

runCommand(cmd);
input.value = "";
```

});

});
