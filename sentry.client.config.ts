// sentry.client.config.js

// Import Sentry for Next.js
import * as Sentry from "@sentry/nextjs";

// Initialize Sentry
Sentry.init({
  // Your DSN (replace with your own if different)
  dsn: "https://7b883d075caa19b41fd9b00ae313a1c6@o4506813739368448.ingest.us.sentry.io/4507222371729408",

  // Set the tracesSampleRate to capture a percentage of transactions for performance monitoring
  // Adjust this value in production for better control over performance sampling
  tracesSampleRate: 0.1,

  // Enable debug mode temporarily to capture more useful logs during setup
  debug: true,

  // Enable replay integration with default settings
  replaysOnErrorSampleRate: 1.0, // Replay only on errors
  replaysSessionSampleRate: 0.1, // Sample 10% of sessions for replay

  integrations: (integrations) => {
    // Filter out "Undici" integration to avoid potential conflicts
    return integrations
      .filter((integration) => integration.name !== "Undici")
      .concat([
        // Add Replay integration if needed
        Sentry.replayIntegration({
          maskAllText: true, // Mask sensitive data in text fields
          blockAllMedia: true, // Block media playback in replays
        }),
      ]);
  },
});

// Debugging for Fetch Requests (optional for testing)
// This wraps global fetch to log details about requests
const originalFetch = globalThis.fetch;
globalThis.fetch = async (...args) => {
  console.log("Fetch arguments:", args); // Logs the fetch arguments
  try {
    const response = await originalFetch(...args);
    console.log("Fetch response:", response); // Logs the fetch response
    return response;
  } catch (error) {
    console.error("Fetch error:", error); // Logs any errors
    throw error; // Re-throw the error to maintain behavior
  }
};

// Export the configuration (for other files if needed)
export default Sentry;
