chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetchJobDetails') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['contentScript.js'] }, ([response]) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          sendResponse(response.result);
        }
      });
    });
    return true;
  }
});
