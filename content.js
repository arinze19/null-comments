(() => {
  chrome.storage.local.get(['active']).then((store) => {
    if (store.active) {
      let span = document.querySelectorAll('.r-1k6nrdp, .r-1yzf0co');
      span.forEach((item) => item.classList.add('opacity0'));
    } else {
      let span = document.querySelectorAll('.r-1k6nrdp, .r-1yzf0co');
      span.forEach((item) => item.classList.remove('opacity0'));
    }
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.active.newValue) {
      let span = document.querySelectorAll('.r-1k6nrdp, .r-1yzf0co');
      span.forEach((item) => item.classList.add('opacity0'));
    } else {
      let span = document.querySelectorAll('.r-1k6nrdp, .r-1yzf0co');
      span.forEach((item) => item.classList.remove('opacity0'));
    }
  });
})();
