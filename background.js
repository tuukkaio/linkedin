chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetchJobTitle' || request.message === 'fetchJobDetails') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['contentScript.js'] }, ([response]) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          if (request.message === 'fetchJobTitle') {
            sendResponse(response.result && response.result.jobTitle ? response.result.jobTitle : null);
          } else {
            sendResponse(response.result && response.result.jobDetails ? response.result.jobDetails : null);
          }
        }
      });
    });
    return true;
  }
});
