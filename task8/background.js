chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['analyse_links.js']
    });
  });
  
  function validateLink(url) {
    return new Promise(function(resolve, reject) {
      fetch(url, {method: "HEAD"})
        .then(function(response) {
          if (response.ok) {
            resolve({url: url, status: "valid"});
          } else {
            resolve({url: url, status: "invalid"});
          }
        })
        .catch(function(error) {
          resolve({url: url, status: "error"});
        });
    });
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "find_links") {
      chrome.scripting.executeScript({
        target: {tabId: sender.tab.id},
        func: function() {
          var links = document.getElementsByTagName("a");
          var urls = [];
          for (var i = 0; i < links.length; i++) {
            urls.push(links[i].href);
          }
          return urls;
        }
      }, function(urls) {
        Promise.all(urls.map(validateLink))
          .then(function(results) {
            sendResponse({links: results});
          });
      });
      return true;
    }
  });
  