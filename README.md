# MiMo Image Understanding

在 Claude Code 里配置 MiMo 图片识别，配好之后直接发图片就能自动识别。

## 配置步骤

### 1. 下载脚本

下载本仓库，把 `mimo-image-understanding.js` 复制到 `~/.claude/scripts/` 目录下（没有就新建）。

```bash
mkdir -p ~/.claude/scripts
cp mimo-image-understanding.js ~/.claude/scripts/
```

### 2. 设置 API Key

```bash
# PowerShell
$env:MIMO_API_KEY="你的Key"

# CMD
set MIMO_API_KEY=你的Key

# Linux / macOS
export MIMO_API_KEY="你的Key"
```

### 3. 配置 Claude Code 规则

在 `~/.claude/CLAUDE.md` 中添加：

```markdown
## MUST: 优先使用用户配置的 skill
遇到图片识别任务时，用 node ~/.claude/scripts/mimo-image-understanding.js 来处理，不要自己猜。
```

### 4. 使用

配好之后，在 Claude Code 里直接发图片路径或粘贴图片，Claude 会自动调用 MiMo 识别。

也可以自定义提问：
```
识别一下这张图 D:\photos\cat.jpg "这是什么品种的猫？"
```

## 支持的模型

- `mimo-v2.5`
- `mimo-v2-omni`

## 支持的图片格式

JPEG、PNG、GIF、WebP、BMP，单张最大 50MB。

## 环境变量（可选）

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `MIMO_API_KEY` | （必填） | MiMo API Key |
| `MIMO_BASE_URL` | `https://token-plan-cn.xiaomimimo.com/anthropic` | API 地址 |
| `MIMO_MODEL` | `mimo-v2.5` | 模型名 |
