/**
 * MiMo Image Understanding - Node.js Script
 *
 * Uses the Anthropic-compatible API via MiMo Token Plan.
 * Supports both image URL and local file (Base64) input.
 *
 * Usage:
 *   node mimo-image-understanding.js <image_path_or_url> [prompt]
 *
 * Examples:
 *   node mimo-image-understanding.js https://example.com/photo.jpg
 *   node mimo-image-understanding.js https://example.com/photo.jpg "这张图片里有什么动物？"
 *   node mimo-image-understanding.js ./local-image.png "describe this image"
 */

const fs = require("fs");
const path = require("path");

// --- Configuration ---
const API_KEY = process.env.MIMO_API_KEY;
const BASE_URL =
  process.env.MIMO_BASE_URL ||
  "https://token-plan-cn.xiaomimimo.com/anthropic";
const MODEL = process.env.MIMO_MODEL || "mimo-v2.5";

if (!API_KEY) {
  console.error("Error: MIMO_API_KEY environment variable is not set.");
  console.error("");
  console.error("Please set it before running:");
  console.error('  export MIMO_API_KEY="your-api-key-here"');
  console.error("");
  console.error(
    "Get your API Key at: https://platform.xiaomimimo.com/#/console/api-keys"
  );
  process.exit(1);
}

// --- Helpers ---

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".bmp": "image/bmp",
  };
  return mimeMap[ext] || "image/png";
}

function isUrl(str) {
  return str.startsWith("http://") || str.startsWith("https://");
}

function buildImageContent(imageInput) {
  if (isUrl(imageInput)) {
    return {
      type: "image",
      source: {
        type: "url",
        url: imageInput,
      },
    };
  }

  // Local file -> Base64
  const absPath = path.resolve(imageInput);
  if (!fs.existsSync(absPath)) {
    console.error(`Error: File not found: ${absPath}`);
    process.exit(1);
  }
  const stat = fs.statSync(absPath);
  if (stat.size > 50 * 1024 * 1024) {
    console.error("Error: Image file size exceeds 50MB limit.");
    process.exit(1);
  }
  console.log(`Reading local file: ${absPath}`);
  const buffer = fs.readFileSync(absPath);
  const base64 = buffer.toString("base64");
  const mime = getMimeType(absPath);

  return {
    type: "image",
    source: {
      type: "base64",
      media_type: mime,
      data: base64,
    },
  };
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(
      "Usage: node mimo-image-understanding.js <image_path_or_url> [prompt]"
    );
    console.log("");
    console.log("Examples:");
    console.log(
      "  node mimo-image-understanding.js https://example.com/photo.jpg"
    );
    console.log(
      '  node mimo-image-understanding.js ./local.png "describe this image"'
    );
    process.exit(1);
  }

  const imageInput = args[0];
  const prompt = args[1] || "please describe the content of the image";

  const imageContent = buildImageContent(imageInput);

  const payload = {
    model: MODEL,
    max_tokens: 2048,
    system:
      "You are MiMo, an AI assistant developed by Xiaomi. Answer concisely and accurately based on the image provided.",
    messages: [
      {
        role: "user",
        content: [imageContent, { type: "text", text: prompt }],
      },
    ],
  };

  console.log(`\nSending request to MiMo API (${MODEL})...`);
  console.log(`Prompt: ${prompt}\n`);

  try {
    const response = await fetch(`${BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      process.exit(1);
    }

    const data = await response.json();

    // Print the assistant's reply (Anthropic format)
    const textBlock = data.content?.find((b) => b.type === "text");
    if (textBlock) {
      console.log("=== MiMo Response ===\n");
      console.log(textBlock.text);
    }

    // Print token usage
    if (data.usage) {
      console.log("\n=== Token Usage ===");
      console.log(`  Input tokens:  ${data.usage.input_tokens}`);
      console.log(`  Output tokens: ${data.usage.output_tokens}`);
    }
  } catch (err) {
    console.error("Request failed:", err.message);
    process.exit(1);
  }
}

main();
