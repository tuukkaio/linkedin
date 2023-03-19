(async () => {
  // Inject popup.html into the page
  const response = await fetch(chrome.runtime.getURL('popup.html'));
  const text = await response.text();
  const div = document.createElement('div');
  div.innerHTML = text;

  const writeCoverLetterButton = div.querySelector('#write-cover-letter');
  const coverLetterText = div.querySelector('#cover-letter-text');

  writeCoverLetterButton.addEventListener('click', async () => {
    const tab = await getCurrentTab();
    chrome.runtime.sendMessage({ action: 'fetchJobDetails', tabId: tab.id }, (response) => {
      if (response && response.jobDetails) {
        generateCoverLetter(response.jobDetails).then((coverLetter) => {
          coverLetterText.value = coverLetter;
        });
      } else {
        coverLetterText.value = 'Failed to fetch job details.';
      }
    });
  });

  document.body.appendChild(div);

  // Inject content.css into the page
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.runtime.getURL('content.css');
  (document.head || document.documentElement).appendChild(style);
})();

async function getCurrentTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
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
      'Content-Type': 'application/json',
      'Authorization': `Bearer your_api_key`,
    },
    body: JSON.stringify({
      prompt: `Write a cover letter for the following job:\n\n${jobDetails}`,
      max_tokens: 300,
      n: 1,
      stop: null,
      temperature: 0.8,
    }),
  });

  const data = await response.json();
  return data.choices && data.choices[0] && data.choices[0].text ? data.choices[0].text.trim() : 'Failed to generate cover letter.';
}
