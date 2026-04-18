const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");

function printLine(text) {
const div = document.createElement("div");
div.className = "line";
div.innerText = text;
terminal.appendChild(div);
}

function printOutput(text) {
const div = document.createElement("div");
div.className = "output";
div.innerText = text;
terminal.appendChild(div);
}

function space() {
const div = document.createElement("div");
div.innerHTML = "<br>";
terminal.appendChild(div);
}

input.addEventListener("keydown", function(e) {
if (e.key === "Enter") {
const cmd = input.value.trim();

```
printLine("root@0xsaurav-exe:~$ " + cmd);

switch(cmd) {

  case "whoami":
    printOutput("0xsaurav-exe");
    space();
    break;

  case "about":
    printOutput("Cybersecurity Trainee focused on VAPT and penetration testing.");
    space();
    break;

  case "projects":
    printOutput("Projects:");
    printOutput("-------------------------");
    printOutput("• Network Enumeration Lab");
    printOutput("• Linux Privilege Escalation");
    printOutput("• Web Application Security Testing");
    printOutput("• Steganography Analysis");
    space();
    break;

  case "contact":
    printOutput("Contact:");
    printOutput("-------------------------");
    printOutput("LinkedIn: linkedin.com/in/saurav-saini-eh");
    printOutput("TryHackMe: tryhackme.com/p/KillerSourav");
    printOutput("GitHub: github.com/0xsaurav-exe");
    printOutput("Email: sauravsaini31609@gmail.com");
    space();
    break;

  case "clear":
    terminal.innerHTML = "";
    break;

  default:
    printOutput("Command not found");
    space();
}

input.value = "";
window.scrollTo(0, document.body.scrollHeight);
```

}
});
