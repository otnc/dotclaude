#!/usr/bin/env bash
# SessionStart hook. On Windows only, makes every Node process that Claude Code's shell starts preload upper-drive-cwd.cjs.
# Linux machines that clone ~/.claude (such as the VPS) exit here, because the preload path exists only on Windows.
case "$OSTYPE" in
  msys* | cygwin*) ;;
  *) exit 0 ;;
esac
[ -n "$CLAUDE_ENV_FILE" ] || exit 0

preload="$(cygpath -m "$HOME/.claude/scripts/upper-drive-cwd.cjs")"
# NODE_OPTIONS stays unexpanded here, so an existing value is kept when the env file is sourced.
printf 'export NODE_OPTIONS="--require %s${NODE_OPTIONS:+ $NODE_OPTIONS}"\n' "$preload" >> "$CLAUDE_ENV_FILE"
