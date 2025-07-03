import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Storage } from "./storage";

const Popup = () => {
  const [storage, setStorage] = useState<Storage>();

  useEffect(() => {
    chrome.storage.local.get().then((storage: Storage) => {
      setStorage(storage);
    });
  }, []);

  return (
    <>
      <div style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        <div>
          <a
            href="https://lc-worker.nilsemmenegger.com/get_lc_daily_streak"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get streak
          </a>
        </div>
        {storage === undefined ? (
          <></>
        ) : storage.streak === undefined || storage.timestamp === undefined ? (
          <div>Streak not uploaded yet</div>
        ) : (
          <div>
            Last uploaded streak {storage.streak} at{" "}
            {new Date(storage.timestamp).toString()}
          </div>
        )}
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
