// console.log(document.querySelectorAll('iframe'))
console.log(window.location)
// window.dispatchEvent()
chrome.runtime.sendMessage(window.location, function(response) {
    console.log(response);
  });