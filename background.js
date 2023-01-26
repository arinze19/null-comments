try {
  chrome.webRequest.onCompleted.addListener(
    async (details) => {
      chrome.scripting.executeScript({
        files: ['content.js'],
        target: { tabId: details.tabId },
      });
    },
    { urls: ['<all_urls>'] }
  );
} catch (error) {
  console.log(error);
}
