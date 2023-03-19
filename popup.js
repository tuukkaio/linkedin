document.addEventListener('DOMContentLoaded', async () => {
  const writeCoverLetterButton = document.querySelector('#write-cover-letter');
  const coverLetterText = document.querySelector('#cover-letter-text');

  writeCoverLetterButton.addEventListener('click', async () => {
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({ target: { tabId: tab.id }, func: fetchJobDetails }, ([response]) => {
      if (response && response.result) {
        generateCoverLetter(response.result).then((coverLetter) => {
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

function fetchJobDetails() {
  const jobTitleElement = document.querySelector('.topcard__title');
  const companyNameElement = document.querySelector('.topcard__org-name-link');
  const locationElement = document.querySelector('.topcard__flavor--bullet');
  const descriptionElement = document.querySelector('.description__text');
  
  if (!jobTitleElement || !companyNameElement || !locationElement || !descriptionElement) {
    return null;
  }

  const jobTitle = jobTitleElement.innerText.trim();
  const companyName = companyNameElement.innerText.trim();
  const location = locationElement.innerText.trim();
  const description = descriptionElement.innerText.trim();

  return { jobTitle, companyName, location, description };
}
