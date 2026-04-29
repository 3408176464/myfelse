# MiMo Image Understanding

用 [Xiaomi MiMo](https://platform.xiaomimimo.com) 大模型做图片识别，零依赖，一个脚本就能跑。

## 使用

### 1. 设置 API Key

```bash
# PowerShell
$env:MIMO_API_KEY="你的Key"

# CMD
set MIMO_API_KEY=你的Key

# Linux / macOS
export MIMO_API_KEY="你的Key"
```

### 2. 运行

```bash
# 识别网络图片
node mimo-image-understanding.js https://example.com/photo.jpg

# 识别本地图片
node mimo-image-understanding.js ./photo.png

# 自定义提问
node mimo-image-understanding.js ./photo.png "这张图片里有什么动物？"
```

## 配置（可选）

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `MIMO_API_KEY` | （必填） | MiMo API Key |
| `MIMO_BASE_URL` | `https://token-plan-cn.xiaomimimo.com/anthropic` | API 地址 |
| `MIMO_MODEL` | `mimo-v2.5` | 模型名 |

## 支持的模型

- `mimo-v2.5`
- `mimo-v2-omni`

## 支持的图片格式

JPEG、PNG、GIF、WebP、BMP，单张最大 50MB。
