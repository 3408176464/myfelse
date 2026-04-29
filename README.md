# MiMo Image Understanding

Node.js script for [Xiaomi MiMo](https://platform.xiaomimimo.com) image understanding API. Zero dependencies — uses native `fetch`.

Supports image URL and local file (auto Base64) input via the Anthropic-compatible API.

## Quick Start

### 1. Get API Key

Go to [MiMo Console](https://platform.xiaomimimo.com/#/console/api-keys) and create an API Key.

- **Token Plan** (`tp-` prefix): Use base URL `https://token-plan-cn.xiaomimimo.com/anthropic`
- **Pay-as-you-go** (`sk-` prefix): Use base URL `https://api.xiaomimimo.com/anthropic`

### 2. Set Environment Variable

```bash
# Linux / macOS
export MIMO_API_KEY="your-api-key-here"

# Windows PowerShell
$env:MIMO_API_KEY="your-api-key-here"

# Windows CMD
set MIMO_API_KEY=your-api-key-here
```

### 3. Run

```bash
# Image URL
node mimo-image-understanding.js https://example.com/photo.jpg

# Local file
node mimo-image-understanding.js ./photo.png

# Custom prompt
node mimo-image-understanding.js ./photo.png "这张图片里有什么动物？"
```

## Configuration

You can customize the API endpoint and model via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `MIMO_API_KEY` | (required) | Your MiMo API Key |
| `MIMO_BASE_URL` | `https://token-plan-cn.xiaomimimo.com/anthropic` | API base URL |
| `MIMO_MODEL` | `mimo-v2.5` | Model name |

Example:

```bash
export MIMO_BASE_URL="https://api.xiaomimimo.com/anthropic"
export MIMO_MODEL="mimo-v2.5"
node mimo-image-understanding.js ./photo.jpg
```

## Supported Models

- `mimo-v2.5` — supports image understanding
- `mimo-v2-omni` — supports image understanding

## Supported Image Formats

JPEG, PNG, GIF, WebP, BMP — max 50MB per image.

## API Reference

See [MiMo Image Understanding Documentation](https://platform.xiaomimimo.com/docs/en-US/usage-guide/multimodal-understanding/image-understanding) for details.
