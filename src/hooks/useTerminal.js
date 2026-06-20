import { useCallback, useState } from "react";
import { commands, NOT_FOUND } from "../data/terminalCommands";
import { profile } from "../data/profile";

const WELCOME = [
  `${profile.handle}::terminal v1.0`,
  "Type 'help' to see available commands.",
];

let lineId = 0;
const nextId = () => `l${lineId++}`;

/**
 * Encapsulates terminal output history, command execution, and
 * command-history (up/down arrow) navigation.
 */
export default function useTerminal() {
  const [lines, setLines] = useState(() => WELCOME.map((text) => ({ id: nextId(), text, type: "system" })));
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(null);

  const pushLines = useCallback((newLines, type = "output") => {
    setLines((prev) => [...prev, ...newLines.map((text) => ({ id: nextId(), text, type }))]);
  }, []);

  const run = useCallback(
    (rawCmd) => {
      const cmd = rawCmd.trim();
      if (!cmd) return;

      setCmdHistory((prev) => [...prev, cmd]);
      setHistoryPointer(null);

      pushLines([`root@${profile.handle}:~$ ${cmd}`], "input");

      const key = cmd.toLowerCase();
      const entry = commands[key];

      if (!entry) {
        pushLines(NOT_FOUND(cmd), "error");
        return;
      }

      if (entry.sideEffect === "clear") {
        setLines([]);
        return;
      }

      if (entry.sideEffect === "show-history") {
        pushLines(cmdHistory.length ? cmdHistory : ["(no history yet)"], "output");
        return;
      }

      if (entry.sideEffect === "open-resume") {
        pushLines(entry.output(), "output");
        window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
        return;
      }

      pushLines(entry.output(), "output");
    },
    [pushLines, cmdHistory]
  );

  const navigateHistory = useCallback(
    (direction) => {
      if (cmdHistory.length === 0) return null;
      let nextPointer;
      if (historyPointer === null) {
        nextPointer = direction === "up" ? cmdHistory.length - 1 : null;
      } else {
        nextPointer = historyPointer + (direction === "up" ? -1 : 1);
      }

      if (nextPointer === null || nextPointer < 0) {
        setHistoryPointer(null);
        return "";
      }
      if (nextPointer >= cmdHistory.length) {
        setHistoryPointer(null);
        return "";
      }
      setHistoryPointer(nextPointer);
      return cmdHistory[nextPointer];
    },
    [cmdHistory, historyPointer]
  );

  return { lines, run, navigateHistory };
}
