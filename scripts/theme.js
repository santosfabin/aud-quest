document.addEventListener('DOMContentLoaded', () => {
    function getLocalStorage(key) {
      return localStorage.getItem(key);
    }
  
    function toggleLocalStorage(key, value) {
      if (getLocalStorage(key)) {
        return localStorage.removeItem(key);
      }
      return localStorage.setItem(key, value);
    }
  
    document.querySelector('header nav span').addEventListener('click', () => {
      document.body.classList.toggle('light');
      toggleLocalStorage('theme', true);
    });
    if (getLocalStorage('theme')) {
      document.body.classList.toggle('light');
    }
  });