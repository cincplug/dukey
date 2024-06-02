if (!window.contentScriptLoaded) {
  window.contentScriptLoaded = true;

  let focusedButton = null;

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

        const newLevelElement = document.querySelector(
          'a[data-test*="skill-path-state-active"]'
        );
        if (newLevelElement) {
          newLevelElement.focus();
        }

        const alliterateElement = document.querySelector("._1XKa3");
        if (alliterateElement) {
          const parentButton = alliterateElement.closest("button");
          console.log(parentButton);
          const wordBankAncestor = alliterateElement.closest(
            '[data-test="word-bank"]'
          );
          if (wordBankAncestor) {
            parentButton.focus();
            focusedButton = parentButton;
          } else if(document.activeElement) {
            document.activeElement.blur();
            focusedButton = null;
          }
        }
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
        !event.target.matches('[data-test*="skill-path"]')
      ) {
        event.target.click();
      }
    });
    window.keydownListenerAdded = true;
  }

  observer.observe(document.body, { childList: true, subtree: true });
}
