const { execSync, spawn } = require("child_process");
const path = require("path");

const port = Number.parseInt(process.env.PORT ?? "3002", 10) || 3002;
const serverEntry = path.join(__dirname, "server.cjs");

function getListeningPids(targetPort) {
  try {
    if (process.platform === "win32") {
      const output = execSync(`netstat -ano -p tcp | findstr :${targetPort}`, {
        stdio: ["ignore", "pipe", "ignore"],
        encoding: "utf8",
      });

      return Array.from(
        new Set(
          output
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .filter((line) => /\bLISTENING\b/i.test(line))
            .map((line) => {
              const columns = line.split(/\s+/);
              return Number.parseInt(columns[columns.length - 1], 10);
            })
            .filter((value) => Number.isInteger(value) && value > 0 && value !== process.pid),
        ),
      );
    }

    const output = execSync(`lsof -ti tcp:${targetPort} -sTCP:LISTEN`, {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
    });

    return Array.from(
      new Set(
        output
          .split(/\r?\n/)
          .map((line) => Number.parseInt(line.trim(), 10))
          .filter((value) => Number.isInteger(value) && value > 0 && value !== process.pid),
      ),
    );
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      return true;
    }

    process.kill(pid, "SIGTERM");
    return true;
  } catch {
    return false;
  }
}

const stalePids = getListeningPids(port);
for (const pid of stalePids) {
  if (killPid(pid)) {
    console.log(`[dev-server] Freed port ${port} by stopping PID ${pid}`);
  }
}

const child = spawn(process.execPath, [serverEntry], {
  cwd: path.resolve(__dirname, ".."),
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

for (const eventName of ["SIGINT", "SIGTERM"]) {
  process.on(eventName, () => {
    if (!child.killed) child.kill(eventName);
  });
}
