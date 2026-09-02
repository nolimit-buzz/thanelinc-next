import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, ".gitleaks-version.json"), "utf8"));
const platformKey = `${process.platform}-${process.arch}`;
const artifact = manifest.artifacts[platformKey];

if (!artifact) {
  throw new Error(`Unsupported Gitleaks platform: ${platformKey}`);
}

const toolDir = join(root, ".tools", "gitleaks", `v${manifest.version}`, platformKey);
const binary = join(toolDir, process.platform === "win32" ? "gitleaks.exe" : "gitleaks");

async function ensureBinary() {
  if (existsSync(binary)) {
    const installed = execFileSync(binary, ["version"], { encoding: "utf8" }).trim();
    if (installed.includes(manifest.version)) return;
    rmSync(binary);
  }

  mkdirSync(toolDir, { recursive: true });
  const archivePath = join(toolDir, artifact.archive);
  const url = `https://github.com/gitleaks/gitleaks/releases/download/v${manifest.version}/${artifact.archive}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Gitleaks download failed: HTTP ${response.status}`);

  const archive = Buffer.from(await response.arrayBuffer());
  const actualHash = createHash("sha256").update(archive).digest("hex");
  if (actualHash !== artifact.sha256) {
    throw new Error(`Gitleaks checksum mismatch for ${artifact.archive}`);
  }

  writeFileSync(archivePath, archive);
  // The Windows artifact is a .zip holding gitleaks.exe; every other platform ships
  // a .tar.gz holding gitleaks. `-xf` (no `-z`) lets tar sniff the format, so the
  // same call handles both — bsdtar, which Windows 10+ bundles, reads zip natively.
  const member = process.platform === "win32" ? "gitleaks.exe" : "gitleaks";
  // Not bare "tar" on Windows: the hook runs under Git Bash, whose GNU tar is first
  // on PATH, reads "C:\..." as a remote host ("Cannot connect to C") and cannot read
  // zip at all. Windows' own bsdtar does both, so address it by absolute path.
  const tarBin =
    process.platform === "win32"
      ? join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe")
      : "tar";
  execFileSync(tarBin, ["-xf", archivePath, "-C", toolDir, member], { stdio: "inherit" });
  rmSync(archivePath);
  // Windows has no execute bit and node's chmod is a near-no-op there.
  if (process.platform !== "win32") chmodSync(binary, 0o755);

  const installed = execFileSync(binary, ["version"], { encoding: "utf8" }).trim();
  if (!installed.includes(manifest.version)) {
    throw new Error(`Expected Gitleaks ${manifest.version}; got ${installed}`);
  }
}

function run(args, options = {}) {
  const result = spawnSync(binary, args, { cwd: root, stdio: "inherit", ...options });
  if (result.error) throw result.error;
  return result.status ?? 1;
}

await ensureBinary();

const [command, ...args] = process.argv.slice(2);
if (command === "staged") {
  process.exit(run(["protect", "--staged", "--redact", "--config", ".gitleaks.toml"]));
}

if (command === "range") {
  const [baseSha, headSha] = args;
  const shaPattern = /^[0-9a-f]{40}$/i;
  if (!shaPattern.test(baseSha ?? "") || !shaPattern.test(headSha ?? "")) {
    throw new Error("Range scan requires full base and head commit SHAs");
  }
  process.exit(
    run([
      "git",
      "--redact",
      "--config",
      ".gitleaks.toml",
      `--log-opts=${baseSha}..${headSha}`,
      ".",
    ]),
  );
}

if (command === "self-test") {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "thanelinc-gitleaks-"));
  try {
    const fixturePath = join(fixtureRoot, "lib", "mail", "config.ts");
    mkdirSync(dirname(fixturePath), { recursive: true });
    const syntheticValue = ["synthetic", "smtp", "fixture", "only"].join("-");
    writeFileSync(fixturePath, `export const smtpPassword = "${syntheticValue}";\n`);
    const status = run([
      "dir",
      "--redact",
      "--config",
      join(root, ".gitleaks.toml"),
      fixtureRoot,
    ]);
    if (status !== 1) throw new Error(`Expected synthetic fixture detection; exit status ${status}`);
    console.log("Gitleaks synthetic SMTP credential rule: PASS");
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
  process.exit(0);
}

throw new Error("Usage: node scripts/gitleaks.mjs staged | self-test | range <base SHA> <head SHA>");
