"use client";

/**
 * Play official Bharat Connect MOGO MP3 audio sound (/assets/BharatConnect MOGO 270824.mp3)
 */
export function playPaymentSuccessSound() {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio("/assets/BharatConnect MOGO 270824.mp3");
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio playback prevented or failed:", err);
      });
    }
  } catch (err) {
    console.warn("Audio playback error:", err);
  }
}
