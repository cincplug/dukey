if (!window.contentScriptLoaded) {
  window.contentScriptLoaded = true;

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        setTabIndex();
        document
          .querySelectorAll('[data-test="skill-path"] [role="button"]')
          .forEach((element) => {
            element.removeAttribute("role");
            element.removeAttribute("tabindex");
          });
      }
    });
  });

  const setTabIndex = () => {
    const elements = document.querySelectorAll(
      "a, button, input, select, textarea, [tabindex]"
    );

    elements.forEach((element) => {
      if (
        !element.disabled &&
        element.getAttribute("aria-disabled") !== "true"
      ) {
        element.tabIndex = 0;
      }
    });
  };

  if (!window.keydownListenerAdded) {
    document.body.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (
        event.key === " " &&
        !event.target.matches('button[data-test*="skill-path-level-skill"]')
      ) {
        event.target.click();
      }
    });
    window.keydownListenerAdded = true;
  }

  observer.observe(document.body, { childList: true, subtree: true });
}
