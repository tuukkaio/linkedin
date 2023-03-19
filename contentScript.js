function fetchJobTitle() {
  const jobTitleElement = document.querySelector('.topcard__title');
  if (!jobTitleElement) {
    return null;
  }
  return jobTitleElement.innerText.trim();
}

function fetchJobDetails() {
  const companyNameElement = document.querySelector('.topcard__org-name-link');
  const locationElement = document.querySelector('.topcard__flavor--bullet');
  const descriptionElement = document.querySelector('.description__text');

  if (!companyNameElement || !locationElement || !descriptionElement) {
    return null;
  }

  const companyName = companyNameElement.innerText.trim();
  const location = locationElement.innerText.trim();
  const description = descriptionElement.innerText.trim();

  return { companyName, location, description };
}

if (window.location.href.includes('linkedin.com/jobs/view')) {
  const jobTitle = fetchJobTitle();
  const jobDetails = fetchJobDetails();
  chrome.runtime.sendMessage({ jobTitle, jobDetails });
}
