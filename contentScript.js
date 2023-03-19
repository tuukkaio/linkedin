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

chrome.runtime.sendMessage({ result: fetchJobDetails() });
