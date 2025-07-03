import { Message } from "./message";

(function () {
  function overrideXMLHttpRequestOpen() {
    const oldXHROpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (
      method,
      url,
      ...args: any[]
    ) {
      if (method === "POST" && url === "/graphql/") {
        this.addEventListener("load", async () => {
          const txt = await this.response.text();
          try {
            const json = JSON.parse(txt);
            const streak = json.data?.streakCounter?.streakCount;
            if (typeof streak === "number") {
              let msg: Message = {
                type: "FROM_LC_WORKER_EXTENSION",
                streak,
              };
              window.postMessage(msg, "*");
            }
          } catch (e) {}
        });
      }
      return oldXHROpen.apply(this, [method, url, ...args] as any);
    };
  }

  overrideXMLHttpRequestOpen();
})();
