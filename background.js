chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.status === "complete" && tab.url && tab.url.includes("duolingo.com")) {
        chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["custom.css"] });
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: () => {
            const observer = new MutationObserver((mutationsList, observer) => {
              for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                  setTabIndex();
                }
              }
            });
  
            function setTabIndex() {
              const elements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
              const divButtons = document.querySelectorAll('div[role="button"]');
              
              // Set tabindex of div elements with role="button" to -1
              divButtons.forEach(divButton => {
                if(divButton.getAttribute("tabindex") === "0") {
                  divButton.setAttribute('tabindex', '-1');
                  console.warn(divButton.getAttribute("tabindex"));
                }
              });
            
              for (let i = 0; i < elements.length; i++) {
                if (!elements[i].disabled && elements[i].getAttribute('aria-disabled') !== 'true') {
                  elements[i].tabIndex = 0;
                }
              }
            }
            
  
            if (!window.keydownListenerAdded) {
              document.body.addEventListener("keyup", (event) => {
                event.preventDefault();
                if (event.key === " ") {
                  event.target.click();
                }
              });
              window.keydownListenerAdded = true;
            }
  
            observer.observe(document.body, { childList: true, subtree: true });
          }
        });
      }
    });
  });
  