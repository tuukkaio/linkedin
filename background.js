chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetchJobDetails') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({ target: { tabId: tab.id }, function: eval(request.func) }, ([response]) => {
        sendResponse(response);
      });
    });
  }
  return true;
});
