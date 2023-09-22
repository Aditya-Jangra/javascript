document.addEventListener('DOMContentLoaded', function() {
    var analyseBtn = document.getElementById('analyse-btn');
    analyseBtn.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({action: "find_links"}, function(response) {
          console.log(response.links);
        });
      });
    });
  });
  