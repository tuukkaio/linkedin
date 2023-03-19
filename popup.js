document.addEventListener('DOMContentLoaded', () => {
  const writeCoverLetterButton = document.getElementById('write-cover-letter');
  const coverLetterText = document.getElementById('cover-letter-text');

  writeCoverLetterButton.addEventListener('click', async () => {
    const tab = await getCurrentTab();
    chrome.runtime.sendMessage({action: "fetchJobDetails", tabId: tab.id}, (response) => {
      if (response && response.jobDetails) {
        generateCoverLetter(response.jobDetails).then((coverLetter) => {
          coverLetterText.value = coverLetter;
        });
      } else {
        coverLetterText.value = 'Failed to fetch job details.';
      }
    });
  });
});

async function getCurrentTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
      resolve(tab);
    });
  });
}

async function generateCoverLetter(jobDetails) {
  // Call the Chat-GPT API with the jobDetails to generate the cover letter.
  // You will need to replace 'your_api_key' with your actual API key from OpenAI.
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application
