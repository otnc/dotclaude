// Preloaded into Node processes that Claude Code starts on Windows, through NODE_OPTIONS set by hooks/upper-drive-cwd-env.sh.
// The VS Code extension hands Claude Code a cwd like `d:\...`, and tools that compare paths by string (vitest among them) then load the same module twice under `d:` and `D:`.
const cwd = process.cwd()
if (/^[a-z]:/.test(cwd)) process.chdir(cwd[0].toUpperCase() + cwd.slice(1))
