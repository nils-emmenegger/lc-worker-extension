import { toMessage } from "./message";
import { Storage } from "./storage";

async function uploadStreak(streak: number) {
  // Check cache to see if the same score was already uploaded recently
  const storage: Storage = await chrome.storage.local.get();
  const currentTime = Date.now();
  const twoDaysInMillis = 1000 * 60 * 60 * 24 * 2;
  if (
    storage.streak === streak &&
    storage.timestamp &&
    currentTime - storage.timestamp < twoDaysInMillis
  ) {
    console.log(`Streak ${streak} was already uploaded in the last 48 hours`);
    return;
  }

  // Log if API key not defined
  if (storage.apiKey === undefined) {
    console.log("LC Worker API key not defined");
    return;
  }

  // Send streak
  let res = await fetch(
    "https://lc-worker.nilsemmenegger.com/set_lc_daily_streak",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storage.apiKey}`,
      },
      body: streak.toString(),
    }
  );
  if (!res.ok) {
    console.error('Failed to upload streak');
    console.error(res.status, res.statusText);
    let txt = await res.text();
    console.error(txt);
    return;
  }
  console.log(`Uploaded streak ${streak}`);

  // Set cache
  storage.timestamp = currentTime;
  storage.streak = streak;
  await chrome.storage.local.set(storage);
  console.log(`Saved streak ${streak} in cache`);
}

window.addEventListener(
  "message",
  async (event) => {
    // We only accept messages from ourselves
    if (event.source !== window) return;

    // I don't think this would ever be true, but just in case
    if (event.origin !== "https://leetcode.com") return;

    const msg = toMessage(event.data);
    if (msg === null) return;

    await uploadStreak(msg.streak);
  },
  false
);
