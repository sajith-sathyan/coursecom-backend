// turn.js

// Mock function to simulate fetching TURN ICE servers
export const getTurnIceServers = () => {
  // Define your TURN ICE servers here
  // Example:
  return [
    { urls: "turn:your-turn-server-url1.com", username: "your-username1", credential: "your-password1" },
    { urls: "turn:your-turn-server-url2.com", username: "your-username2", credential: "your-password2" },
  ];
};
