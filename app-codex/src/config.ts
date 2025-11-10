export const API_LATENCY = 200

const keyFromEnv =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  ""

if (!keyFromEnv && typeof window !== "undefined") {
  console.warn(
    "Missing VITE_GOOGLE_MAPS_API_KEY. Add it to your environment to load Google Maps."
  )
}

export const geocodeAPIKey = keyFromEnv
