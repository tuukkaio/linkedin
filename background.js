if (request.message === 'fetchJobTitle') {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['contentScript.js'] }, ([response]) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        sendResponse(response.result.jobTitle);
      }
    });
  });
  return true;
}
