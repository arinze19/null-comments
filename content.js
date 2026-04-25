(() => {
  chrome.storage.local.get(['active']).then((store) => {
    if (store.active) {
      const nodes = document.querySelectorAll('span[data-testid="app-text-transition-container"]')
      nodes.forEach(item => item.style.opacity = 0)
    } else {
      const nodes = document.querySelectorAll('span[data-testid="app-text-transition-container"]')
      nodes.forEach(item => item.style.opacity = 1)
    }
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.active.newValue) {
      const nodes = document.querySelectorAll('span[data-testid="app-text-transition-container"]')
      nodes.forEach(item => item.style.opacity = 0)
    } else {
      const nodes = document.querySelectorAll('span[data-testid="app-text-transition-container"]')
      nodes.forEach(item => item.style.opacity = 1)
    }
  });
})();
