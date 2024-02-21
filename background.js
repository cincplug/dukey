chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.includes("duolingo.com")) {
    chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["custom.css"] });
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  }
});
