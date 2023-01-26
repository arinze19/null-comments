const button = document.querySelector('.toggler');
const switcher = document.querySelector('.toggler__item');

chrome.storage.local.get(['active']).then(({ active }) => {
  if (active) {
    button.classList.add('background-active');
    switcher.classList.add('active');
  } else {
    button.classList.remove('background-active');
    switcher.classList.remove('active');
  }
});

button.addEventListener('click', () => {
  chrome.storage.local.get(['active']).then((store) => {
    chrome.storage.local.set({ active: !store.active }).then(() => {
      if (!store.active) {
        button.classList.add('background-active');
        switcher.classList.add('active');
      } else {
        button.classList.remove('background-active');
        switcher.classList.remove('active');
      }
    });
  });
});
