import arcjet, { shield, detectBot, slidingWindow, tokenBucket } from "@arcjet/node";
import {ARCJET_KEY, ARCJET_ENV, NODE_ENV} from "./env.js"

// Paksa environment ke production agar Arcjet tidak menggunakan mode DRY_RUN di lokal
process.env.ARCJET_ENV = ARCJET_ENV || "production";

const aj = arcjet({
   key : ARCJET_KEY,
   characteristics: ["ip.src"],
   rules: [
      shield({mode: "LIVE"}),
      detectBot({
         mode: NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
         allow: ["CATEGORY:SEARCH_ENGINE"]
      }),
      // tokenBucket({
      //    mode: "LIVE",
      //    capacity: 10,
      //    refillRate: 5, 
      //    interval: "10s", // Gunakan format string dengan penunjuk waktu (s = seconds)
      // }),
      slidingWindow({
         mode: "LIVE",
         max: 10,
         interval: 60
      })
   ],
})

export default aj;