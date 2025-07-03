import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Options = () => {
  const [apiKey, setApiKey] = useState("");

  const handleSave = () => {
    chrome.storage.local.set({ apiKey });
  };

  const clearCache = () => {
    chrome.storage.local.remove(["streak", "timestamp"]);
  };

  const clearStorage = () => {
    chrome.storage.local.clear();
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
      <button onClick={clearCache}>Clear cache</button>
      <button onClick={clearStorage}>Clear all storage</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
