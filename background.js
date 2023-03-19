chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetchJobDetails') {
    chrome.tabs.executeScript(sender.tab.id, { code: `(${request.func})()` }, ([response]) => {
      sendResponse(response);
    });
    return true;
  }
});
