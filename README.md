# ~/.claude

Claude Code のユーザー設定 (`~/.claude`) を管理するリポジトリ。追跡するのは自分で書いた設定だけで、ログイン情報、会話ログ、履歴、キャッシュは `.gitignore` で除外している。

## 追跡しているもの

- `CLAUDE.md`: すべてのプロジェクトで読み込まれるグローバル指示。正は英語版
- `.for-user/`: `CLAUDE.md` の和訳と、ほかのマシンに skill を入れるときの引継書
- `settings.json`: 権限、モデル、プラグインなどのユーザー設定
- `scripts/`: このリポジトリを保守するためのスクリプト

## ほかのマシンで使う

Linux のマシンでは、Claude Code を初めて起動する前に `git clone <repo> ~/.claude` で clone する。WSL では clone せず、`~/.claude/CLAUDE.md` に `@/mnt/c/Users/<user>/.claude/CLAUDE.md` の1行だけを書いて Windows 版を読み込む。skill の入れ方は `.for-user/handover-contabo-skills.md` にある。

## グローバル skill

skill は skills CLI (vercel-labs/skills) で `~/.agents/skills` に入れ、このリポジトリには含めない。次のブロックは、Windows の `~/.agents/.skill-lock.json` の最新の内容をそのまま写したもの。skill を追加、削除、更新したら、`node scripts/update-readme-skill-lock.mjs` を実行してこのブロックを書き換える。

このスクリプトは skills CLI と同じ順に lock ファイルを探す。環境変数 `XDG_STATE_HOME` があれば `$XDG_STATE_HOME/skills/.skill-lock.json`、なければ `~/.agents/.skill-lock.json` を読み、`:::skills-lock.json` の行と `:::` の行のあいだを書き換える。別の lock ファイルを使うときは `--lock <path>` を付ける。`--check` を付けると書き換えずに比べるだけで、古ければ終了コード 1 を返す。

