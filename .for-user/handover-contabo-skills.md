# Contabo VPS に Windows と同じ skill を入れる引継書

Windows の `~/.claude` に入っているグローバル skill を、Contabo VPS (Linux) の Claude Code でも使えるようにするための手順。Windows 側も引き続き使い、CLAUDE.md の正は Windows 版のまま変えない。2026-11-17 時点の Windows の状態をもとに書いた。

## 前提

- Windows の `~/.claude` は git リポジトリになっている。VPS では、Claude Code を初めて起動する前に `git clone <repo> ~/.claude` で clone する。すでに `~/.claude` があるときは、そこで `git init` してから `git remote add origin <repo>`、`git fetch`、`git checkout main` を実行する。CLAUDE.md、和訳、この引継書は clone で届く。
- skill は skills CLI (vercel-labs/skills) のシンボリックリンクモードで入れる。実体は `~/.agents/skills` に置き、`~/.claude/skills` にはそこを指すシンボリックリンクだけを置く。`--copy` は付けない。
- 次のものが入っていること。
  - Node.js (npx)。skills CLI と、japanese-style の `scripts/lint.js` で使う
  - git。skills CLI がリポジトリを取得するときに使う
  - Python 3 と uv。natural-japanese の `scripts/lint.py` は `uv run` で動かす。yomiyasu の検査スクリプトも Python で動く

## 入れる skill

Windows の `~/.agents/.skill-lock.json` に載っている skill と、記録はないが同じ場所にある Cloudflare の skill 3つ (basin、k2、nextjs-on-cloudflare) を、リポジトリごとに入れる。`-s` で skill を指定しているのは、Windows に入っていない skill まで入れないため。

```sh
# Japanese writing (required by the "Japanese writing" section of CLAUDE.md)
npx skills add otnc/skills_japanese-style -g -y -a '*' -s japanese-style
npx skills add coji/natural-japanese -g -y -a '*' -s natural-japanese
npx skills add otnc/skills_fix-unnatural-line-breaks -g -y -a '*' -s fix-unnatural-line-breaks
npx skills add iKora128/stop-ai-slop-jp -g -y -a '*'
npx skills add nanaism/yomiyasu -g -y -a '*' -s yomiyasu

# Code review and tests
npx skills add otnc/skills_ajimi-review -g -y -a '*' -s ajimi-review
npx skills add otnc/skills_maketest -g -y -a '*' -s maketest
npx skills add ro80t/hush -g -y -a '*' -s hush hush-fix hush-review

# Languages
npx skills add fa0311/typescript-design-skill -g -y -a '*' -s typescript-design
npx skills add JetBrains/go-modern-guidelines -g -y -a '*' -s use-modern-go

# Cloudflare
npx skills add cloudflare/skills -g -y -a '*' -s agents-sdk basin cloudflare cloudflare-email-service cloudflare-one cloudflare-one-migrations durable-objects k2 nextjs-on-cloudflare sandbox-migrate-to-next sandbox-next sandbox-stable turnstile-spin web-perf workers-best-practices wrangler

# Others
npx skills add vercel-labs/skills -g -y -a '*' -s find-skills
npx skills add otnc/skills_ai-agent-saving-tech -g -y -a '*' -s token-saver token-saver-claude-code
npx skills add ayghri/i-have-adhd -g -y -a '*' -s i-have-adhd
npx skills add mizuamedesu/ReportSkills -g -y -a '*' -s report-skills
```

`-a '*'` を付けるのは、Windows で選んでいた対象のエージェントが十数種類あり、それにそろえるため。対象を1つ (`-a claude-code` だけ) にすると、実体が `~/.claude/skills` に直接置かれることがある。

stop-ai-slop-jp はリポジトリの直下に `SKILL.md` が1つあるだけなので、`-s` を付けていない。

`-s` に複数の名前を空白区切りで渡せなかったときは、名前ごとにコマンドを分けて実行する。`npx skills add <repo> --list` を実行すると、リポジトリにある skill の名前を確かめられる。

## 入れたあとに確かめること

1. `ls -la ~/.claude/skills` を実行し、各 skill が `~/.agents/skills/<name>` を指すシンボリックリンクになっていることを確かめる。実体のフォルダになっているものがあれば、`npx skills remove <name> -g` で消してから、上のコマンドで入れ直す。
2. `ls ~/.agents/skills | wc -l` が 33 になることを確かめる。上の一覧で入れる skill の数と同じ。
3. 日本語の skill の検査スクリプトが動くことを確かめる。
   - `cd ~/.agents/skills/natural-japanese && uv run scripts/lint.py <file>`。この lint は sudachipy を使うので、uv を使わずに `python` で直接実行すると `ModuleNotFoundError` で止まる
   - `node ~/.agents/skills/japanese-style/scripts/lint.js <file>`
4. Claude Code を起動して `/skills` を開き、上の skill が一覧に出ることを確かめる。

## この手順で入らないもの

- Claude Code のプラグイン (figma、tokeneconomizer など)。skills CLI ではなく `/plugin` で入れる。必要なら VPS で別に入れる。
- claude.ai から同期される skill (`~/.claude/skills/synced/`)。VPS で同じアカウントにログインすると、Claude Code が自動で置く。

## Windows と VPS をそろえ続けるには

- Windows に skill を足したり消したりしたら、VPS でも同じ `npx skills add` か `npx skills remove` を実行する。
- skill を最新にするときは、両方で `npx skills update -g` を実行する。
- yomiyasu は、Windows では特定のコミット (`db78b9bc5e868549b517a037df7a4d1c93edac23`) が記録されている。VPS で上のコマンドを使うと最新版が入るので、Windows と版がずれることがある。版をそろえたいときは、両方で `npx skills update -g yomiyasu` を実行する。
- CLAUDE.md や `settings.json` をどちらかで書き換えたら、commit と push をして、もう一方で pull する。
- `settings.json` の `extraKnownMarketplaces.tokeneconomizer` は Windows のパス (`D:\Documents\TokenEconomizer`) を指しているので、VPS ではこのプラグインを読み込めない。
