function injectScripts(tab) {
  if (tab.url && tab.url.includes("duolingo.com")) {
    chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["custom.css"] });
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    injectScripts(tab);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "buttonClicked") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      injectScripts(tabs[0]);
      sendResponse({result: "Scripts injected"});
    });
  }
  return true; 
});
