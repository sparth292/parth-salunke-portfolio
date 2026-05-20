/**
 * Fetches ONLY pins from paajinextdoor/my-shuffles-2 (no related/suggested pins).
 *
 * Optional: place exported Pinterest cookies in scripts/pinterest-cookies.json
 * (array of {name, value, domain} objects from browser devtools) to load all 37 pins.
 *
 * Run: npm run fetch-pins
 */
import puppeteer from "puppeteer";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const BOARD_URL = "https://www.pinterest.com/paajinextdoor/my-shuffles-2/";
const BOARD_PATH = "/paajinextdoor/my-shuffles-2/";
const BOARD_OWNER = "paajinextdoor";
const OPIUM_PIN_ID = "967359194985722547";
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../src/data/pinterest-pins.json");
const COOKIES_FILE = join(__dirname, "pinterest-cookies.json");

function getAspect(width, height) {
  if (!width || !height) return "vertical";
  const ratio = width / height;
  if (ratio > 1.15) return "horizontal";
  if (ratio < 0.85) return "vertical";
  return "square";
}

function isBoardPin(pin) {
  return (
    pin?.board?.url === BOARD_PATH &&
    pin?.pinner?.username === BOARD_OWNER &&
    pin?.board?.owner?.username === BOARD_OWNER
  );
}

function extractFromApi(pin) {
  const images = pin.images || {};
  const url =
    images.orig?.url ||
    images["736x"]?.url ||
    images["474x"]?.url ||
    images["236x"]?.url;
  const w = images.orig?.width || images["736x"]?.width || null;
  const h = images.orig?.height || images["736x"]?.height || null;
  return {
    id: String(pin.id),
    url,
    width: w,
    height: h,
    aspect: getAspect(w, h),
    title: pin.grid_title || pin.title || pin.description || `Pin ${pin.id}`,
    pinUrl: `https://www.pinterest.com/pin/${pin.id}/`,
  };
}

function scrapeAndVerifyPinPage(pinId) {
  try {
    const html = execSync(
      `curl -sL -A "Mozilla/5.0" "https://www.pinterest.com/pin/${pinId}/"`,
      { encoding: "utf-8", timeout: 15000 }
    );
    if (!html.includes("my-shuffles-2") || !html.includes(BOARD_OWNER)) {
      return null;
    }
    const url =
      html.match(/https:\/\/i\.pinimg\.com\/originals\/[a-f0-9/]+\.[a-z]+/)?.[0] ||
      html.match(/https:\/\/i\.pinimg\.com\/736x\/[a-f0-9/]+\.[a-z]+/)?.[0];
    if (!url) return null;
    const dims = html.match(/"orig":\{"width":(\d+),"height":(\d+)/);
    const w = dims ? parseInt(dims[1], 10) : null;
    const h = dims ? parseInt(dims[2], 10) : null;
    const title =
      html.match(/<title>([^<]+)<\/title>/)?.[1]?.replace(" | Pinterest", "").trim() ||
      `Pin ${pinId}`;
    return {
      id: pinId,
      url,
      width: w,
      height: h,
      aspect: getAspect(w, h),
      title,
      pinUrl: `https://www.pinterest.com/pin/${pinId}/`,
    };
  } catch {
    return null;
  }
}

async function loadCookies(page) {
  if (!existsSync(COOKIES_FILE)) return false;
  try {
    const cookies = JSON.parse(readFileSync(COOKIES_FILE, "utf-8"));
    if (Array.isArray(cookies) && cookies.length) {
      await page.setCookie(...cookies);
      console.log(`Loaded ${cookies.length} cookies (logged-in mode)`);
      return true;
    }
  } catch {
    console.warn("Could not parse pinterest-cookies.json");
  }
  return false;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const loggedIn = await loadCookies(page);
  const boardPins = new Map();

  page.on("response", async (response) => {
    if (!response.url().includes("BoardFeedResource") || response.status() !== 200) {
      return;
    }
    try {
      const json = await response.json();
      for (const pin of json?.resource_response?.data || []) {
        if (isBoardPin(pin)) {
          const extracted = extractFromApi(pin);
          if (extracted.url) boardPins.set(extracted.id, extracted);
        }
      }
    } catch {
      /* ignore */
    }
  });

  console.log("Loading board (paajinextdoor/my-shuffles-2)…");
  await page.goto(BOARD_URL, { waitUntil: "networkidle2", timeout: 120000 });

  const boardFeedIds = new Set();
  let lastSize = 0;
  let stable = 0;
  const maxScrolls = loggedIn ? 120 : 60;

  for (let i = 0; i < maxScrolls; i++) {
    await page.evaluate(() => {
      const feed = document.querySelector('[data-test-id="board-feed"]');
      if (feed) feed.scrollTop = feed.scrollHeight;
      window.scrollBy(0, 600);
    });
    await new Promise((r) => setTimeout(r, loggedIn ? 500 : 700));

    const ids = await page.evaluate(() => {
      const feed = document.querySelector('[data-test-id="board-feed"]');
      if (!feed) return [];
      return [
        ...new Set(
          [...feed.querySelectorAll('a[href*="/pin/"]')]
            .map((a) => a.href.match(/\/pin\/(\d+)/)?.[1])
            .filter(Boolean)
        ),
      ];
    });
    ids.forEach((id) => boardFeedIds.add(id));

    if (boardFeedIds.size === lastSize) stable++;
    else stable = 0;
    lastSize = boardFeedIds.size;

    if (i % 10 === 0) {
      console.log(
        `  scroll ${i}: board-feed=${boardFeedIds.size}, API=${boardPins.size}`
      );
    }
    if (stable >= 6) break;
  }

  await browser.close();

  const final = new Map(boardPins);
  const unverified = [...boardFeedIds].filter((id) => !final.has(id));

  if (unverified.length) {
    console.log(`Verifying ${unverified.length} extra pins belong to your board…`);
    for (const id of unverified) {
      const pin = scrapeAndVerifyPinPage(id);
      if (pin) {
        final.set(id, pin);
        process.stdout.write("+");
      } else {
        process.stdout.write("×");
      }
    }
    console.log();
  }

  let pins = [...final.values()].filter((p) => p.url);
  pins.sort((a, b) => {
    if (a.id === OPIUM_PIN_ID) return -1;
    if (b.id === OPIUM_PIN_ID) return 1;
    return 0;
  });

  const output = {
    boardUrl: BOARD_URL,
    boardTitle: "My Shuffles 2",
    username: BOARD_OWNER,
    pinterestBoardLink: "https://pin.it/39NkFUSUZ",
    fetchedAt: new Date().toISOString(),
    source: "board-only-filtered",
    totalOnPinterest: 37,
    pins: pins.map((p, i) => ({ ...p, featured: i < 3 })),
  };

  writeFileSync(OUT, JSON.stringify(output, null, 2));
  console.log(`\n✓ Saved ${pins.length} board-only pins (by @${BOARD_OWNER})`);

  if (pins.length < 37) {
    console.log(
      `\nPinterest lists 37 pins but only ${pins.length} are public without login.`
    );
    console.log(
      "To get all 37: export cookies while logged into Pinterest → scripts/pinterest-cookies.json"
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
