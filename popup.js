document.getElementById("dukey-button").addEventListener("click", function () {
  chrome.runtime.sendMessage({ message: "buttonClicked" }, function (response) {
    console.log("mhm");
  });
});