:::skills-lock.json
```json
{
  "version": 3,
  "skills": {
    "find-skills": {
      "source": "vercel-labs/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/vercel-labs/skills.git",
      "skillPath": "skills/find-skills/SKILL.md",
      "skillFolderHash": "76a98a285cb0434f3d39e1a873823556330e398b",
      "installedAt": "2026-09-27T05:06:19.622Z",
      "updatedAt": "2026-09-27T05:06:19.622Z"
    },
    "agents-sdk": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/agents-sdk/SKILL.md",
      "skillFolderHash": "c17a787898e9606bdb07ab6e69c650c2387e0fb4",
      "installedAt": "2026-09-27T05:07:30.534Z",
      "updatedAt": "2026-10-29T09:54:52.513Z"
    },
    "cloudflare": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/cloudflare/SKILL.md",
      "skillFolderHash": "600913aa4edcffe1cc389b8757b586979a13bc47",
      "installedAt": "2026-09-27T05:07:30.558Z",
      "updatedAt": "2026-11-08T01:14:39.519Z"
    },
    "cloudflare-email-service": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/cloudflare-email-service/SKILL.md",
      "skillFolderHash": "1ac66e9f133725e72cd1bef2bc2b5e75e802fc91",
      "installedAt": "2026-09-27T05:07:30.579Z",
      "updatedAt": "2026-10-29T09:55:07.728Z"
    },
    "cloudflare-one": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/cloudflare-one/SKILL.md",
      "skillFolderHash": "55ec81e0b6e4c26906b03c763270ee7367f2d612",
      "installedAt": "2026-09-27T05:07:30.603Z",
      "updatedAt": "2026-11-08T01:14:40.246Z"
    },
    "cloudflare-one-migrations": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/cloudflare-one-migrations/SKILL.md",
      "skillFolderHash": "c273db61b4290755f6a4c31b01c63d8e0a991a86",
      "installedAt": "2026-09-27T05:07:30.633Z",
      "updatedAt": "2026-10-29T09:55:13.559Z"
    },
    "durable-objects": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/durable-objects/SKILL.md",
      "skillFolderHash": "d6a4d7ccb05288d44da0cfc27ce13976bdf44df9",
      "installedAt": "2026-09-27T05:07:30.646Z",
      "updatedAt": "2026-11-08T01:14:43.011Z"
    },
    "sandbox-migrate-to-next": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/sandbox-migrate-to-next/SKILL.md",
      "skillFolderHash": "8e7817b0fb40dbfadcfabd5580d2fafd72cddf74",
      "installedAt": "2026-09-27T05:07:30.682Z",
      "updatedAt": "2026-10-29T09:55:19.392Z"
    },
    "sandbox-next": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/sandbox-next/SKILL.md",
      "skillFolderHash": "9ec0d4a11e188ca3f296d8b7e2944ac5b1bb153f",
      "installedAt": "2026-09-27T05:07:30.720Z",
      "updatedAt": "2026-10-29T09:55:22.284Z"
    },
    "sandbox-stable": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/sandbox-stable/SKILL.md",
      "skillFolderHash": "e29af782c357094dcdd063792b7ed7ae354620a6",
      "installedAt": "2026-09-27T05:07:30.750Z",
      "updatedAt": "2026-10-29T09:55:25.456Z"
    },
    "turnstile-spin": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/turnstile-spin/SKILL.md",
      "skillFolderHash": "9f5565017c4cecc4067c0dd60567655e87a30ca6",
      "installedAt": "2026-09-27T05:07:30.791Z",
      "updatedAt": "2026-10-29T09:55:28.400Z"
    },
    "web-perf": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/web-perf/SKILL.md",
      "skillFolderHash": "f50f5e7f34021937059dbda12e8f990006ab0fd1",
      "installedAt": "2026-09-27T05:07:30.828Z",
      "updatedAt": "2026-10-29T09:55:31.384Z"
    },
    "workers-best-practices": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/workers-best-practices/SKILL.md",
      "skillFolderHash": "82b367b39fd2b7fe77bd2859bd09b3cff80907c9",
      "installedAt": "2026-09-27T05:07:30.860Z",
      "updatedAt": "2026-11-16T05:13:51.170Z"
    },
    "wrangler": {
      "source": "cloudflare/skills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/cloudflare/skills.git",
      "skillPath": "skills/wrangler/SKILL.md",
      "skillFolderHash": "a008bb54eab6653272b18ee0f74ba656bb19ac8d",
      "installedAt": "2026-09-27T05:07:30.888Z",
      "updatedAt": "2026-10-29T09:55:37.033Z"
    },
    "token-saver": {
      "source": "otnc/skills_ai-agent-saving-tech",
      "sourceType": "github",
      "sourceUrl": "https://github.com/otnc/skills_ai-agent-saving-tech.git",
      "skillPath": "skills/token-saver/SKILL.md",
      "skillFolderHash": "3fd1845e68086cec3a5440696f5abce165621a18",
      "installedAt": "2026-09-27T05:08:06.604Z",
      "updatedAt": "2026-09-27T05:08:06.604Z"
    },
    "token-saver-claude-code": {
      "source": "otnc/skills_ai-agent-saving-tech",
      "sourceType": "github",
      "sourceUrl": "https://github.com/otnc/skills_ai-agent-saving-tech.git",
      "skillPath": "skills/token-saver-claude-code/SKILL.md",
      "skillFolderHash": "8f58d5e9d914c9e5ed34181d15fa49a277d2f10f",
      "installedAt": "2026-09-27T05:08:06.629Z",
      "updatedAt": "2026-09-27T05:08:06.629Z"
    },
    "fix-unnatural-line-breaks": {
      "source": "otnc/skills_fix-unnatural-line-breaks",
      "sourceType": "github",
      "sourceUrl": "https://github.com/otnc/skills_fix-unnatural-line-breaks.git",
      "skillPath": "skills/fix-unnatural-line-breaks/SKILL.md",
      "skillFolderHash": "4fc911c070b481b8088345b694c689b1e645e11b",
      "installedAt": "2026-09-27T05:09:41.939Z",
      "updatedAt": "2026-09-27T05:09:41.939Z"
    },
    "natural-japanese": {
      "source": "coji/natural-japanese",
      "sourceType": "github",
      "sourceUrl": "https://github.com/coji/natural-japanese.git",
      "skillPath": "skills/natural-japanese/SKILL.md",
      "skillFolderHash": "241c4686386f82ceeb049ab72aec93f5106446fb",
      "installedAt": "2026-09-27T05:09:46.309Z",
      "updatedAt": "2026-11-08T01:14:45.829Z"
    },
    "report-skills": {
      "source": "mizuamedesu/ReportSkills",
      "sourceType": "github",
      "sourceUrl": "https://github.com/mizuamedesu/ReportSkills.git",
      "skillPath": "skills/report-skills/SKILL.md",
      "skillFolderHash": "703b2e970d13fe30f9b21be8b229aa78f6e2ef69",
      "installedAt": "2026-09-27T05:09:50.793Z",
      "updatedAt": "2026-09-27T05:09:50.793Z"
    },
    "stop-ai-slop-jp": {
      "source": "iKora128/stop-ai-slop-jp",
      "sourceType": "github",
      "sourceUrl": "https://github.com/iKora128/stop-ai-slop-jp.git",
      "skillPath": "SKILL.md",
      "skillFolderHash": "e09d32796f253a62693885757cea484c275d06f2",
      "installedAt": "2026-09-27T05:09:55.222Z",
      "updatedAt": "2026-09-27T05:09:55.222Z"
    },
    "typescript-design": {
      "source": "fa0311/typescript-design-skill",
      "sourceType": "github",
      "sourceUrl": "https://github.com/fa0311/typescript-design-skill.git",
      "skillPath": "skills/typescript-design/SKILL.md",
      "skillFolderHash": "58a79e1ad64514c3591b248b57c5b00930975c1b",
      "installedAt": "2026-09-27T05:10:00.732Z",
      "updatedAt": "2026-09-27T05:10:00.732Z"
    },
    "hush": {
      "source": "ro80t/hush",
      "sourceType": "github",
      "sourceUrl": "https://github.com/ro80t/hush.git",
      "skillPath": "skills/hush/SKILL.md",
      "skillFolderHash": "a69f15a7d7b27bf23bf617f09ec941180d7ac709",
      "installedAt": "2026-10-01T04:40:46.126Z",
      "updatedAt": "2026-10-01T04:40:46.126Z"
    },
    "hush-fix": {
      "source": "ro80t/hush",
      "sourceType": "github",
      "sourceUrl": "https://github.com/ro80t/hush.git",
      "skillPath": "skills/hush-fix/SKILL.md",
      "skillFolderHash": "30e9bf70e58716be8ba731c14f08ea6e2cdd8e2d",
      "installedAt": "2026-10-01T04:40:46.171Z",
      "updatedAt": "2026-10-01T04:40:46.171Z"
    },
    "hush-review": {
      "source": "ro80t/hush",
      "sourceType": "github",
      "sourceUrl": "https://github.com/ro80t/hush.git",
      "skillPath": "skills/hush-review/SKILL.md",
      "skillFolderHash": "3fc79d507d8e7ea69aea1fb2a4545b6aae94d021",
      "installedAt": "2026-10-01T04:40:46.199Z",
      "updatedAt": "2026-10-01T04:40:46.199Z"
    },
    "i-have-adhd": {
      "source": "ayghri/i-have-adhd",
      "sourceType": "github",
      "sourceUrl": "https://github.com/ayghri/i-have-adhd.git",
      "skillPath": "skills/i-have-adhd/SKILL.md",
      "skillFolderHash": "759f1e56d0d2fdd3819d2a53b81e72767c08d914",
      "installedAt": "2026-10-08T14:38:59.323Z",
      "updatedAt": "2026-10-08T14:38:59.323Z"
    },
    "yomiyasu": {
      "source": "nanaism/yomiyasu",
      "sourceType": "github",
      "sourceUrl": "https://github.com/nanaism/yomiyasu.git",
      "commit": "db78b9bc5e868549b517a037df7a4d1c93edac23",
      "skillPath": "skills/yomiyasu/SKILL.md",
      "skillFolderHash": "85d7fdff3e38dd8181d835e29cf42b278431658f",
      "installedAt": "2026-10-24T15:29:11.745Z",
      "updatedAt": "2026-11-16T16:49:30.048Z"
    },
    "use-modern-go": {
      "source": "JetBrains/go-modern-guidelines",
      "sourceType": "github",
      "sourceUrl": "https://github.com/JetBrains/go-modern-guidelines.git",
      "skillPath": "plugin/skills/use-modern-go/SKILL.md",
      "skillFolderHash": "fa7815e20c8ce17aa4adcec063a084c3b58feef8",
      "installedAt": "2026-11-08T01:15:02.336Z",
      "updatedAt": "2026-11-08T01:15:02.336Z"
    },
    "japanese-style": {
      "source": "otnc/skills_japanese-style",
      "sourceType": "github",
      "sourceUrl": "https://github.com/otnc/skills_japanese-style.git",
      "skillPath": "skills/japanese-style/SKILL.md",
      "skillFolderHash": "0417985338a02458797ce44243ff131a4e04510e",
      "installedAt": "2026-11-15T16:47:01.964Z",
      "updatedAt": "2026-11-16T18:29:30.008Z"
    },
    "ajimi-review": {
      "source": "otnc/skills_ajimi-review",
      "sourceType": "github",
      "sourceUrl": "https://github.com/otnc/skills_ajimi-review.git",
      "skillPath": "skills/ajimi-review/SKILL.md",
      "skillFolderHash": "b626fabba1318841f2f8f0c7f53458f7a3f4f7e1",
      "installedAt": "2026-11-15T16:47:14.679Z",
      "updatedAt": "2026-11-15T16:47:14.679Z"
    },
    "maketest": {
      "source": "otnc/skills_maketest",
      "sourceType": "github",
      "sourceUrl": "https://github.com/otnc/skills_maketest.git",
      "skillPath": "skills/maketest/SKILL.md",
      "skillFolderHash": "843b47faa24b4fe0509bb2028928c5a0d6f9d303",
      "installedAt": "2026-11-16T01:10:19.181Z",
      "updatedAt": "2026-11-16T01:10:19.181Z"
    }
  },
  "dismissed": {
    "findSkillsPrompt": true
  },
  "lastSelectedAgents": [
    "amp",
    "cline",
    "codex",
    "cursor",
    "droid",
    "fx",
    "gemini-cli",
    "github-copilot",
    "kilo",
    "kimi-code-cli",
    "opencode",
    "pi",
    "warp",
    "zed",
    "claude-code"
  ]
}
```
:::